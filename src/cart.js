import $ from 'jquery';

class Cart {
  constructor() {
    this.cart = {};
    this.cart.products = [];
  }

  addItem(product) {
    //  check if cart exists using total
    let total = Object.keys(this.cart.products).length;
    if (total === 0) {
      //  cart is empty - add first product
      total += 1;
    } else {
      //  cart exists - retrive it and prepare to add
      // total = Object.keys(this.cart.products).length;
      total += 1;
      const storedProducts = JSON.parse(localStorage.getItem('cart'));
      this.cart.products = storedProducts;
      //  check if the product is already in the cart
      $.map(this.cart.products, ((storedProduct) => {
        if (storedProduct.id === product.id) {
          this.removeItem(product.id);
          // eslint-disable-next-line no-param-reassign
          product.quantity = storedProduct.quantity + 1;
        }
      }));
    }
    //  add product to cart
    this.cart.products.push(product);
    localStorage.setItem('cart', JSON.stringify(this.cart.products));
    return this.update();
  }

  removeItem(id) {
    //  retrieve stored products
    const storedProducts = JSON.parse(localStorage.getItem('cart'));
    this.cart.products = storedProducts.filter(product => product.id !== id);
    localStorage.setItem('cart', JSON.stringify(this.cart.products));
    return this.update();
  }

  update() {
    //  update badge and show/hide cart container
    if (localStorage.getItem('cart') === null) {
      $('.badge').text(0);
      $('.badge').hide();
      $('.shopping-cart').hide();
      $('.cart').hide();
    } else {
      $('.badge').text(Object.keys(this.cart.products).length);
      $('.badge').show();
      $('.shopping-cart').show();
      $('.cart').show();
      // updating items in cart
      $('.shopping-cart-items').empty();
      const storedProducts = this.cart.products;
      let totalPrice = 0;
      let totalQuantity = 0;
      storedProducts.forEach((product) => {
        totalQuantity += parseInt(product.quantity, 10);
        totalPrice += parseInt(product.price, 10) * parseInt(product.quantity, 10);
        $('.badge').text(product.quantity);
        $('.shopping-cart-items').append(`
          <li class="clearfix">
            <button type="button" class="close removeItemButton" aria-label="Close" data-id="${product.id}">
              <span aria-hidden="true">&times;</span>
            </button>
            <img class="cart-img" src="/static/assets/images/0${product.catid}.jpg" alt="${product.name}" />
            <span class="item-name">${product.name}</span>
            <span class="item-price">€ ${product.price}</span>
            <span class="item-quantity">Quantity: ${product.quantity}</span>
          </li>`);
        $('.total').text(`€ ${totalPrice}`);
        $('.badge').text(`${totalQuantity}`);
      });
    }
    $('.removeItemButton').click((eventObj) => {
      //  define obj
      const { target } = eventObj;
      //  chrome / ff see different things!
      //  define product obj and retriving data using jquery
      this.removeItem($(target).parent().closest('.removeItemButton').attr('data-id'));
    });
    return this;
  }
  clear() {
    localStorage.clear();
    this.cart.products = [];
    this.update();
    return this;
  }
}

export default Cart;
