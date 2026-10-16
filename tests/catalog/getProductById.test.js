const products = require('../../src/data/products');
const { getProductById } = require('../../src/catalog');

describe('getProductById', () => {
  /* test('ID 1 возвращает products[0]', () => {
    const result = getProductById(products, 1);
    expect(result).toEqual(products[0]);
  }); */

  test.each([
    [1, [0]],
    [4, [3]],
    [6, [5]],
  ])('ID %s возвращает products[%j]', (query, expectedId) => {
    const result = getProductById(products, query);

    expect(result).toEqual(products[expectedId]);
  });

  test.each([[0], [999], [-1], ['1'], [undefined], [NaN]])(
    'ID %s возвращает null',
    (query) => {
      const result = getProductById(products, query);

      expect(result).toEqual(null);
    },
  );
  /*
  test.todo('ID undefined возвращает null');
  test.todo('ID NaN возвращает null'); */
});
