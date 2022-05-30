const routes = (handler) => [
    {
      method: 'POST',
      path: '/image/authentications',
      handler: handler.postAuthenticationHandler,
    },
    {
      method: 'PUT',
      path: '/image/authentications',
      handler: handler.putAuthenticationHandler,
    },
    {
      method: 'DELETE',
      path: '/image/authentications',
      handler: handler.deleteAuthenticationHandler,
    },
  ];
  
  module.exports = routes;