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

// try also:
// https://fabdb.pockethost.io/api/collections/test_collection/records?filter=(created%3E%272024-06-27%27)

// if you want to know how many records there are in a specific collection:
// https://fabdb.pockethost.io/api/collections/test_collection/records?perPage=1&page=1

// to get only the field id 
// https://fabdb.pockethost.io/api/collections/test_collection/records?perPage=30&page=1&fields=id