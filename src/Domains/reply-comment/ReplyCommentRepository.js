class ReplyCommentRepository {
  async addReplyComment(ownerId, commentId, newReply) {
    throw new Error('REPLY_COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async getRepliesByCommentId(commentId) {
    throw new Error('REPLY_COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async deleteReplyById(id) {
    throw new Error('REPLY_COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async checkAvailableReply(id) {
    throw new Error('REPLY_COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async verifyReplyOwner(replyId, ownerId) {
    throw new Error('REPLY_COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }
}

module.exports = ReplyCommentRepository;
