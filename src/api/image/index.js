const ImageHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'image',
  version: '1.0.0',
  register: async (server, { service, validator }) => {
    const imageHandler = new ImageHandler(service, validator);
    server.route(routes(imageHandler));
  },
};