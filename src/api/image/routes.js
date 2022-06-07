const routes = (handler) => [
    {
        method: 'POST',
        path: '/users/image',
        handler: handler.postImageHandler,
        options: {
          auth: 'image',
        },
      },
      {
          method : 'GET',
          path : '/users/image/{id}',
          handler : handler.getImageByIDHandler,
          options : {
              auth : 'image'
          }
      }   
]
module.exports = routes