import express from 'express'
import fetchPostcodes from '../api/postcodeService'

const router = express.Router();

router.get('/:postcode', getPostcodes);

function getPostcodes(req, res) {

    const postcode = req.params.postcode;
    fetchPostcodes(postcode, (err, postcodes) => {

        if (err) {
            console.error("Error fetching postcodes",err);
            return res.status(500).end()
        }

        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(postcodes));
    });
}

export default router;
