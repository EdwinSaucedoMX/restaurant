/**
 * Do not use this function directly.
 * Use any other function in the component instead
 * @param client 
 * @param filter 
 * @returns 
 */
async function getData(client, filter) {
    // Select the collection
    const coll = client.db('restaurant-tests').collection('menu_items');
    // Retrieve the data applying the filter
    const cursor = coll.find(filter);

    const result = await cursor.toArray();

    return result;
}

async function listMenuItemsFromCategory(client, category) {
    const filter = {
        '$and': [
            {
                'category': category
            }, {
                '$or': [
                    {
                        'season_start': {
                            '$exists': false
                        }
                    }, {
                        '$and': [
                            {
                                'season_start': {
                                    '$lte': new Date()
                                }
                            }, {
                                'season_end': {
                                    '$gte': new Date()
                                }
                            }
                        ]
                    }
                ]
            }
        ]
    };

    return getData(client, filter);
}

async function searchMenuItemsByName(client, name) {
    const filter = {
        'name': {
            '$regex': name + '*', 
            '$options': 'i'
        }
    }

    return getData(client, filter);
}

async function listSubsidiaryMenyItemsFromCategory(client, category, subsidiaryId) {
    const filter = {
        '$and': [
            {
                'category': category
            }, {
                '$or': [
                    {
                        'season_start': {
                            '$exists': False
                        }
                    }, {
                        '$and': [
                            {
                                'season_start': {
                                    '$lte': datetime.utcnow()
                                }
                            }, {
                                'season_end': {
                                    '$gte': datetime.utcnow()
                                }
                            }
                        ]
                    }
                ]
            }, {
                '$or': [
                    {
                        'subsidiary': {
                            '$exists': False
                        }
                    }, {
                        'subsidiary': ObjectId(subsidiaryId)
                    }
                ]
            }
        ]
    }

    return getData(client, filter);
}

async function searchSubsidiaryMenuItemsByName(client, name, subsidiaryId) {
    const filter = {
        '$and': [
            {
                '$or': [
                    {
                        'subsidiary': {
                            '$exists': False
                        }
                    }, {
                        'subsidiary': ObjectId('63a394ac83f3f55449b85b93')
                    }
                ]
            }, {
                'name': {
                    '$regex': 'CADENA*', 
                    '$options': 'i'
                }
            }
        ]
    }

    return getData(client, filter);
}