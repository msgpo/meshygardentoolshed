var test = require('tape');
var mqtt = require('mqtt');

var assertPubSub = function (t, url, msg) {
    var text = msg || 'Hello mqtt';
    var client = mqtt.connect(url);

    client.on('connect', function () {
        client.subscribe('presence');
        client.publish('presence', text);
    });

    client.on('message', function (topic, message) {
        // message is Buffer
        console.log(message.toString());
        client.end();
        t.equal(message.toString(), text);
    });
};

test('pub linecheck', function (t) {
    t.plan(1);
    assertPubSub(t, 'mqtt://test.mosca.io');
});

test('peoples linecheck', function (t) {
    t.plan(1);
    assertPubSub(t, 'mqtt://peoplesopen.net', '{"data":{"humi":{"value":"60.400","type":"humi","unit":"pct"},"temp":{"value":"22.0","type":"temp","unit":"C"},"soil":{"value":757,"type":"soil","unit":"pct"}},"source":11605683}');
});


