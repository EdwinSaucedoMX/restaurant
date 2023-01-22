/**
 * Do not use this function directly.
 * Use any other function in the component instead
 * @param client 
 * @param filter 
 * @returns 
 */
async function getData(client, filter) {
    // Select the collection
    const coll = client.db('restaurant-tests').collection('permissions');
    // Retrieve the data applying the filter
    const cursor = coll.find(filter);

    const result = await cursor.toArray();

    return result;
}

async function searchPermissionsByName(client, name) {
    const filter = {
        'name': {
            '$regex': name + '*',
            '$options': 'i'
        }
    }

    return getData(client, filter);
}
