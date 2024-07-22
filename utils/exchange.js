// Send data to and receive data from a REST backend 

// first run this terminal command to get the token and copy it into the token variable below
// curl -X POST https://fabdb.pockethost.io/api/collections/users/auth-with-password -H "Content-Type: application/json" -d '{"identity": "XXXXXX", "password": "XXXXXXXX"}'

let token = 'token_here';
const DB_URL = 'https://fabdb.pockethost.io';
let message = '';
let collection = {};

// uncomment to READ data from the backend
//fetchData();

// data to push to the backend
const localData ={
    plate: '5453GGM',
    repairer_id: '9up5rot07atgf9y',
    rider_id: 'ngdwlvrbw6x4vn6',
    status: 'one_the_road',
    type: 'scooter'
};

// uncomment to PUSH data to the backend
for (const el of [0,1,2,3,4,5,6,7,8,9]) {
    pushData(localData);
}

async function fetchData() {
    try {
        const res = await fetch(DB_URL + '/api/collections/myrepair_vehicles/records', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        const data = await res.json();

        if (res.ok) {
            collection = data.items;
            console.log(collection);
        } else {
            message = 'Failed to fetch collection data: ' + data.message;
        }
    } catch (error) {
        message = 'Failed to fetch collection data: ' + error.message;
    }
}

async function pushData(localData) {
    try {

        if (!token) {
            throw new Error('No authentication token available');
        }

        const res = await fetch(DB_URL + '/api/collections/myrepair_vehicles/records', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(localData)
        });

        const data = await res.json();

        if (res.ok) {
            message = 'Data successfully pushed to database';
            console.log(message);
            console.log('Response:', data);
        } else {
            message = 'Failed to push data: ' + data.message;
            console.error(message);
        }
    } catch (error) {
        message = 'Failed to push data: ' + error.message;
        console.error(message);
    }
}

