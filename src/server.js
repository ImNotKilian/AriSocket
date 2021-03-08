/* Some libraries */
const net = require('net');

/* Create server object */
const server = net.createServer();
let sockets = [];

/* Event emitter */
const events = require('events');
const eventEmitter = new events.EventEmitter();
function on (a, b) {
    return eventEmitter.on(a, b);
}

/* Default Config */
var serverEncoding = "utf-8";
var serverTimeout = 1000;
var serverPort = 3000;

/* Listen function */
function listen (port) {
    if (port == null) port = serverPort;

    server.listen(port, '127.0.0.1', () => {
        eventEmitter.emit("ready", port);
    });
}

/* Server Events */
server.on('connection', function(sock) {
    eventEmitter.emit("connection", sock);
    sockets.push(sock);

    sock.on('data', function (data) {
        eventEmitter.emit("data", sock, data);
    });

    sock.on('error', (err) => {
        sock.end();
    })

    sock.on('close', function(data) {
        let index = sockets.findIndex(function(o) {
            return o.remoteAddress === sock.remoteAddress && o.remotePort === sock.remotePort;
        })

        if (index !== -1) sockets.splice(index, 1);
        eventEmitter.emit("disconnection", sock);
    });
});



/* Config Setters */
function setEncoding (newEncoding) { serverEncoding = newEncoding; }
function setTimeout (newTimeout) { serverTimeout = newTimeout; }
function setPort (newPort) { serverPort= newPort; }

/* Exports */
exports.listen = listen;
exports.on = on;

exports.setEncoding = setEncoding;
exports.setTimeout = setTimeout;
exports.setPort = setPort;