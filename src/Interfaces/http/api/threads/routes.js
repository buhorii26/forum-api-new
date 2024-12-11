const routes = (handler) => [
  {
    method: 'POST',
    path: '/threads',
    handler: (request, h) => handler.postThreadHandler(request, h),
    options: {
      auth: 'forumapi_jwt',
    },
  },
  {
    method: 'GET',
    path: '/threads/{threadId}',
    handler: (request, h) => {
      if (request.info.remoteAddress === '127.0.0.1') {
        return h.response('You cant make request').code(403);
      }
      return handler.getThreadHandler(request, h);
    },
  },
];

module.exports = routes;
