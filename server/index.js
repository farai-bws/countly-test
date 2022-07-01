const express = require('express');
const Countly = require("countly-sdk-nodejs").Bulk;

const app = express();

const hasEnvVariables = process.env.COUNTLY_APP_KEY && process.env.COUNTLY_HOST;

let countlyServer = null;
if (hasEnvVariables) {
    countlyServer = new Countly({
        app_key: process.env.COUNTLY_APP_KEY,
        url: process.env.COUNTLY_HOST,
        debug: true
    });
}

app.get('/test-countly', (_, res) => {
    if (countlyServer) {
        countlyServer.add_bulk_request([
            { begin_session: 1, device_id: 'user@email.com', },
            { 
                metrics:{ _os: 'android', }, 
                device_id: 'device_id',
                events: JSON.stringify({
                    key: 'Test1',
                    count: 1,
                }),
            },
            { 
                metrics:{ _os: 'android', }, 
                device_id: 'device_id',
                events: JSON.stringify({
                    key: 'Test2',
                    count: 1,
                }),
            },
            { 
                metrics:{ _os: 'android', }, 
                device_id: 'device_id',
                events: JSON.stringify({
                    key: 'Test3',
                    count: 1,
                }),
            },
        ]);
    }
    res.json({ status: 'ok', });
});

app.get('*', (_, res) => res.send(`
    <h1>${process.env.APP_NAME}</h1>
    <a href="/test-countly">Test</a>
`));

app.listen(process.env.SERVER_PORT, e => {
    if (e) {
        console.log(e);
        process.exit(1);
    } else {
        console.log(`Server started on port ${process.env.SERVER_PORT}`);
    }
});
