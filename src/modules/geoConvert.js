export const getCoordinates = (center, radius) => {
    // ref: http://www.movable-type.co.uk/scripts/latlong.html
    // Destination point given distance and bearing from start point

    const destinationPoint = (center, distance) => {
        var R = 6371e3;
        const { latitude, longitude } = center;

        var earth = 6378.137, //radius of the earth in kilometer
            pi = Math.PI,
            km = 1 / (((2 * pi) / 360) * earth); //1 meter in degree

        var new_latitude = latitude + distance * km;
        var new_longitude = longitude + (distance * km) / Math.cos(latitude * (Math.PI / 180));

        return {
            latitude: new_latitude,
            longitude: wrapLongitude(new_longitude)
        };
    };

    function wrapLongitude(longitude) {
        if (longitude <= 180 && longitude >= -180) {
            return longitude;
        }
        const adjusted = longitude + 180;
        if (adjusted > 0) {
            return (adjusted % 360) - 180;
        }
        // else
        return 180 - (-adjusted % 360);
    }

    function distance(location1, location2) {
        const radius = 6371; // Earth's radius in kilometers
        const latDelta = toRad(location2.latitude - location1.latitude);
        const lonDelta = toRad(location2.longitude - location1.longitude);

        const a =
            Math.sin(latDelta / 2) * Math.sin(latDelta / 2) +
            Math.cos(toRad(location1.latitude)) *
                Math.cos(toRad(location2.latitude)) *
                Math.sin(lonDelta / 2) *
                Math.sin(lonDelta / 2);

        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        return radius * c;
    }

    function toRad(deg) {
        return deg * (Math.PI / 180);
    }

    const sw = destinationPoint(center, -1 * radius);
    const ne = destinationPoint(center, radius);

    return { sw, ne };
};

export const geoDistance = (location1, location2) => {
    const radius = 6371; // Earth's radius in kilometers
    const latDelta = toRad(location2.latitude - location1.latitude);
    const lonDelta = toRad(location2.longitude - location1.longitude);

    const a =
        Math.sin(latDelta / 2) * Math.sin(latDelta / 2) +
        Math.cos(toRad(location1.latitude)) *
            Math.cos(toRad(location2.latitude)) *
            Math.sin(lonDelta / 2) *
            Math.sin(lonDelta / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    function toRad(deg) {
        return deg * (Math.PI / 180);
    }

    return radius * c;
};
