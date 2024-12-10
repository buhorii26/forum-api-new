const routes = (handler) => [
  {
    method: 'POST',
    path: '/threads/{threadId}/comments/{commentId}/replies',
    handler: (request, h) => {
      if (request.info.remoteAddress === 'http://13.212.101.49:5000') {
        return h.response('You cant make request').code(403);
      }
      return handler.postReplyHandler(request, h);
    },
    options: {
      auth: 'forumapi_jwt',
    },
  },
  {
    method: 'DELETE',
    path: '/threads/{threadId}/comments/{commentId}/replies/{replyId}',
    handler: (request, h) => {
      if (request.info.remoteAddress === 'http://13.212.101.49:5000') {
        return h.response('You cant make request').code(403);
      }
      return handler.deleteReplyByIdHandler(request, h);
    },
    options: {
      auth: 'forumapi_jwt',
    },
  },
];

module.exports = routes;
