const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger/swagger.json');
const fs = require('fs');

const app = express();

// !!!!!!!!!!!!!!!!!*********** Dont have this in prod
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => res.send('Payment API - Manages payments for various payment methods.'));

app.use(require('./components'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const server = https.createServer({
    key: fs.readFileSync(process.env.SERVER_KEY),
    cert: fs.readFileSync(process.env.SERVER_CERT),
    requestCert: true,
    rejectUnauthorized: false
}, app).listen(process.env.PORT, () => console.log(`Payment app listening on port ${process.env.PORT}!`));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

module.exports = server; // for testing