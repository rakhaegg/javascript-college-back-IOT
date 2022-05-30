const routes = (handler) => [
    {
      method: 'POST',
      path: '/user',
      handler: handler.postUserHandler,
    },
    {
      method: 'GET',
      path: '/user/{id}',
      handler: handler.getUserByIdHandler,
    },
  ];
  
  module.exports = routes;