const LikesCommentRepository = require('../LikesCommentRepository');

describe('LikeRepository interface', () => {
  it('should throw error when invoke abstract behavior', async () => {
    const likesRepository = new LikesCommentRepository();

    await expect(likesRepository.addLikes('', '', '')).rejects.toThrow(
      'LIKE_REPOSITORY.METHOD_NOT_IMPLEMENTED',
    );
    await expect(likesRepository.deleteLikesById('')).rejects.toThrow(
      'LIKE_REPOSITORY.METHOD_NOT_IMPLEMENTED',
    );
    await expect(likesRepository.getHasLiked('', '', '')).rejects.toThrow(
      'LIKE_REPOSITORY.METHOD_NOT_IMPLEMENTED',
    );
    await expect(likesRepository.getLikeCountByCommentId('')).rejects.toThrow(
      'LIKE_REPOSITORY.METHOD_NOT_IMPLEMENTED',
    );
  });
});
