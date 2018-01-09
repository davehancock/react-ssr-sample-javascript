import express from 'express'
import fs from 'fs';

import config from '../config'
import render from '../render'

const router = express.Router();

router.get('/', serveIndexPage);

function serveIndexPage(req, res) {

    fs.readFile(config.indexLocation, 'utf8', (err, htmlTemplate) => {

        if (err) {
            console.error('Unexpected error loading index page', err);
            return res.status(404).end()
        }

        render(req.baseUrl, htmlTemplate, (err, renderedTemplate) => {

            if (err) {
                console.error('Error during template rendering', err);
                return res.status(500).end()
            }
            res.send(renderedTemplate);
        });
    })
}

export default router;
