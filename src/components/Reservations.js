/**
 * Do not use this function directly.
 * Use any other function in the component instead
 * @param client 
 * @param agg 
 * @returns 
 */
async function getData(client, agg) {
    // Select the collection
    const coll = client.db('restaurant-tests').collection('reservations');
    // Retrieve the data using the aggregation pipeline
    const cursor = coll.aggregate(agg);

    const result = await cursor.toArray();

    return result;
}

async function listCurrentReservations(client) {
    const agg = [
        {
            '$match': {
                'date': {
                    '$gte': new Date()
                }
            }
        }, {
            '$sort': {
                'date': 1
            }
        }
    ];

    return getData(client, agg);
}

async function searchCurrentResevationsByName(client, name) {
    const agg = [
        {
            '$match': {
                'client': {
                    '$regex': name,
                    '$options': 'i'
                },
                'date': {
                    '$gte': new Date()
                }
            }
        }, {
            '$sort': {
                'date': 1
            }
        }
    ];

    return getData(client, agg);
}

async function searchCurrentReservationsByPhone(client, phone) {
    const agg = [
        {
            '$match': {
                'phone': {
                    '$regex': phone,
                    '$options': 'i'
                },
                'date': {
                    '$gte': new Date()
                }
            }
        }, {
            '$sort': {
                'date': 1
            }
        }
    ];

    return getData(client, agg);
}

async function listPastReservations(client) {
    const agg = [
        {
            '$match': {
                'date': {
                    '$lt': new Date()
                }
            }
        }, {
            '$sort': {
                'date': -1
            }
        }
    ];

    return getData(client, agg);
}

async function searchPastReservationsByName(client, name) {
    const agg = [
        {
            '$match': {
                'client': {
                    '$regex': name,
                    '$options': 'i'
                },
                'date': {
                    '$lt': new Date()
                }
            }
        }, {
            '$sort': {
                'date': -1
            }
        }
    ];

    return getData(client, agg);
}

async function searchPastReservationsByPhone(client, phone) {
    const agg = [
        {
            '$match': {
                'phone': {
                    '$regex': phone,
                    '$options': 'i'
                },
                'date': {
                    '$lt': new Date()
                }
            }
        }, {
            '$sort': {
                'date': -1
            }
        }
    ];

    return getData(client, agg);
}

async function searchAllReservationsByName(client, name) {
    const agg = [
        {
            '$match': {
                'client': {
                    '$regex': name,
                    '$options': 'i'
                }
            }
        }, {
            '$sort': {
                'date': -1
            }
        }
    ];

    return getData(client, agg);
}

async function searchAllReservationsByPhone(client, phone) {
    const agg = [
        {
            '$match': {
                'phone': {
                    '$regex': phone,
                    '$options': 'i'
                }
            }
        }, {
            '$sort': {
                'date': -1
            }
        }
    ];

    return getData(client, agg);
}
