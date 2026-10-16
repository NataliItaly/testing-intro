const products = require('../../src/data/products');
const { sortProductsByPrice } = require('../../src/catalog');

describe('sortProductsByPrice', () => {
  test.each([
    ['asc', [3, 6, 5, 4, 2, 1]],
    ['desc', [1, 2, 4, 5, 6, 3]],
  ])("все товары c '%s' сортируются как [%j]", (query, expectedIds) => {
    const result = sortProductsByPrice(products, query);
    const resultIds = result.map((product) => product.id);

    expect(resultIds).toEqual(expectedIds);
  });

  test('все товары без направления сортируются как [3, 6, 5, 4, 2, 1]', () => {
    const result = sortProductsByPrice(products).map((product) => product.id);
    expect(result).toEqual([3, 6, 5, 4, 2, 1]);
  });

  test("товары [1, 3, 4] c 'asc' сортируются как [3, 4, 1]", () => {
    const currentProducts = [1, 3, 4].map((num) =>
      products.find((p) => p.id === num),
    );

    const result = sortProductsByPrice(currentProducts, 'asc').map(
      (product) => product.id,
    );
    expect(result).toEqual([3, 4, 1]);
  });

  test.each([
    [
      [3, 1, 4],
      [1, 4, 3],
    ],
    [
      [5, 2, 6],
      [2, 5, 6],
    ],
  ])("товары %s c 'desc' сортируются как [%j]", (query, expectedIds) => {
    const currentProducts = query.map((num) =>
      products.find((p) => p.id === num),
    );

    const result = sortProductsByPrice(currentProducts, 'desc').map(
      (product) => product.id,
    );
    expect(result).toEqual(expectedIds);
  });

  test.each([
    ['asc', [1, 3, 4]],
    ['desc', [1, 3, 4]],
  ])('%s не меняет исходный массив %j', (query, expectedIds) => {
    const currentProducts = expectedIds.map((num) =>
      products.find((p) => p.id === num),
    );
    const originalProducts = [...currentProducts];

    sortProductsByPrice(currentProducts, query);

    expect(currentProducts).toEqual(originalProducts);
  });

  test('направление по умолчанию не меняет исходный массив всех товаров', () => {
    const original = products.map((p) => p.id);
    console.log('original', original);
    sortProductsByPrice(products);
    expect(original).toEqual(products.map((p) => p.id));
  });
});
