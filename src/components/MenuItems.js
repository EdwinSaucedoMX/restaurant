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

    // Select the collection
    const coll = client.db('restaurant-tests').collection('menu_items');
    // Retrieve the data applying the filter
    const cursor = coll.find(filter);

    const result = await cursor.toArray();

    return result;
}

