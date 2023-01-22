/**
 * Do not use this function directly.
 * Use any other function in the component instead
 * @param client 
 * @param filter 
 * @returns 
 */
async function getData(client, agg) {
    // Select the collection
    const coll = client.db('restaurant-tests').collection('bills');
    // Retrieve the data using the aggregation pipeline
    const cursor = coll.aggregate(agg);

    const result = await cursor.toArray();

    return result;
}

async function listBillsByDate(client) {
    const agg = [
        {
            '$sort': {
                'date': -1
            }
        }
    ];

    return getData(client, agg);
}

async function listWaiterBills(client, waiterId) {
    const agg = [
        {
            '$match': {
                'waiter': new ObjectId(waiterId)
            }
        }, {
            '$sort': {
                'date': -1
            }
        }
    ];

    return getData(client, agg);
}

async function listTopMenuItems(client, limit) {
    const agg = [
        {
            '$project': {
                '_id': 0,
                'date': 0,
                'reservation': 0,
                'waiter': 0,
                'total': 0,
                'tip': 0,
                'table': 0,
                'subsidiary': 0
            }
        }, {
            '$unwind': {
                'path': '$orders',
                'preserveNullAndEmptyArrays': false
            }
        }, {
            '$group': {
                '_id': '$orders',
                'count': {
                    '$sum': 1
                }
            }
        }, {
            '$sort': {
                'count': -1
            }
        }, {
            '$limit': limit
        }, {
            '$lookup': {
                'from': 'menu_items',
                'localField': '_id',
                'foreignField': '_id',
                'as': 'top_info'
            }
        }, {
            '$project': {
                '_id': 0,
                'count': 0
            }
        }, {
            '$unwind': {
                'path': '$top_info',
                'preserveNullAndEmptyArrays': false
            }
        }
    ];

    return getData(client, agg);
}

async function listTopWaiters(client, limit) {
    const agg = [
        {
          '$match': {
            'subsidiary': new ObjectId('63a621fe472d4a7662feeea6')
          }
        }, {
          '$project': {
            'year': {
              '$year': '$date'
            }, 
            'current_year': {
              '$year': new Date()
            }, 
            'month': {
              '$month': '$date'
            }, 
            'current_month': {
              '$month': new Date()
            }, 
            'waiter': 1
          }
        }, {
          '$match': {
            '$expr': {
              '$and': [
                {
                  '$eq': [
                    '$month', '$current_month'
                  ]
                }, {
                  '$eq': [
                    '$year', '$current_year'
                  ]
                }
              ]
            }
          }
        }, {
          '$group': {
            '_id': '$waiter', 
            'total_bills': {
              '$sum': 1
            }
          }
        }, {
          '$sort': {
            'total_bills': -1
          }
        }, {
          '$limit': 1
        }, {
          '$lookup': {
            'from': 'employees', 
            'localField': '_id', 
            'foreignField': '_id', 
            'as': 'best_waiter'
          }
        }, {
          '$unwind': {
            'path': '$best_waiter'
          }
        }
      ]

    return getData(client, agg);
}

async function listSubsidiaryBills(client, subsidiaryId) {
    const agg = [
        {
            '$match': {
                'subsidiary': new ObjectId(subsidiaryId)
            }
        }, {
            '$sort': {
                'date': -1
            }
        }
    ];

    return getData(client, agg);
}
