const Router = require('express').Router;

const { registerBind, sendNotification } = require('./notification_handler');
const tokenGenerator = require('./token_generator');
const config = require('./config');

const router = new Router();

// Convert keys to camelCase to conform with the twilio-node api definition contract
const camelCase = require('camelcase');

function camelCaseKeys(hashmap) {
    var newhashmap = {};
    Object.keys(hashmap).forEach(function(key) {
        var newkey = camelCase(key);
        newhashmap[newkey] = hashmap[key];
    });
    return newhashmap;
};

router.get('/token/:id?', (req, res) => {
    const id = req.params.id;
    res.send(tokenGenerator(id));
});

router.post('/token', (req, res) => {
    const id = req.body.id;
    res.send(tokenGenerator(id));
});

router.post('/register', (req, res) => {
    var content = camelCaseKeys(req.body);
    registerBind(content).then((data) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.status(data.status);
        res.send(data.data);
    });
});

router.post('/send-notification', (req, res) => {
    var content = camelCaseKeys(req.body);
    sendNotification(content).then((data) => {
        res.status(data.status);
        res.send(data.data);
    });
});

router.get('/config', (req, res) => {
    res.json(config);
});


//Create a facebook-messenger binding based on the authentication webhook from Facebook
router.post('/messenger_auth', function(req, res) {
    //Extract the request received from Facebook
    const message = req.body.entry[0].messaging[0];
    console.log(message);
    // Set user identity using their fb messenger user id
    const identity = message.sender.id;
    //Let's create a new facebook-messenger Binding for our user
    const binding = {
        "identity": identity,
        "BindingType": 'facebook-messenger',
        "Address": message.sender.id
    };
    registerBind(camelCaseKeys(binding)).then((data) => {
        res.status(data.status);
        res.send(data.data);
    });
});

//Verification endpoint for Facebook needed to register a webhook.
router.get('/messenger_auth', function(req, res) {
    console.log(req.query["hub.challenge"]);
    res.send(req.query["hub.challenge"]);
});

router.post('/Services/IS866b263b93e34e71b59ac47d7d157d22/Channels/CHd761524f39414deea19af42bd9fe38e0/Webhooks/', (req, res) => {
    // Download the helper library from https://www.twilio.com/docs/node/install
    // Your Account Sid and Auth Token from twilio.com/console
    // DANGER! This is insecure. See http://twil.io/secure
    // const accountSid = 'AC017b5d048e9a72d7e9010a8d1a07744a';
    // const authToken = '546d651ef2b5d9d1b3e808c04e3ec1a7';
    // const client = require('twilio')(accountSid, authToken);

    // client.chat.services('IS866b263b93e34e71b59ac47d7d157d22')
    //     .channels('CHd761524f39414deea19af42bd9fe38e0')
    //     .webhooks
    //     .create({
    //         'configuration.filters': ['onMessageSent'],
    //         'configuration.method': 'POST',
    //         'configuration.url': '{https://channels.autopilot.twilio.com/v1/AC017b5d048e9a72d7e9010a8d1a07744a/UAe7bf7d669578ebfa46638da9d424f733/twilio-chat}',
    //         type: 'webhook'
    //     })
    //     .then(webhook => console.log(webhook.sid));



});

module.exports = router;