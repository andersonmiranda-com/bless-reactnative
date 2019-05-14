exports = function(user, dateRange0, dateRange1) {
    /*
    Accessing application's values:
    var x = context.values.get("value_name");

    Accessing a mongodb service:
    var collection = context.services.get("mongodb-atlas").db("dbname").collection("coll_name");
    var doc = collection.findOne({owner_id: context.user.id});

    To call other named functions:
    var result = context.functions.execute("function_name", arg1, arg2);

    Try running in the console below.
  */

    console.log(user._id);

    const mongodb = context.services.get("bless-club-mongodb");
    const usersCollection = mongodb.db("bless").collection("users");
    const relationsCollection = mongodb.db("bless").collection("relations");

    const query = { _id: user._id };

    var result = relationsCollection.findOne(query).then(res => {
        console.log(res);

        let swipes = [];

        if (res !== null) {
            swipes = swipes
                .concat(res.liked || [])
                .concat(res.superliked || [])
                .concat(res.disliked || []);
        }

        swipes = swipes.concat(user._id);

        console.log(swipes);

        let query2 = {
            location: {
                $nearSphere: {
                    $geometry: {
                        type: "Point",
                        coordinates: [user.location.coordinates[0], user.location.coordinates[1]]
                    },
                    $maxDistance: user.distance * 1000
                }
            },
            showMe: true,
            birthday: {
                $gt: dateRange1,
                $lte: dateRange0
            },
            _id: { $nin: swipes }  //// <<<<<<<<<<<<<<<<<< não finciona no $nin no Stitch!!!!
        };

        if (user.gender === "Male") {
            query2.showMen = true;
        }
        if (user.gender === "Female") {
            query2.showWomen = true;
        }

        if (user.showMen && !user.showWomen) {
            query2.gender = "Male";
        } else if (user.showWomen && !user.showMen) {
            query2.gender = "Female";
        }

        const options = { birthday: 1, first_name: 1, bio: 1, _id: 1, image: 1, location: 1 };

        return usersCollection
            .find(query2, options)
            .limit(2)
            .toArray();
    });

    return result;
};
