//const products = require('./data/products');

function notImplemented() {
  throw new Error('Корзина ещё не реализована. Сначала прочитайте тесты.');
}

function addToCart(cart, product, quantity) {
  if (quantity < 1 || quantity > product.stock)
    throw new RangeError('Invalid quantity');

  const isInCart = cart.find((p) => p.name === product.name);
  if (isInCart) {
    isInCart.quantity += quantity;
  } else {
    cart = [...cart, { ...product, quantity }];
  }

  return cart;
}

function changeQuantity(cart, id, quantity) {
  const product = cart.find((p) => p.id === id);

  if (!product) return cart;

  if (quantity < 1 || quantity > product.stock)
    throw new RangeError('Invalid quantity');

  product.quantity = quantity;

  return cart;
}

function removeFromCart(cart, id) {
  const product = cart.find((p) => p.id === id);
  if (!product) return cart;

  const updatedCart = cart.filter((p) => p.id !== id);

  cart = [...updatedCart];
  return cart;
}

function calculateCartSubtotal(cart) {
  return cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
}

function calculateOrderTotal(cart, promocode) {
  const subtotal = calculateCartSubtotal(cart);
  const discount =
    promocode === 'SAVE10' && subtotal >= 20000 ? subtotal * 0.1 : 0;
  const delivery = subtotal <= 50000 ? 30000 : 0;
  const total = subtotal - discount + delivery;

  return {
    subtotal,
    discount,
    delivery,
    total,
  };
}

const cartApi = {
  addToCart,
  changeQuantity,
  removeFromCart,
  calculateCartSubtotal,
  calculateOrderTotal,
};

if (typeof module !== 'undefined') module.exports = cartApi;
if (typeof window !== 'undefined') window.cartApi = cartApi;
