const request = require('request')
const geocode = (place, callback) => {
    // var msg = 0;
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(place) + '.json?access_token=pk.eyJ1Ijoiam9zZXBoYnlyZWRkeSIsImEiOiJjazF2MTBmMGYwamQxM2xueTRnY2dxM255In0.cDcOrvcCNiRe1likeKv6iQ&limit=1';
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to reach the Service', undefined)


        } else if (!body.features.length) {
            callback('Please enter a valid place', undefined)

        } else {
            callback(undefined, { longitude: body.features[0].center[0], latitude: body.features[0].center[1], location: body.features[0].place_name })


        }

    })
}


module.exports = { geocode }