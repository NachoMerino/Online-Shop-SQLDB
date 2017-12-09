import $ from 'jquery';

export default function initCart() {
  const cartWrapper = $('.cd-cart-container');
  const productId = 0;

  if (cartWrapper.length > 0) {
    //  store jQuery objects
    const cartBody = cartWrapper.find('.body');
    const cartList = cartBody.find('ul').eq(0);
    const cartTotal = cartWrapper.find('.checkout').find('span');
    const cartTrigger = cartWrapper.children('.cd-cart-trigger');
    const cartCount = cartTrigger.children('.count');
    const addToCartBtn = $('.cd-add-to-cart');
    const undo = cartWrapper.find('.undo');
    const undoTimeoutId = '';

    //  add product to cart
    addToCartBtn.on('click', ((event) => {
      event.preventDefault();
      addToCart($(this));
    }));

    //  open/close cart
    cartTrigger.on('click', ((event) => {
      event.preventDefault();
      toggleCart();
    }));

    //  close cart when clicking on the .cd-cart-container::before (bg layer)
    cartWrapper.on('click', ((event) => {
      if ( $(event.target).is($(this)) ) toggleCart(true);
    }));

    //  delete an item from the cart
    cartList.on('click', '.delete-item', ((event) => {
      event.preventDefault();
      removeProduct($(event.target).parents('.product'));
    }));

    //  update item quantity
    cartList.on('change', 'select', ((event) => {
      quickUpdateCart();
    }));

    //  reinsert item deleted from the cart
    undo.on('click', 'a',((event) => {
      clearInterval(undoTimeoutId);
      event.preventDefault();
      cartList.find('.deleted').addClass('undo-deleted').one('webkitAnimationEnd oanimationend msAnimationEnd animationend', (() => {
        $(this).off('webkitAnimationEnd oanimationend msAnimationEnd animationend').removeClass('deleted undo-deleted').removeAttr('style');
        quickUpdateCart();
      }));
      undo.removeClass('visible');
    }));
  }

  function toggleCart(bool) {
    const cartIsOpen = ( typeof bool === 'undefined' ) ? cartWrapper.hasClass('cart-open') : bool;
    
    if ( cartIsOpen ) {
      cartWrapper.removeClass('cart-open');
      //  reset undo
      clearInterval(undoTimeoutId);
      undo.removeClass('visible');
      cartList.find('.deleted').remove();

      setTimeout((() => {
        cartBody.scrollTop(0);
        //  check if cart empty to hide it
        if ( Number(cartCount.find('li').eq(0).text()) == 0) cartWrapper.addClass('empty');
      }, 500));
    } else {
      cartWrapper.addClass('cart-open');
    }
  }

  function addToCart(trigger) {
    const cartIsEmpty = cartWrapper.hasClass('empty');
    //  update cart product list
    addProduct();
    //  update number of items 
    updateCartCount(cartIsEmpty);
    //  update total price
    updateCartTotal(trigger.data('price'), true);
    //  show cart
    cartWrapper.removeClass('empty');
  }

  function addProduct() {
    //  this is just a product placeholder
    //  you should insert an item with the selected product info
    //  replace productId, productName, price and url with your real product info
    productId = productId + 1;
    const productAdded = $('<li class="product"><div class="product-image"><a href="#0"><img src="img/product-preview.png" alt="placeholder"></a></div><div class="product-details"><h3><a href="#0">Product Name</a></h3><span class="price">$25.99</span><div class="actions"><a href="#0" class="delete-item">Delete</a><div class="quantity"><label for="cd-product-'+ productId +'">Qty</label><span class="select"><select id="cd-product-'+ productId +'" name="quantity"><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option></select></span></div></div></div></li>');
    cartList.prepend(productAdded);
  }

  function removeProduct(product) {
    clearInterval(undoTimeoutId);
    cartList.find('.deleted').remove();
    
    const topPosition = product.offset().top - cartBody.children('ul').offset().top ,
      productQuantity = Number(product.find('.quantity').find('select').val()),
      productTotPrice = Number(product.find('.price').text().replace('$', '')) * productQuantity;
    
    product.css('top', topPosition+'px').addClass('deleted');

    //  update items count + total price
    updateCartTotal(productTotPrice, false);
    updateCartCount(true, -productQuantity);
    undo.addClass('visible');

    //  wait 8sec before completely remove the item
    undoTimeoutId = setTimeout(function(){
      undo.removeClass('visible');
      cartList.find('.deleted').remove();
    }, 8000);
  }

  function quickUpdateCart() {
    const quantity = 0;
    const price = 0;
    
    cartList.children('li:not(.deleted)').each((() => {
      const singleQuantity = Number($(this).find('select').val());
      quantity = quantity + singleQuantity;
      price = price + singleQuantity*Number($(this).find('.price').text().replace('$', ''));
    }));

    cartTotal.text(price.toFixed(2));
    cartCount.find('li').eq(0).text(quantity);
    cartCount.find('li').eq(1).text(quantity+1);
  }

  function updateCartCount(emptyCart, quantity) {
    if ( typeof quantity === 'undefined' ) {
      const actual = Number(cartCount.find('li').eq(0).text()) + 1;
      const next = actual + 1;
      
      if ( emptyCart ) {
        cartCount.find('li').eq(0).text(actual);
        cartCount.find('li').eq(1).text(next);
      } else {
        cartCount.addClass('update-count');

        setTimeout((() => {
          cartCount.find('li').eq(0).text(actual);
        }, 150));

        setTimeout((() => {
          cartCount.removeClass('update-count');
        }), 200);

        setTimeout((() => {
          cartCount.find('li').eq(1).text(next);
        }), 230);
      }
    } else {
      const actual = Number(cartCount.find('li').eq(0).text()) + quantity;
      const next = actual + 1;
      
      cartCount.find('li').eq(0).text(actual);
      cartCount.find('li').eq(1).text(next);
    }
  }

  function updateCartTotal(price, bool) {
    bool ? cartTotal.text( (Number(cartTotal.text()) + Number(price)).toFixed(2) )  : cartTotal.text( (Number(cartTotal.text()) - Number(price)).toFixed(2) );
  }
}
