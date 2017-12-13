import $ from 'jquery';

class Cart {
  constructor() {
    $('.shopping-cart').hide();
    this.cart = {};
    this.cart.products = [];
  }

  addItem(product) {
    //  check if cart exists using total
    if (localStorage.getItem('total') === null) {
      //  cart is empty - add first product
      localStorage.setItem('total', 1);
    } else {
      //  cart exists - retrive it and prepare to add
      const total = parseInt(localStorage.getItem('total'), 10);
      localStorage.setItem('total', total + 1);
      const storedProducts = JSON.parse(localStorage.getItem('cart'));
      this.cart.products = storedProducts;
    }
    //  add product to cart
    this.cart.products.push(product);
    localStorage.setItem('cart', JSON.stringify(this.cart.products));
    $('.badge').text(localStorage.getItem('total'));
    $('.shopping-cart').show();
    return this.update();
  }

  removeItem(id) {
    //  check what is in cart exists using total
    const total = parseInt(localStorage.getItem('total'), 10);
    localStorage.setItem('total', total - 1);
    //  retrieve stored products
    const storedProducts = JSON.parse(localStorage.getItem('cart'));
    this.cart.products = storedProducts.filter(product => product.id !== id);
    localStorage.setItem('cart', JSON.stringify(this.cart.products));
    return this.update();
  }

  update() {
    //  update badge and show/hide cart container
    if (localStorage.getItem('cart') === null || localStorage.getItem('total') === '0') {
      $('.badge').text(0);
      $('.badge').hide();
      $('.shopping-cart').hide();
      $('.cart').hide();
    } else {
      $('.badge').text(localStorage.getItem('total'));
      $('.badge').show();
      $('.cart').show();
      // updating items in cart
      $('.shopping-cart-items').empty();
      const storedProducts = JSON.parse(localStorage.getItem('cart'));
      let totalPrice = 0;
      storedProducts.forEach((product) => {
        totalPrice += parseInt(product.price, 10);
        $('.shopping-cart-items').append(`
          <li class="clearfix">
            <button type="button" class="close removeItemButton" aria-label="Close" data-id="${product.id}">
              <span aria-hidden="true">&times;</span>
            </button>
            <img class="cart-img" src="/static/assets/images/0${product.catid}.jpg" alt="${product.name}" />
            <span class="item-name">${product.name}</span>
            <span class="item-price">€ ${product.price}</span>
            <span class="item-quantity">Quantity: 01</span>
          </li>`);
        $('.total').text(`€ ${totalPrice}`);
      });
    }
    $('.removeItemButton').click((eventObj) => {
      //  console.log('removing');
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
