'use strict';
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
    transport: process.env.FUSE_TRANSPORT
});

fuse.setupServer(3001, function(err, server) {
  fuse.setupEndpoint(server, function() {
  	// fuse is now running
  });
});
