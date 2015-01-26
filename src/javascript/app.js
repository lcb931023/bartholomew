var $ = require('jquery');
var _ = require('underscore');

var messageTemplate = _.template("<p>Made with <%= feels %> by <a href='<%= url %>'><%= codeMonkey %>!</a></p>");

var message = messageTemplate({
  codeMonkey: 'Changbai Li',
  feels: '♥',
  url: 'http://changbai.li'
});

$('body').append(message);

console.log('app.js loaded!');
