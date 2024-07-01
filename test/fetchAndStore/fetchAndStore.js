const axios = require('axios');
const cron = require('node-cron');
const PocketBase = require('pocketbase/cjs');

// PocketBase client initialization
const pb = new PocketBase('http://127.0.0.1:8090');

// Admin API Key (embedded in code)
// Replace with your actual API Key
const apiKey = 'iIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MjEwNDU3MTUs276hhJfPh496ckoAcRsL'

// Function to fetch data from JSONPlaceholder API
async function fetchData() {
    try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return [];
    }
}

// Function to store data in PocketBase
async function storeData(data) {
    try {
        // Admin authentication
        //await pb.admins.authWithPassword(adminEmail, adminPassword);

        // Authenticate with Admin API Key
        pb.authStore.save(apiKey, null, 'admin');

        for (const item of data) {
            try {
                await pb.collection('posts').create({
                    userId: item.userId,
                    title: item.title,
                    body: item.body
                });
                console.log(`Stored post with ID: ${item.id}`);
            } catch (error) {
                console.error('Error storing data:', error);
            }
        }
    } catch (authError) {
        console.error('Admin authentication failed:', authError);
    }
}

// Scheduled job to fetch and store data every minute
cron.schedule('* * * * *', async () => {
    console.log('Fetching data from JSONPlaceholder API...');
    const data = await fetchData();
    if (data.length > 0) {
        console.log('Storing data in PocketBase...');
        await storeData(data);
        console.log('Data stored successfully!');
    } else {
        console.log('No data to store.');
    }
});

console.log('Job scheduling started. Data will be fetched and stored every minute.');
