/**
 * Do not use this function directly.
 * Use any other function in the component instead
 * @param client 
 * @param filter 
 * @returns 
 */
async function getData(client, filter) {
    // Select the collection
    const coll = client.db('restaurant-tests').collection('subsidiaries');
    // Retrieve the data applying the filter
    const cursor = coll.find(filter);

    const result = await cursor.toArray();

    return result;
}

async function listSubsidiaries(client) {
    const filter = {};

    return getData(client, filter);
}

async function searchSubsidiariesByName(client, name) {
    const filter = {
        'name': {
            '$regex': name + '*',
            '$options': 'i'
        }
    }

    return getData(client, filter);
}

async function listSubsidiariesByLocation(client, country, state, city) {
    const filter = {
        'address.country': {
          '$regex': country + '*',
          '$options': 'i'
        }, 
        'address.state': {
          '$regex': state + '*', 
          '$options': 'i'
        }, 
        'address.city': {
          '$regex': city + '*', 
          '$options': 'i'
        }
      }

    return getData(client, filter);
}