const { queryString } = require('./querString');
describe('Object to query string', () => {
  it('should create a valid query string when an object is provided', () => {
    const object = {
      name: 'Renan',
      profession: 'developer',
    };

    expect(queryString(object)).toBe('name=Renan&profession=developer');
  });
});
