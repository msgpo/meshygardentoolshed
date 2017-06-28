var mosca = require('mosca')

var _ascoltatore = {
  //using ascoltatore
  type: 'mongo',		
  url: 'mongodb://localhost:27017/mqtt',
  pubsubCollection: 'ascoltatori',
  mongo: {}
};

var _moscaSettings = {
  port: 1883,
  _backend: _ascoltatore,
  _persistence: {
    factory: mosca.persistence.Mongo,
    url: 'mongodb://localhost:27017/mqtt'
  }
};

var moscaSettings = {
  port: 1883,
  host: '0.0.0.0'
}

var server = new mosca.Server(moscaSettings);
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
