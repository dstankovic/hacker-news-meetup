const botBuilder = require('claudia-bot-builder'),
      fbTemplate = require('claudia-bot-builder').fbTemplate,
      rp = require('minimal-request-promise');

module.exports = botBuilder((request, originalApiRequest) => {

  if(!request.postback){
    return new fbTemplate.Button('Are you a javascript developer?')
    .addButton('No','JS_NO')
    .addButton('Yes','JS_YES').get()
  }

  if (request.text === 'JS_YES'){
      return jsFramework();
  }
  
  if(request.text === 'JS_NO') {
    return noJs(request.sender, originalApiRequest.env.facebookAccessToken);
  }

});


function jsFramework(){
  return new fbTemplate.Generic()
    .addBubble(`ReactJS`, 'In computing, React is a JavaScript library for building user')
      .addImage('https://blog.algolia.com/wp-content/uploads/2015/11/React_illo_final_720x400.png')
      .addButton('Website', 'https://reactjs.org/')
    .addBubble(`Angular`, 'Angular is a TypeScript-based open-source front-end web')
      .addImage('https://christianliebel.com/wp-content/uploads/2016/02/Angular2-825x510.png')
      .addButton('Website', 'https://angular.io/')
    .addBubble('VueJS', 'Vue.js is an progressive JavaScript framework')
      .addImage('https://ih1.redbubble.net/image.393347406.1344/flat,800x800,075,t.jpg')
      .addButton('Website', 'https://vuejs.org/')
    .addBubble('Elm', 'Purely functional, and is developed with emphasis performance ...')
      .addImage('https://appendto.com/wp-content/uploads/2017/03/ElmLogo.png')
      .addButton('Website', 'http://elm-lang.org/')
    .get()
}

function noJs(sender,facebookAccessToken){
  return rp.get(`https://graph.facebook.com/v2.6/${sender}?fields=first_name,last_name,profile_pic,locale,timezone,gender&access_token=${facebookAccessToken}`)
    .then(response => {
      const user = JSON.parse(response.body)
      return [
        new fbTemplate.Image('https://i.pinimg.com/736x/4e/8d/fb/4e8dfb939a007953f255592cbf120609--keep-calm.jpg').get(),
        `You know nothing, ${user.first_name}.`
      ]
    })
}