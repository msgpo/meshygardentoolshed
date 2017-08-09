var test = require('tape');
var message = require('../message.js');

test('parse message', function (t) {
    t.plan(6);
    var msg = Buffer.from('{"data":{"humi":{"value":"60.400","type":"humi","unit":"pct"},"temp":{"value":"22.0","type":"temp","unit":"C"},"soil":{"value":757,"type":"soil","unit":"pct"}},"source":11605683}');
    var m = message.parse(msg);

    // t.equals(m, 'humi');
    t.equals(m[0].type, 'humi');
    t.equals(m[1].type, 'temp');
    t.equals(m[2].type, 'soil');
    t.equals(m[0].value, 60.4);
    t.equals(m[0].unit, 'pct');
    t.equals(m[0].source, '11605683');
});

test('parse non-message', function (t) {
    t.plan(1);
    var msg = Buffer.from('{}');
    var m = message.parse(msg);
    t.equals(m.length, 0);
});

test('parse invalid message', function (t) {
    t.plan(1);
    var msg = Buffer.from('xxxxxxxxxxxxxxxxxx');
    var m = message.parse(msg);
    t.equals(m.length, 0);
});

test('toTsv', function (t) {
    t.plan(1);
    t.equals(message.toTsv({
        type: 'temp',
        value: 12.3,
        unit: 'C',
        timestamp: 1498927890580,
        source: 'some source'
    }), 'temp\t12.3\tC\t1498927890580\tsome source');
});
