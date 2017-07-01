var test = require('tape');

test('parse message', function(t) {
  t.plan(5);
  var msg = Buffer.from([0x74, 0x65, 0x6d, 0x70, 0x09, 0x31, 0x09, 0x32, 0x35, 0x2e, 0x38, 0x30, 0x30, 0x09, 0x43, 0x0a]);
    t.equals(msg.toString(), 'temp\t1\t25.800\tC\n');
    var parts = msg.toString().trim().split('\t');
    var m = { type: parts[0], seq: parts[1], value: 1*parts[2], unit: parts[3]};
    t.equals(m.type, 'temp');
    t.equals(m.seq, '1');
    t.equals(m.value, 25.8);
    t.equals(m.unit, 'C');
});
