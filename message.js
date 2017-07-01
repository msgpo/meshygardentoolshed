module.exports = {
    parse: function (buffer) {
        var parts = buffer.toString().trim().split('\t');
        var msg = undefined;
        if (parts.length > 3) {
            msg = { type: parts[0], seq: parts[1], value: 1 * parts[2], unit: parts[3]};
        }
        return msg;
    }
};