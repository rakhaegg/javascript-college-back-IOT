const SummaryHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'image',
  version: '1.0.0',
  register: async (server, { service, validator }) => {
    const summaryHandler = new SummaryHandler(service, validator);
    server.route(routes(summaryHandler));
  },
};