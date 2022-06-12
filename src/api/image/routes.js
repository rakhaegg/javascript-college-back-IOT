const routes = (handler) => [
  {
    method: 'POST',
    path: '/users/summary',
    handler: handler.postSummaryHandler,
    options: {
      auth: 'image',
    },
  },
  {
    method: 'GET',
    path: '/users/summary/{id}',
    handler: handler.getSummaryByIdHandler,
    options: {
      auth: 'image'
    }
  },
  {
    method: 'GET',
    path: '/users/summary',
    handler: handler.getSummaryHandler,
    options: {
      auth: 'image'
    }
  },
  {
    method: 'GET',
    path: '/users/summary/page/{id}',
    handler: handler.getSummaryPageHandler,
    options: {
      auth: 'image'
    }
  },
  {
    method: 'PUT',
    path: '/users/summary/{id}',
    handler: handler.putSummaryByIdHandler,
    options: {
      auth: 'image'
    }
  },
  {
    method: 'DELETE',
    path: '/users/summary/{id}',
    handler: handler.deleteSummaryByIdHandler,
    options: {
      auth: 'image'
    }
  },
]
module.exports = routes