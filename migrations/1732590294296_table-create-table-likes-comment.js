/* eslint-disable camelcase */
exports.up = (pgm) => {
  pgm.createTable('likes_comment', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
    },
    owner: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
    thread_id: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
    comment_id: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
  });
  pgm.addConstraint(
    'likes_comment',
    'fk_likes_comment.owner_users.id',
    'FOREIGN KEY(owner) REFERENCES users(id) ON DELETE CASCADE',
  );
  pgm.addConstraint(
    'likes_comment',
    'fk_likes_comment.thread_id_threads.id',
    'FOREIGN KEY(thread_id) REFERENCES threads(id) ON DELETE CASCADE',
  );
  pgm.addConstraint(
    'likes_comment',
    'fk_likes_comment.comment_id_comments.id',
    'FOREIGN KEY(comment_id) REFERENCES comments(id) ON DELETE CASCADE',
  );
};

exports.down = (pgm) => {
  pgm.dropConstraint('likes_comment', 'fk_likes_comment.owner_users.id');
  pgm.dropConstraint('likes_comment', 'fk_likes_comment.thread_id_threads.id');
  pgm.dropConstraint('likes_comment', 'fk_likes_comment.comment_id_comments.id');
  pgm.dropTable('likes_comment');
};
