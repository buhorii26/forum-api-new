const routes = (handler) => [
  {
    method: 'POST',
    path: '/threads',
    handler: (request, h) => {
      if (request.info.remoteAddress === 'http://13.212.101.49:5000') {
        return h.response('You cant make request').code(403);
      }
      return handler.postThreadHandler(request, h);
    },
    options: {
      auth: 'forumapi_jwt',
    },
  },
  {
    method: 'GET',
    path: '/threads/{threadId}',
    handler: (request, h) => {
      if (request.info.remoteAddress === 'http://13.212.101.49:5000') {
        return h.response('You cant make request').code(403);
      }
      return handler.getThreadHandler(request, h);
    },
  },
];

module.exports = routes;
