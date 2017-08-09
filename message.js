module.exports = {
    parse: function (buffer) {
        var timestamp = new Date();
        var input = JSON.parse(buffer.toString().trim());
        return input.data.map(function (data) {
            data.value = 1 * data.value;
            data.timestamp = 1 * timestamp;
            data.source = input.source;
            return data;
        });
    },
    toTsv: function (msg) {
        return [
            msg.type,
            msg.value,
            msg.unit,
            msg.timestamp,
            msg.source
        ].join('\t')
    }
};
