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

Flatdoc.github = function (opts) {
    if (typeof opts === 'string') {
        opts = {
            repo: arguments[0],
            filepath: arguments[1]
        };
    }
    var url;
    if (opts.filepath) {
        url = 'https://api.github.com/repos/' + opts.repo + '/contents/' + opts.filepath;
    } else {
        url = 'https://api.github.com/repos/' + opts.repo + '/readme';
    }
    var data = {};
    if (opts.token) {
        data.access_token = opts.token;
    }
    if (opts.ref) {
        data.ref = opts.ref;
    }
    return function (callback) {
        $.get(url, data)
            .fail(function (e) { callback(e, null); })
            .done(function (data) {
                var markdown = exports.Base64.decode(data.content);
                callback(null, markdown);
            });
    };
};

const loadData = (locations, response, callback) => {
    if (locations.length === 0) {
      callback(null, response);
      return;
    }
  
    const location = locations.shift();
  
    fetch(location)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.text();
      })
      .then(data => {
        if (response.length > 0) {
          response += '\n\n';
        }
        response += data;
        loadData(locations, response, callback);
      })
      .catch(error => {
        callback(error, null);
      });
  };
  
  const loadDataCallback = (url, callback) => {
    const urls = Array.isArray(url) ? url : [url];
    loadData(urls, '', callback);
  };