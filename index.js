var mosca = require('mosca');
var message = require('./message');

var moscaSettings = function() {
  return { port: 1883, host: '0.0.0.0' };
}

var server = new mosca.Server(moscaSettings());
server.on('ready', setup);

server.on('clientConnected', function(client) {
  logError('client connected', client.id);
});

// fired when a message is received
server.on('published', function(packet) {
  console.error('Published', packet.payload);
  var msg = message.parse(packet.payload);
  if (msg) {
      console.log(message.toTsv(msg));
  } else {
      logError('failed to parse [' + packet.payload + ']');
  }
});

server.on('error', function(client) {
  logError('some errors');
});

// fired when the mqtt server is ready
function setup() {
  logError('Mosca server is up and running')
}

var logError = function(msg) {
  console.error('[' + new Date() + ']: [' + msg + ']');
}


//module.exports = { parse: parse };
