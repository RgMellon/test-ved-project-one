const { queryString } = require('./querString');
describe('Object to query string', () => {
  it('should create a valid query string when an object is provided', () => {
    const object = {
      name: 'Renan',
      profession: 'developer',
    };

    expect(queryString(object)).toBe('name=Renan&profession=developer');
  });

  it('should create a valid query string even when an array is passed as value', () => {
    const object = {
      name: 'Renan',
      profession: 'developer',
      abilities: ['JS', 'TDD'],
    };

    expect(queryString(object)).toBe(
      'name=Renan&profession=developer&abilities=JS,TDD',
    );
  });

  it('should throw an error when an object is passed as value', () => {
    const object = {
      name: 'Renan',
      profession: 'developer',
      abilities: {
        first: 'JS',
        second: 'TDD',
      },
    };

    expect(() => {
      queryString(object);
    }).toThrowError();
  });
});
