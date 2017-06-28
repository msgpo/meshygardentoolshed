var mosca = require('mosca')

var moscaSettings = function() {
  // for heroku 
  if (process.env.NODE_ENV == 'production') {
    console.log('hello production');
    var config = {};
    config.port = process.env.PORT || 1883;
    return config;
  } else {
    return { port: 1883, host: '0.0.0.0' }
  }
}

var server = new mosca.Server(moscaSettings());
server.on('ready', setup);

server.on('clientConnected', function(client) {
  console.log('client connected', client.id);		
});

// fired when a message is received
server.on('published', function(packet, client) {
  console.log('Published', packet.payload);
});

server.on('error', function(client) {
  console.log('some errors');
});

// fired when the mqtt server is ready
function setup() {
  console.log('Mosca server is up and running')
}
