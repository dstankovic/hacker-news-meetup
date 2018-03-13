var botBuilder = require('claudia-bot-builder')

module.exports = botBuilder( (request) => {
  return 'Thanks for sending ' + request.text;
});

// claudia create --region eu-central-1 --api-module bot
// claudia update --configure-fb-bot