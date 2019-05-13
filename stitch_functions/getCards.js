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

    const mongodb = context.services.get("bless-club-mongodb");
    const userCollection = mongodb.db("bless").collection("users");

    let query = {
        //_id: { $ne: this.props.user._id },
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
        }
    };

    if (user.gender === "Male") {
        query.showMen = true;
    }
    if (user.gender === "Female") {
        query.showWomen = true;
    }

    if (user.showMen && !user.showWomen) {
        query.gender = "Male";
    } else if (user.showWomen && !user.showMen) {
        query.gender = "Female";
    }

    const options = { birthday: 1, first_name: 1, bio: 1, _id: 1, image: 1, location: 1 };

    var result = userCollection.find(query, options).toArray();

    return result;
};
