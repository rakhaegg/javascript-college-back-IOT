const AuthenticationsHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'authenticationsSeller',
  version: '1.0.0',
  register: async (server, {
    authenticationsService,
    userService,
    tokenManager,
    validator,
  }) => {
    const authenticationsHandler = new AuthenticationsHandler(
      authenticationsService,
      userService,
      tokenManager,
      validator,
    );
    server.route(routes(authenticationsHandler));
  },
};