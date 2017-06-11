'use strict';
const axios = require('axios');
const dotenv = require('dotenv');
const Fuse = require('fuse-email');

/**
 * Load environment variables from .env file, where API keys and passwords are configured.
 */
dotenv.load({ path: '.env.example' });

const fuse = Fuse({
    email_key: process.env.FUSE_EMAIL_KEY,
    sending_address: process.env.FUSE_SENDING_ADDRESS,
    inbound_address: process.env.FUSE_INBOUND_ADDRESS,
    domain: process.env.FUSE_DOMAIN,
    endpoint: process.env.FUSE_ENDPOINT,
    name: process.env.FUSE_NAME,
    auth_token: process.env.FUSE_AUTH_TOKEN,
    size_limit: process.env.FUSE_SIZE_LIMIT,
    transport: process.env.FUSE_TRANSPORT,
    restrict_inbound: false
});

const testText = '*Name:* Eunice Ow\n\n*Email Address:* eow@fresh.com\n\n*I would like to enquire about:* Pop Up/ Live Event\n\n*Message:* Hi!\n\nI saw your collaboration with Skin Inc earlier this year for Mother\'s Day\nand I got your card. Actually I\'m doing marketing for Fresh, and I plan\nstore activations (like the one you did for Skin Inc) and CRM events.\n\nI\'m currently planning an upcoming CRM event where we would like to engage\nyour beautiful calligraphy service to do personalization/calligraphy as\ngifts for our guests. The details have yet to be finalized yet, but we may\nbe running 2 days - 7th (6.30pm to 8pm) & 8th October (split into 3\nsessions, starting from 11am to 12.30pm, 1.30pm to 3pm and 4pm to 5.30pm)\n\nCan I just check on your availability on this 2 dates and how do you charge\nfor such pop-up events?\n\nHear from you soon!\n\nRegards,\nEunice\n\n(Sent via *eterate.co <http://www.eterate.co/>*)\n';
// language.detectSyntax(testText)
//   .then(syntax => console.log(JSON.stringify(syntax[1].sentences, null, '  ')));
// language.detectSentiment(testText)
//   .then(sentiment => console.log(JSON.stringify(sentiment[0])));
// language.detectEntities(testText)
//   .then(entities => console.log(JSON.stringify(entities[1])));

fuse.setupServer(3001, function (err, server) {
  fuse.setupEndpoint(server, function () {
  	fuse.on('email_received', async function (responder, inboundMessage) {
      const webResponse = await axios.post(process.env.WEB_WEBHOOK, { inboundMessage });
      console.log(webResponse.status);
      console.log(webResponse.data);
      if (webResponse.status === 200) {
        responder.reply(webResponse.data);
      }
    });
  });
});
