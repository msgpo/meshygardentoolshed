var test = require('tape');
var message = require('../message.js');

test('parse message', function (t) {
    t.plan(5);
    var msg = Buffer.from([0x74, 0x65, 0x6d, 0x70, 0x09, 0x31, 0x09, 0x32, 0x35, 0x2e, 0x38, 0x30, 0x30, 0x09, 0x43, 0x0a]);
    t.equals(msg.toString(), 'temp\t1\t25.800\tC\n');
    var m = message.parse(msg);

    t.equals(m.type, 'temp');
    t.equals(m.seq, '1');
    t.equals(m.value, 25.8);
    t.equals(m.unit, 'C');
});

test('parse another message', function (t) {
    t.plan(4);
    var msg = Buffer.from([0x74, 0x65, 0x6d, 0x70, 0x09, 0x38, 0x09, 0x33, 0x30, 0x2e, 0x37, 0x30, 0x30, 0x09, 0x43, 0x0a]);
    var m = message.parse(msg);
    t.equals(m.type, 'temp');
    t.equals(m.seq, '8');
    t.equals(m.value, 30.7);
    t.equals(m.unit, 'C');
});
