var mosca = require('mosca');
var message = require('./message');

var moscaSettings = function() {
  // for heroku 
  if (process.env.NODE_ENV == 'production') {
    console.log('hello heroku');
    var config = {};
    config.port = (1 * process.env.PORT) || 1883;
    return config;
  } else {
    return { port: 1883, host: '0.0.0.0' }
  }
}

var server = new mosca.Server(moscaSettings());
server.on('ready', setup);

server.on('clientConnected', function(client) {
  console.error('client connected', client.id);
});

// fired when a message is received
server.on('published', function(packet, client) {
  console.error('Published', packet.payload);
  var msg = message.parse(packet.payload);
  if (msg) {
      console.log(message.toTsv(msg.type));
  } else {
      console.error('failed to parse [' + packet.payload + ']');
  }
});

server.on('error', function(client) {
  console.error('some errors');
});

// fired when the mqtt server is ready
function setup() {
  console.error('Mosca server is up and running')
};


//module.exports = { parse: parse };
