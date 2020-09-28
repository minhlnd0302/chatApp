var common = {
    clone: function (item) {
        return JSON.parse(JSON.stringify(item));
    }
};
var WebSocketClient = function (options) {
    var _options = common.clone(options);
    var _getUri = function (param) {
        var _param = param || {};
        _param.domain = _param.domain || "localhost"; //echo.websocket.org
        _param.port = _param.port || 8088;
        _param.scheme = _param.scheme || "ws:";
        return _param.scheme + "//" + _param.domain + ":" + _param.port;
    };
    var _websocketClient = function () {
        if (window.MozWebSocket) {
            window.WebSocket = window.MozWebSocket;
        }
        if (!window.WebSocket) {
            return null;
        }
        var uri = _getUri(_options);
        try {
            return new WebSocket(uri);
        }
        catch (e) {
            console.log(e);
            return {};
        }
    };
    var __client = null;
    var _buildClient = function () {
        if (__client != null) {
            if (__client.readyState == 1) {
                return __client;
            }
        }
        var _websocket = _websocketClient();
        _websocket.onopen = function (evt) {
            options.onOpen && options.onOpen(event);
            console.log(evt);
        };
        _websocket.onclose = function (evt) {
            options.onClose && options.onClose(evt);
            console.log(evt);
        };
        _websocket.onmessage = function (evt) {
            options.onMessage && options.onMessage(event);
            console.log(evt.data);
        };
        _websocket.onerror = function (evt) {
            options.onError && options.onError(evt);
            console.log(evt);
        };
        __client = _websocket;
        return __client;
    };
    _buildClient();
    setInterval(function () {
        _buildClient();
        console.log('build client')
    }, 3000);
    return {
        getInfo: function () {
            return common.clone(_options);
        },
        sendMessage: function (data, timeOut) {
            if (typeof data == "object") {
                data = JSON.stringify(data);
            }
            var func = function (i) {
                setTimeout(function () {
                    if (__client != null && __client.readyState == 1) {
                        __client.send(data);
                    } else {
                        if (i <= 0) {
                            return;
                        } else {
                            func(i - 1);
                        }
                    }
                },100);
            }
            func(30);
        }
    };
};



