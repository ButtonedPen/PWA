module.exports = {
    'io': {
      enabled: true,
      config: {
        // The port on which the WebSocket server will run
        port: 1338,
        // The path on which the WebSocket server will be exposed
        path: '/ws',
        // Optionally, you can enable CORS for WebSocket requests
        cors: {
          origin: '*',
          methods: ['GET', 'POST']
        }
      }
    }
  };
  