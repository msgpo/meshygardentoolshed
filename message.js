module.exports = {
    parse: function (buffer) {
        try {
            var json = JSON.parse(buffer.toString().trim());
            var timestamp = new Date();
            return Object.values(json.data).map(function (msg) {
                msg.type = msg.type + "";
                msg.value = 1 * msg.value;
                msg.unit = msg.unit + "";
                msg.timestamp = 1 * timestamp;
                msg.source = json.source + "";
                return msg;
            });
        }
        catch (e) {
            return [];
        }
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
