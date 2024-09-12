const WebSocket = require('ws');

module.exports = {
  initialize: (strapi) => {
    const wss = new WebSocket.Server({
      port: strapi.config.plugins['io'].config.port,
      path: strapi.config.plugins['io'].config.path
    });

    wss.on('connection', (ws) => {
      console.log('Client connected');

      ws.on('message', (message) => {
        console.log(`Received message => ${message}`);
      });

      ws.on('close', () => {
        console.log('Client disconnected');
      });
    });

    // Broadcast a message to all clients
    const broadcast = (message) => {
      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(message);
        }
      });
    };

    // Example: broadcast when a new product is added
    strapi.db.lifecycles.subscribe({
      models: ['product'],
      async afterCreate(event) {
        const { result } = event;
        const message = JSON.stringify({ type: 'PRODUCT_ADDED', data: result });
        broadcast(message);
      }
    });
  }
};
