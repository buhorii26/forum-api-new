const routes = require('./routes');
const LikesCommentHandler = require('./handler');

module.exports = {
  name: 'likes',
  register: async (server, { container }) => {
    const likesCommentHandler = new LikesCommentHandler(container);
    server.route(routes(likesCommentHandler));
  },
};
