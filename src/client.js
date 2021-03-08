/* Some libraries */
const net = require('net');

/* Create client object */
const client = new net.Socket();

/* Event emitter */
const events = require('events');
const eventEmitter = new events.EventEmitter();
function on (a, b) {
    return eventEmitter.on(a, b);
}

/* Default Config */
var serverHost;
var serverPort;

/* Server status */
var isConnected = false;

/* Events */
client.on('data', function (data) {
	eventEmitter.emit("data", data);
})

client.on('close', function() {
	eventEmitter.emit("disconnection", data);
})

/* Connect function */
function connect (host, port) {
	serverHost = host;
	serverPort = port;

	if (serverHost == null)  return eventEmitter.emit("error", "Server Host isn't defined")
	if (serverPort == null) return eventEmitter.emit("error", "Server Port isn't defined");

	client.connect(port, host, function() {
		eventEmitter.emit("ready", host, port);
	});

	isConnected = true;
}

function sendData (data) {
	if (!isConnected) return eventEmitter.emit("error", "Connect before send data");
	client.write(data);
}

/* Exports */
exports.on = on;
exports.connect = connect;
exports.sendData = sendData;