const { queryString, parse } = require('./querString');
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

describe('Query string to object', () => {
  it('should convert a query string to an object', () => {
    const qs = 'name=Renan&profession=developer';
    expect(parse(qs)).toEqual({
      name: 'Renan',
      profession: 'developer',
    });
  });

  it('shound convert a query string of a single key-value pair to an object', () => {
    const qs = 'name=Renan';
    expect(parse(qs)).toEqual({
      name: 'Renan',
    });
  });
});
