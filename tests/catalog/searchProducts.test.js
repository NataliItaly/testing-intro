const products = require('../../src/data/products');
const { searchProducts } = require('../../src/catalog');

describe('searchProducts', () => {
  const catalog = [
    {
      id: 1,
      name: 'Наушники',
      category: 'electronics',
      price: 49900,
      stock: 8,
    },
    {
      id: 2,
      name: 'Клавиатура',
      category: 'electronics',
      price: 35900,
      stock: 0,
    },
    {
      id: 3,
      name: 'JavaScript для начинающих',
      category: 'books',
      price: 18900,
      stock: 14,
    },
    {
      id: 4,
      name: 'Настольная лампа',
      category: 'home',
      price: 27900,
      stock: 3,
    },
    {
      id: 5,
      name: 'Чехол для ноутбука',
      category: 'home',
      price: 24900,
      stock: 6,
    },
    { id: 6, name: 'Чистый код', category: 'books', price: 21900, stock: 0 },
  ];

  test.each([
    ['Наушники', 1],
    ['Чистый код', 6],
    ['Настольная лампа', 4],
    ['javascript', 3],
    ['ЧЕХОЛ', 5],
    ['наушники', 1],
  ])('%s возвращает товар с ID %i', (query, expectedId) => {
    const result = searchProducts(products, query);

    expect(result.map((product) => product.id)).toEqual([expectedId]);
  });

  test('пустая строка возвращает товары с ID [1, 2, 3, 4, 5, 6]', () => {
    const result = searchProducts(products, '');
    expect(result).toEqual(products);
  });

  test('строка из пробелов возвращает товары с ID [1, 2, 3, 4, 5, 6]', () => {
    const result = searchProducts(products, '  ');
    expect(result).toEqual(products);
  });

  test("'\\t\\n' возвращает товары с ID [1, 2, 3, 4, 5, 6]", () => {
    const result = searchProducts(products, '   ');
    expect(result).toEqual(products);
  });
});
