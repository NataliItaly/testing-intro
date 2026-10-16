const products = require('../../src/data/products');
const { filterByCategory } = require('../../src/catalog');

describe('filterByCategory', () => {
  test.each([['all'], [undefined], ['']])(
    '%s возвращает товары с ID [1, 2, 3, 4, 5, 6]',
    (query) => {
      const result = filterByCategory(products);

      expect(result).toEqual(products);
    },
  );

  test.each([
    ['electronics', [1, 2]],
    ['books', [3, 6]],
    ['home', [4, 5]],
  ])('%s возвращает товары с ID %j', (query, expectedIds) => {
    const result = filterByCategory(products, query);

    expect(result.map((product) => product.id)).toEqual(expectedIds);
  });

  test.each([
    ['clothes', []],
    ['toys', []],
    ['sports', []],
  ])('%s возвращает пустой массив', (query, expectedIds) => {
    const result = filterByCategory(products, query);

    expect(result.map((product) => product.id)).toEqual(expectedIds);
  });
});
