module.exports = {
    parse: function (buffer) {
        var parts = buffer.toString().trim().split('\t');
        var msg = undefined;
        if (parts.length > 3) {
            msg = { type: parts[0],
                seq: parts[1],
                value: 1 * parts[2],
                unit: parts[3],
                timestamp: new Date(),
                source: 'unknown' };
        }
        return msg;
    },
    toTsv: function(msg) {
       return [msg.type, msg.seq, msg.value, msg.unit, 1*msg.timestamp, msg.source].join('\t')
    }
};