const LikesCommentRepository = require('../../Domains/likes-comment/LikesCommentRepository');

class LikesCommentRepositoryPostgres extends LikesCommentRepository {
  constructor(pool, idGenerator) {
    super();
    this._pool = pool;
    this._idGenerator = idGenerator;
  }

  async addLikes(userId, threadId, commentId) {
    const id = `likes-${this._idGenerator()}`;

    const query = {
      text: 'INSERT INTO likes_comment VALUES ($1, $2, $3, $4)',
      values: [id, userId, threadId, commentId],
    };

    await this._pool.query(query);
    return id;
  }

  async deleteLikesById(id) {
    const query = {
      text: 'DELETE FROM likes_comment WHERE id = $1',
      values: [id],
    };

    await this._pool.query(query);
  }

  async getHasLiked(ownerId, threadId, commentId) {
    const query = {
      text: 'SELECT id FROM likes_comment WHERE owner = $1 AND thread_id = $2 AND comment_id = $3',
      values: [ownerId, threadId, commentId],
    };

    const result = await this._pool.query(query);
    return result.rows;
  }

  async getLikeCountByCommentId(commentId) {
    const query = {
      text: 'SELECT COUNT(*) FROM likes_comment WHERE comment_id = $1',
      values: [commentId],
    };

    const result = await this._pool.query(query);
    return parseInt(result.rows[0].count, 10);
  }
}

module.exports = LikesCommentRepositoryPostgres;
