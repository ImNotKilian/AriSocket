# 🌏 AriSocket
An open-source TCP Server and Client coded in Node.js

#### Client Documentation
1) Events:  
`ready` : It is called when the client successfully connects to the server. Receives the parameters (host, port)  
`data` : It is called when the server sends information to the client. Receives the parameter (data)  
`error`: is called when an error occurs. Receives (error)  

```javascript
client.on("event-name", (parameters) => {
  // Do stuffs...
});
```
  
2) Functions:  
```javascript
// Connect to a server
client.connect(host, port);

// Send data to the server
client.sendData("data");
```  
  
  
  
#### Server Documentation
1) Events:  
`ready` : is called when the server starts listening. Receives the parameter (port)  
`connection` : is called when a client connects to the server. Receives the parameter (sock)  
`disconnection` : is called when a client disconnects from the server. Receives the parameter (sock)  
`data` : It is called when the server receives information from a client. Receives the parameters (sock, data)  

```javascript
server.on("event-name", (parameters) => {
  // Do stuffs...
});
```
  
2) Functions:  
```javascript
// Start server (Port is optional, default = 3000)
server.listen(port);

// Send data to a client
sock.write(data);

// Set encoding type (Optional, default = utf-8)
server.setEncoding(encoding);

// Set responses timeout in miliseconds (Optional, default = 1000)
server.setTimeout(timeout);

// Set server port (Optional, can be setted in the listen function, default = 3000)
server.setPort(port);
```  
### ToDo:
1) Add more events
2) Fix some bugs


###### Coded with ❤️ by aeon#1116 on * Discord
