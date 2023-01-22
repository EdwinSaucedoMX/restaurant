/**
 * Do not use this function directly.
 * Use any other function in the component instead
 * @param client 
 * @param agg 
 * @returns 
 */
async function getData(client, agg) {
    // Select the collection
    const coll = client.db('restaurant-tests').collection('employees');
    // Retrieve the data using the aggregation pipeline
    const cursor = coll.aggregate(agg);

    const result = await cursor.toArray();

    return result;
}

async function listEmployeesSortByName(client) {
    const agg = [
        {
            '$sort': {
                'name': 1
            }
        }
    ];

    return getData(client, agg);
}

async function listEmployeesSortByHiringDate(client) {
    const agg = [
        {
            '$sort': {
                'hiring_date': -1
            }
        }
    ];

    return getData(client, agg);
}

async function listEmployeesByActiveStatus(client, isActive) {
    const agg = [
        {
            '$match': {
                'active': isActive
            }
        }, {
            '$sort': {
                'name': 1
            }
        }
    ];

    return getData(client, agg);
}

async function searchEmployeesByName(client, name) {
    const agg = [
        {
            '$match': {
                'name': {
                    '$regex': name + '*',
                    '$options': 'i'
                }
            }
        }
    ];

    return getData(client, agg);
}

async function searchEmployeesByEmail(client, email) {
    const agg = [
        {
            '$match': {
                'email': {
                    '$regex': email + '*',
                    '$options': 'i'
                }
            }
        }
    ];

    return getData(client, agg);
}

async function listSubsidiaryEmployeesSortByName(client, subsidiaryId) {
    const agg = [
        {
            '$match': {
                'subsidiary': new ObjectId(subsidiaryId)
            }
        }, {
            '$sort': {
                'name': 1
            }
        }
    ];

    return getData(client, agg);
}

async function listSubsidiaryEmployeesSortByHiringDate(client, subsidiaryId) {
    const agg = [
        {
            '$match': {
                'subsidiary': new ObjectId(subsidiaryId)
            }
        }, {
            '$sort': {
                'hiring_date': -1
            }
        }
    ];

    return getData(client, agg);
}

async function listSubsidiaryEmployeesByActiveStatus(client, subsidiaryId, isActive) {
    const agg = [
        {
            '$match': {
                'subsidiary': new ObjectId(subsidiaryId),
                'active': isActive
            }
        }, {
            '$sort': {
                'name': 1
            }
        }
    ];

    return getData(client, agg);
}

async function searchSubsidiaryEmployeesByName(client, subsidiaryId, name) {
    const agg = [
        {
            '$match': {
                'subsidiary': new ObjectId(subsidiaryId),
                'name': {
                    '$regex': name + '*',
                    '$options': 'i'
                }
            }
        }
    ];

    return getData(client, agg);
}

async function searchSubsidiaryEmployeesByEmail(client, subsidiaryId, email) {  const agg = [
        {
            '$match': {
                'subsidiary': new ObjectId(subsidiaryId),
                'email': {
                    '$regex': email + '*',
                    '$options': 'i'
                }
            }
        }
    ];

    return getData(client, agg);
}
