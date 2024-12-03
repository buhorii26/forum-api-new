class LikesCommentUseCase {
  constructor({ likesCommentRepository, threadRepository, commentRepository }) {
    this._likesCommentRepository = likesCommentRepository;
    this._threadRepository = threadRepository;
    this._commentRepository = commentRepository;
  }

  async execute(userId, threadId, commentId) {
    await this._threadRepository.checkAvailableThread(threadId);
    await this._commentRepository.checkAvailableComment(commentId);

    const hasLiked = await this._likesCommentRepository.getHasLiked(
      userId,
      threadId,
      commentId,
    );

    if (hasLiked.length) {
      return this._likesCommentRepository.deleteLikesById(hasLiked[0].id);
    }

    return this._likesCommentRepository.addLikes(userId, threadId, commentId);
  }
}

module.exports = LikesCommentUseCase;
