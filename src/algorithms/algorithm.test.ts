import {
  reverseLettersKeepNumberSuffix,
  longestWord,
  queryCounts,
  diagonalDifference,
} from './algorithm';

describe('Algorithm Challenge', () => {
  describe('reverseLettersKeepNumberSuffix', () => {
    it('reverses alphabet characters and keeps trailing number suffix', () => {
      expect(reverseLettersKeepNumberSuffix('NEGIE1')).toBe('EIGEN1');
    });

    it('handles input with no number suffix', () => {
      expect(reverseLettersKeepNumberSuffix('ABCD')).toBe('DCBA');
    });
  });

  describe('longestWord', () => {
    it('returns the longest word from a sentence', () => {
      const sentence = 'Saya sangat senang mengerjakan soal algoritma';
      expect(longestWord(sentence)).toBe('mengerjakan');
    });

    it('returns an empty string for empty input', () => {
      expect(longestWord('')).toBe('');
    });
  });

  describe('queryCounts', () => {
    it('counts query occurrences in the input array', () => {
      const input = ['xc', 'dz', 'bbb', 'dz'];
      const query = ['bbb', 'ac', 'dz'];
      expect(queryCounts(input, query)).toEqual([1, 0, 2]);
    });
  });

  describe('diagonalDifference', () => {
    it('returns the difference between matrix diagonals', () => {
      const matrix = [
        [1, 2, 0],
        [4, 5, 6],
        [7, 8, 9],
      ];

      expect(diagonalDifference(matrix)).toBe(3);
    });
  });
});
