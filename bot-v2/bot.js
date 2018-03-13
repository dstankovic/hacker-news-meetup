var botBuilder = require('claudia-bot-builder')

const fbTemplate = require('claudia-bot-builder').fbTemplate;

module.exports = botBuilder((request) => {
  return new fbTemplate.Button('Are you a javascript developer?')
    .addButton('No','No')
    .addButton('Yes','Yes I am').get()
  
});