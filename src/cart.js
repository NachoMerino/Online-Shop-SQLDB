import $ from 'jquery';

class Cart {
  constructor(products) {
    $('.shopping-cart').hide();
    if (window.localStorage) {
      // localStorage can be used
      console.log('ok proceed');
    } else {
      // can't be used
      console.log('browser do not support localstorage');
    }
    this.products = products;
  }

  addItem(product) {
    this.product = product;
    console.log(product);
    //  localStorage.clear();

    if (localStorage.getItem('total') === null) {
      console.log('cart was empty');
      const total = 1;
      localStorage.setItem('total', total);
    } else {
      console.log('cart was not empty');
      const total = parseInt(localStorage.getItem('total'), 10);
      localStorage.setItem('total', total + 1);
    }
    console.log(localStorage.getItem('total'));
    $('.badge').text(localStorage.getItem('total'));
    return this.product;
  }

  removeItem(product) {
    this.product = product;
    console.log(product);
    return this.product;
  }

  updateBadge() {
    if (localStorage.getItem('total') === null) {
      $('.badge').text(0);
      $('.badge').hide();
    } else {
      $('.badge').text(localStorage.getItem('total'));
      $('.badge').show();
    }
    return this;
  }

  clear() {
    localStorage.clear();
    return this;
  }
}

export default Cart;
