import {
  formatFeaturedScores,
  formatGenres,
  formatPlatforms,
  formatScores,
} from '../format';

const mockCoreFeaturedScore = {
  name: 'test',
  score: 5,
  timeToComplete: 10,
  finishDate: '2023-01-01 00:00:00',
};

const mockFeaturedScore = {
  ...mockCoreFeaturedScore,
  platformId: '123',
  platformName: 'test',
};

describe('Format', () => {
  describe('format featured scores', () => {
    it('should format a valid array', async () => {
      const res = await formatFeaturedScores([mockFeaturedScore]);
      expect(res[0].playedPlatforms[0].name).toBe(
        mockFeaturedScore.platformName
      );
    });
    it('should handle no scores', async () => {
      const res = await formatFeaturedScores([]);
      expect(res.length).toBe(0);
    });
    it('should handle no platforms', async () => {
      const res = await formatFeaturedScores([mockCoreFeaturedScore]);
      expect(res[0].playedPlatforms.length).toBe(0);
    });
  });
});

const mockCoreGenre = {
  id: '123',
  name: 'test',
};

const mockGenre = {
  ...mockCoreGenre,
  scoreId: '123',
  scoreName: 'test',
  score: 5,
  finishDate: '2020-01-01 00:00:00',
};

describe('Format', () => {
  describe('format genres', () => {
    it('should format a valid array', async () => {
      const res = await formatGenres([mockGenre]);
      expect(res[0].featuredScores[0].id).toBe(mockGenre.scoreId);
    });
    it('should handle no genres', async () => {
      const res = await formatGenres([]);
      expect(res.length).toBe(0);
    });
    it('should handle no platforms', async () => {
      const res = await formatGenres([mockCoreGenre]);
      expect(res[0].featuredScores.length).toBe(0);
    });
  });
});

const mockCorePlatform = {
  id: '123',
  name: 'test',
};

const mockPlatform = {
  ...mockCorePlatform,
  scoreId: '123',
  scoreName: 'test',
  score: 5,
  finishDate: '2020-01-01 00:00:00',
};

describe('Format', () => {
  describe('format platforms', () => {
    it('should format a valid array', async () => {
      const res = await formatPlatforms([mockPlatform]);
      expect(res[0].featuredScores[0].id).toBe(mockPlatform.scoreId);
    });
    it('should handle no platforms', async () => {
      const res = await formatPlatforms([]);
      expect(res.length).toBe(0);
    });
    it('should handle no platforms', async () => {
      const res = await formatPlatforms([mockCorePlatform]);
      expect(res[0].featuredScores.length).toBe(0);
    });
  });
});

const mockCoreScore = {
  id: '123',
  name: 'test',
  score: 5,
  timeToComplete: 20,
  finishDate: '2020-01-01 00:00:00',
};

const mockScore = {
  ...mockCoreGenre,
  platformId: '123',
  platformName: 'test',
};

describe('Format', () => {
  describe('format scores', () => {
    it('should format a valid array', async () => {
      const res = await formatScores([mockScore]);
      expect(res[0].playedPlatforms[0].id).toBe(mockScore.platformId);
    });
    it('should handle no genres', async () => {
      const res = await formatScores([]);
      expect(res.length).toBe(0);
    });
    it('should handle no platforms', async () => {
      const res = await formatScores([mockCoreGenre]);
      expect(res[0].playedPlatforms.length).toBe(0);
    });
  });
});
