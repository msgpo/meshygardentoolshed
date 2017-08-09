var test = require('tape');
var message = require('../message.js');

test('parse message', function (t) {
    // @todo: write test for parsing JSON.
    // t.plan(5);
    t.plan(0);
    var msg = Buffer.from([0x74, 0x65, 0x6d, 0x70, 0x09, 0x31, 0x09, 0x32, 0x35, 0x2e, 0x38, 0x30, 0x30, 0x09, 0x43, 0x0a]);
    // t.equals(msg.toString(), 'temp\t1\t25.800\tC\n');
    var m = message.parse(msg);

    // t.equals(m.type, 'temp');
    // t.equals(m.seq, '1');
    // t.equals(m.value, 25.8);
    // t.equals(m.unit, 'C');
});

test('parse another message', function (t) {
    // @todo: write test for parsing JSON.
    // t.plan(4);
    t.plan(0);
    var msg = Buffer.from([0x74, 0x65, 0x6d, 0x70, 0x20, 0x33, 0x30, 0x2e, 0x37, 0x30, 0x30, 0x20, 0x43, 0x09, 0x74, 0x65, 0x73, 0x74]);
    var m = message.parse(msg);
    // t.equals(m.type, 'temp');
    // t.equals(m.value, 30.7);
    // t.equals(m.unit, 'C');
    // t.equals(m.source, 'test');
});

test('non-message', function (t) {
    t.plan(1);
    var msg = Buffer.from([]);
    var m = message.parse(msg);
    t.notOk(m);
});

test('toTsv', function (t) {
    t.plan(1);
    t.equals(message.toTsv({
        type: 'temp',
        value: '12.3',
        unit: 'C',
        timestamp: 1498927890580,
        source: 'some source'}),
        'temp\tt12.3\tC\t1498927890580\tsome source');
});
