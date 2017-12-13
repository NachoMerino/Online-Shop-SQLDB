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
      //  TODO: retrieve stored products
    }
    // TODO: add products to cart
    console.log(product);

    $('.badge').text(localStorage.getItem('total'));
    $('.shopping-cart').show();
    return this.update();
  }

  removeItem(id) {
    //  check what is in cart exists using total
    const total = parseInt(localStorage.getItem('total'), 10);
    localStorage.setItem('total', total - 1);
    //  TODO: retrieve stored products
    console.log(id);
    return this.update();
  }

  update() {
    //  update badge and show/hide cart container
    if (localStorage.getItem('total') === null) {
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
      //  TODO: update the items list here...
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
    // TODO: empty this.cart.products
    this.update();
    return this;
  }
}

export default Cart;
