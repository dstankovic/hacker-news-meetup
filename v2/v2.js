const request = require('request');

exports.handler = (event, context, next) => {
    const url = `https://api.coinmarketcap.com/v1/ticker/${event.crypto}`;
    request(url, { json: true }, (err, res, body) => {
        if (err) { context.done(null); }
        next(null,body);
        context.succeed();
    });
};

///  claudia create --region eu-central-1 --handler v2.handler
