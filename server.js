const express = require('express');
const fs = require('fs');
const https = require('https');

const app = express();
const port = process.env.PORT || 8000;

app.use(express.static('./public'));

const creds = {
    key: fs.readFileSync('server.key'), // magic
    cert: fs.readFileSync('server.crt')
};

var httpsServer = https.createServer(creds, app);

httpsServer.listen(port, () =>
{
    console.log(`Server listening at http://localhost:${port}`);
});