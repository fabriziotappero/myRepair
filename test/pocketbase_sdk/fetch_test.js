// npm install pocketbase --save
const PocketBase = require('pocketbase/cjs')

const pb = new PocketBase('https://fabdb.pockethost.io');


async function fetchRecords() {
    try {
        const resultList = await pb.collection('test_collection').getList(1, 50, {
        });
        console.log(resultList);
    } catch (error) {
        console.error('Error fetching records:', error);
    }
}

fetchRecords();
