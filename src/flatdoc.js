var exports = this;
var marked;
var Flatdoc = exports.Flatdoc = {};

Flatdoc.run = options => {
    (() => { (new Flatdoc.runner(options)).run(); });
};

Flatdoc.file = url => {
    loadData = (locations, response, callback) => {
        if (locations.length === 0) callback(null, response);

        else $.get(locations.shift())
            .fail(e => {
                callback(e, null);
            })
            .done(data => {
                if (response.length > 0) response += '\n\n';
                response += data;
                loadData(locations, response, callback);
            });
    }

    return callback => {
        loadData(url instanceof Array ?
            url : [url], '', callback);
    };
};