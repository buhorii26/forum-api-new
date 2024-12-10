const CommentsTableTestHelper = require('../../../../tests/CommentsTableTestHelper');
const LikesCommentTableTestHelper = require('../../../../tests/LikesCommentTableTestHelper');
const ThreadsTableTestHelper = require('../../../../tests/ThreadsTableTestHelper');
const UsersTableTestHelper = require('../../../../tests/UsersTableTestHelper');
const pool = require('../../database/postgres/pool');
const LikesCommentRepositoryPostgres = require('../LikesCommentRepositoryPostgres');

describe('LikesCommentRepositoryPostgres', () => {
  beforeAll(async () => {
    await UsersTableTestHelper.addUser({
      id: 'user-123',
      username: 'buhori',
    });
    await ThreadsTableTestHelper.addThread({
      id: 'thread-123',
      title: 'A thread title',
      body: 'Title New',
      owner: 'user-123',
    });
    await CommentsTableTestHelper.addComment({
      id: 'comment-123',
      content: 'New comment',
      owner: 'user-123',
      threadId: 'thread-123',
    });
  });

  afterEach(async () => {
    console.log('Cleaning likes_comment table');
    await LikesCommentTableTestHelper.cleanTable();
  });

  afterAll(async () => {
    await CommentsTableTestHelper.cleanTable();
    await ThreadsTableTestHelper.cleanTable();
    await UsersTableTestHelper.cleanTable();
    await pool.end();
  });

  describe('addLikes function', () => {
    it('should persist adding like correctly and return added like correctly', async () => {
      const fakeIdGenerator = () => '123';
      const likesCommentRepositoryPostgres = new LikesCommentRepositoryPostgres(
        pool,
        fakeIdGenerator,
      );

      // Act
      const addedLikeId = await likesCommentRepositoryPostgres.addLikes(
        'user-123',
        'thread-123',
        'comment-123',
      );
      // Assert
      const like = await LikesCommentTableTestHelper.findLikesById(addedLikeId);

      expect(like).toHaveLength(1);
      expect(like[0]).toStrictEqual({
        id: addedLikeId,
        owner: 'user-123',
        thread_id: 'thread-123',
        comment_id: 'comment-123',
      });
    });
  });

  describe('deleteLikesById', () => {
    it('should be able to delete like', async () => {
      await LikesCommentTableTestHelper.addLikes({
        id: 'like-123',
        owner: 'user-123',
        threadId: 'thread-123',
        commentId: 'comment-123',
      });

      const likesCommentRepositoryPostgres = new LikesCommentRepositoryPostgres(
        pool,
        {},
      );

      await likesCommentRepositoryPostgres.deleteLikesById('like-123');
      const likes = await LikesCommentTableTestHelper.findLikesById('like-123');

      expect(likes).toHaveLength(0);
    });
  });

  describe('getHasLiked', () => {
    it('should be able to get has liked', async () => {
      await LikesCommentTableTestHelper.addLikes({
        id: 'likes-123',
        owner: 'user-123',
        threadId: 'thread-123',
        commentId: 'comment-123',
      });

      const likesCommentRepositoryPostgres = new LikesCommentRepositoryPostgres(
        pool,
        {},
      );
      const likes = await likesCommentRepositoryPostgres.getHasLiked(
        'user-123',
        'thread-123',
        'comment-123',
      );

      expect(likes).toHaveLength(1);
      expect(likes[0].id).toBe('likes-123');
    });
  });

  describe('getLikeCountByCommentId', () => {
    it('should be able to get likes by comment id', async () => {
      await LikesCommentTableTestHelper.addLikes({
        id: 'like-123',
        owner: 'user-123',
        threadId: 'thread-123',
        commentId: 'comment-123',
      });

      const likesCommentRepositoryPostgres = new LikesCommentRepositoryPostgres(
        pool,
        {},
      );
      const likesCount = await likesCommentRepositoryPostgres.getLikeCountByCommentId(
        'comment-123',
      );

      expect(likesCount).toBe(1);
    });
  });
});
