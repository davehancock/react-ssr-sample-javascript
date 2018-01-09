import express from 'express'
import compression from 'compression'

import config from './config'
import indexRoute from './routes/index'
import postcodeRoute from './routes/postcode'

const app = express();

// Mapped Routes
app.use('/', indexRoute);
app.use('/postcode', postcodeRoute);

// Gzip
app.use(compression());

// Static assets
app.use(express.static(config.staticLocation));

app.listen(config.port, function () {
    console.log(`Sample app listening on port ${config.port}`);
});

// Other paths
app.use('/**', indexRoute);
