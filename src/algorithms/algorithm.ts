export const reverseLettersKeepNumberSuffix = (input: string): string => {
  const suffixMatch = input.match(/\d+$/);
  const suffix = suffixMatch ? suffixMatch[0] : '';
  const lettersPart = input.slice(0, input.length - suffix.length);
  return lettersPart.split('').reverse().join('') + suffix;
};

export const longestWord = (sentence: string): string => {
  const words = sentence
    .trim()
    .split(/\s+/)
    .map(word => word.replace(/[^a-zA-Z0-9]/g, ''))
    .filter(Boolean);

  if (words.length === 0) {
    return '';
  }

  return words.reduce((longest, word) => (word.length > longest.length ? word : longest), words[0]);
};

export const queryCounts = (input: string[], query: string[]): number[] => {
  const counts = input.reduce<Record<string, number>>((acc, item) => {
    acc[item] = (acc[item] ?? 0) + 1;
    return acc;
  }, {});

  return query.map(item => counts[item] ?? 0);
};

export const diagonalDifference = (matrix: number[][]): number => {
  const n = matrix.length;
  let primary = 0;
  let secondary = 0;

  for (let i = 0; i < n; i += 1) {
    primary += matrix[i][i] ?? 0;
    secondary += matrix[i][n - 1 - i] ?? 0;
  }

  return primary - secondary;
};
