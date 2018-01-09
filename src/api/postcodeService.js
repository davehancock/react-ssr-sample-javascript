import https from 'https';

const API_ENDPOINT = 'https://api.postcodes.io';
const QUERY_STRING = '/postcodes/?q=';

function fetchPostcodes(postcode, cb) {

    // Could use a promise based api here instead, but trying to keep it a little vanilla
    return https.get(API_ENDPOINT + QUERY_STRING + postcode, (res) => {

        let body = "";
        res.on('data', (data) => {
            body += data;
        });

        res.on("end", () => {
            body = JSON.parse(body);

            let formattedPostcodes = [];
            body.result.forEach((x) => {
                const postcode = {
                    postcode: x.postcode,
                    country: x.country,
                    region: x.region,
                    longitude: x.longitude,
                    latitude: x.latitude
                };
                formattedPostcodes.push(postcode);
            });

            return cb(null, formattedPostcodes);
        });

        res.on('error', (e) => {
            return cb(e, []);
        });
    });
}

export default fetchPostcodes

