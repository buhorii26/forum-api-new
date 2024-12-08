const autoBind = require('auto-bind');
const LikesCommentUseCase = require('../../../../Applications/use_case/LikesCommentUseCase');

class LikesCommentHandler {
  constructor(container) {
    this._container = container;

    autoBind(this);
  }

  async likesCommentHandler(request, h) {
    const likesCommentUseCase = this._container.getInstance(
      LikesCommentUseCase.name,
    );

    const { id: ownerId } = request.auth.credentials;

    const { threadId, commentId } = request.params;

    await likesCommentUseCase.execute(ownerId, threadId, commentId);

    const response = h.response({
      status: 'success',
    });
    response.code(200);
    return response;
  }
}

module.exports = LikesCommentHandler;
