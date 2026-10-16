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
    const result = searchProducts(catalog, query);

    expect(result.map((product) => product.id)).toEqual([expectedId]);
  });

  test('пустая строка возвращает товары с ID [1, 2, 3, 4, 5, 6]', () => {
    const result = searchProducts(catalog, '');
    expect(result).toEqual(catalog);
  });

  test('строка из пробелов возвращает товары с ID [1, 2, 3, 4, 5, 6]', () => {
    const result = searchProducts(catalog, '  ');
    expect(result).toEqual(catalog);
  });

  test("'\\t\\n' возвращает товары с ID [1, 2, 3, 4, 5, 6]", () => {
    const result = searchProducts(catalog, '   ');
    expect(result).toEqual(catalog);
  });

  /* test("'Наушники' возвращает товар с ID 1", () => {
    const result = searchProducts(catalog, 'Наушники');
    expect(result).toEqual([
      {
        id: 1,
        name: 'Наушники',
        category: 'electronics',
        price: 49900,
        stock: 8,
      },
    ]);
  });

  test("'Чистый код' возвращает товар с ID 6", () => {
    const result = searchProducts(catalog, 'Чистый код');
    expect(result).toEqual([
      { id: 6, name: 'Чистый код', category: 'books', price: 21900, stock: 0 },
    ]);
  });

  test("'Настольная лампа' возвращает товар с ID 4", () => {
    const result = searchProducts(catalog, 'Настольная лампа');
    expect(result).toEqual([
      {
        id: 4,
        name: 'Настольная лампа',
        category: 'home',
        price: 27900,
        stock: 3,
      },
    ]);
  });

  test("'javascript' возвращает товар с ID 3", () => {
    const result = searchProducts(catalog, 'javascript');
    expect(result).toEqual([
      {
        id: 3,
        name: 'JavaScript для начинающих',
        category: 'books',
        price: 18900,
        stock: 14,
      },
    ]);
  });

  test("'ЧЕХОЛ' возвращает товар с ID 5", () => {
    const result = searchProducts(catalog, 'ЧЕХОЛ');
    expect(result).toEqual([
      {
        id: 5,
        name: 'Чехол для ноутбука',
        category: 'home',
        price: 24900,
        stock: 6,
      },
    ]);
  });

  test("'наушники' возвращает товар с ID 1", () => {
    const result = searchProducts(catalog, 'наушники');
    expect(result).toEqual([
      {
        id: 1,
        name: 'Наушники',
        category: 'electronics',
        price: 49900,
        stock: 8,
      },
    ]);
  });

   */
});
