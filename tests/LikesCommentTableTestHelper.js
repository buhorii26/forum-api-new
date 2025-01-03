const pool = require('../src/Infrastructures/database/postgres/pool');

const LikesCommentTableTestHelper = {
  async addLikes({
    id = 'likes-123',
    userId = 'user-123',
    threadId = 'thread-123',
    commentId = 'comment-123',
  }) {
    const query = {
      text: 'INSERT INTO likes_comment VALUES ($1, $2, $3, $4)',
      values: [id, userId, threadId, commentId],
    };

    await pool.query(query);
  },

  async findLikesById(id) {
    const query = {
      text: 'SELECT * FROM likes_comment WHERE id = $1',
      values: [id],
    };

    const result = await pool.query(query);
    return result.rows;
  },

  async cleanTable() {
    await pool.query('DELETE FROM likes_comment WHERE 1=1');
  },
};

module.exports = LikesCommentTableTestHelper;
