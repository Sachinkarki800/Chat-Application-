
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 3000 });
const clients = [];

wss.on('connection', (ws) => {
  console.log('Client connected');

  // Store the client's WebSocket connection
  clients.push(ws);
  ws.send('connected');

  ws.on('message', (data) => {
    // Parse the received JSON string
    const jsonData = JSON.parse(data);
    const { username, message } = jsonData;
    console.log("Username:", username);
    console.log("Message:", message);

    // Send the message to all connected clients except the sender
    clients.forEach((client) => {
      if (client !== ws) {
        client.send('data');
      }
    });

  });

  ws.on('close', () => {
    console.log('Client disconnected');

    // Remove the client's WebSocket connection from the clients array
    const index = clients.indexOf(ws);
    if (index !== -1) {
      clients.splice(index, 1);
    }
  });
});


