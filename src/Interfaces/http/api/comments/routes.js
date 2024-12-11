const routes = (handler) => [
  {
    method: 'POST',
    path: '/threads/{threadId}/comments',
    handler: (request, h) => {
      if (request.info.remoteAddress === '127.0.0.1') {
        return h.response('You cant make request').code(403);
      }
      return handler.postCommentHandler(request, h);
    },
    options: {
      auth: 'forumapi_jwt',
    },
  },
  {
    method: 'DELETE',
    path: '/threads/{threadId}/comments/{commentId}',
    handler: (request, h) => {
      if (request.info.remoteAddress === '127.0.0.1') {
        return h.response('You cant make request').code(403);
      }
      return handler.deleteCommentHandler(request, h);
    },
    options: {
      auth: 'forumapi_jwt',
    },
  },
];

module.exports = routes;
