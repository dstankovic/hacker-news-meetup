exports.handler =  (event, context) => {
    const date = new Date();
	context.succeed(`Today is: ${date}`);
};


///  claudia create --region eu-central-1 --handler v1.handler
