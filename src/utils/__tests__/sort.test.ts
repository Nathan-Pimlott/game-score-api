import { sortAsc } from '../sort';

const validData = [
  { propToUse: 'Hello' },
  { propToUse: 'World' },
  { propToUse: 'word' },
  { propToUse: 'aaa' },
];

describe('Sort', () => {
  describe('Testing alphabetical sort function', () => {
    it('Should correctly sort an array of objects', () => {
      expect(sortAsc(validData, 'propToUse')[0].propToUse).toBe('aaa');
    });
    it('Should handle an empty array', () => {
      expect(sortAsc([], 'propToUse').length).toBe(0);
    });
  });
});
