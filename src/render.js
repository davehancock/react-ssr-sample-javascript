import React from 'react'
import {renderToString} from 'react-dom/server'
import {StaticRouter} from 'react-router'
import serialize from 'serialize-javascript';

import App from '../react-src/components/app'
import fetchPostcodes from './api/postcodeService'

function render(currentLocation, template, cb) {

    const initialPostcode = 'ST5';
    fetchPostcodes(initialPostcode, (err, postcodes) => {

        if (err) {
            return cb(err, null)
        }

        const initialState = {
            postcodes: postcodes,
            postcodeQuery: initialPostcode
        };

        const appString = renderToString(
            <StaticRouter location={currentLocation} context={{}}>
                <App store={initialState}/>
            </StaticRouter>
        );

        const renderedTemplate = template
            .replace('SERVER_RENDERED_HTML', appString)
            .replace("SERVER_RENDERED_STATE", serialize(initialState, {isJSON: true}));

        return cb(null, renderedTemplate);
    })
}

export default render;
