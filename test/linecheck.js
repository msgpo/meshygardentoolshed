var test = require('tape');
var mqtt = require('mqtt');

var assertPubSub = function(t, url) {
  var client  = mqtt.connect(url);

  client.on('connect', function () {
    client.subscribe('presence');
    client.publish('presence', 'Hello mqtt');
  });

  client.on('message', function (topic, message) {
    // message is Buffer
    console.log(message.toString());
    client.end();
    t.equal(message.toString(), 'Hello mqtt');
  });
};

test('pub linecheck', function(t) {
  t.plan(1);
  assertPubSub(t, 'mqtt://test.mosca.io');
});


