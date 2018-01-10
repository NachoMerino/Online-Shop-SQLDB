//  import core files
import $ from 'jquery';
import 'bootstrap/js/src';
import './styles.scss';
import navbarTemplate from './templates/navbar.html';
import modalTemplate from './templates/modal.html';
import checkoutTemplate from './templates/checkout.html';
import paymentMethodRadioTemplate from './templates/payment-method-radio.html';
import mkCarousel from './carousel';
import refreshProducts from './products';

// our server provider address
// const server = 'http://nachoserver:9090';
const server = 'http://localhost:9090';

//  append navbar
$(() => {
  const $pageContent = $('<div class="page-content"></div>');
  $('#root')
    .append(modalTemplate)
    .append(navbarTemplate)
    .append($pageContent);
  $('.shopping-cart, #cart, .usertools-button, .logout-button').hide();

  // login & register
  $('.user-login, .user-register')
    .hide()
    .css(('margin-top'), $('.navbar').outerHeight());

  const $userLogin = $('.user-login');
  const $userRegister = $('.user-register');
  const $inputEmailLogin = $('#inputEmailLogin');
  const $inputFirstname = $('#inputFirstname');
  const $loginButton = $('.login-button');
  const $registerButton = $('.register-button');
  const $userButton = $('.usertools-button');
  const $logoutButton = $('.logout-button');
  const $shopingCart = $('.shopping-cart');
  const $inputPassword = $('#inputPassword');

  // hide the popup content when click outside of it
  $($pageContent).click(() => {
    $userRegister.hide('slow');
    $userLogin.hide('slow');
    $shopingCart.hide('slow');
  });

  // fake register
  $('.form-register').on('submit', ((e) => {
    e.preventDefault();
    localStorage.removeItem('user');
    const userInfo = {
      firstname: $('.form-register #inputFirstname').val(),
      lastname: $('.form-register #inputLastname').val(),
      birthdate: $('.form-register #inputDate').val(),
      email: $('.form-register #inputEmailLogin').val(),
      city: $('.form-register #inputCity').val(),
      postal: $('.form-register #inputPostal').val(),
      street: $('.form-register #inputStreet').val(),
    };
    localStorage.setItem('user', JSON.stringify(userInfo));
    $('.user-register').hide();
    $userButton
      .show()
      .html(`<i class="fa fa-user" aria-hidden="true"></i> ${userInfo.firstname}`);
    $logoutButton.show();
    $loginButton.hide();
    $registerButton.hide();
  }));

  // REAL LOGIN
  $('.form-signin').on('submit', ((e) => {
    e.preventDefault();
    const userEmail = $inputEmailLogin.val();
    const userPwd = $inputPassword.val();
    // sending the post request
    /* eslint-disable */
    $.ajax(`${server}/api/login`, {
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({
          email: userEmail,
          pwd: userPwd,
        }),
      })
      /* eslint-enable */
      // success
      .done((msg) => {
        if (msg.err === undefined) {
          $userLogin.hide('slow');
          $inputEmailLogin.val('');
          $inputPassword.val('');
          $loginButton.hide();
          $registerButton.hide();
          localStorage.setItem('userToken', JSON.stringify(msg.token));
          localStorage.setItem('user', JSON.stringify({
            id: msg.id,
            firstname: msg.firstname,
            lastname: msg.lastname,
            email: msg.email,
            phone: msg.phone,
            city: msg.city,
            postal: msg.postal,
            street: msg.street,
          }));
          $userButton
            .show()
            .html(`<i class="fa fa-user" aria-hidden="true"></i> ${msg.firstname}`);
          $logoutButton.show();
        } else {
          $('.alert-danger').remove();
          $userLogin
            .append(`<div class="alert alert-danger">
                  ${msg.err}
                  </div>`);
        }
      })
      // fail login
      .fail(() => {
        $userLogin
          .append(`<div class="alert alert-danger">
                  The server crash
                  </div>`);
      });
  }));
  $('.login-button, .register').click((e) => {
    e.preventDefault();
    // createRandomUser();
    // fix user because im lazy to write
    $inputEmailLogin.val('escatman@gmail.com');
    $inputPassword.val('halloworld');
    $userLogin.toggle('slow');
    $inputEmailLogin.focus();
    if ($userRegister.is(':visible')) {
      $userRegister.hide('slow');
    }
  });
  // logout
  $logoutButton.click(() => {
    localStorage.removeItem('user');
    localStorage.removeItem('cart');
    localStorage.removeItem('userToken');
    localStorage.removeItem('totalPrice');
    $shopingCart.hide();
    $('#cart').hide();
    $logoutButton.hide();
    $userButton.hide();
    $loginButton.show();
    $registerButton.show();
    // reload the page
    window.location.reload(true);
  });

  $('.signin').click((e) => {
    e.preventDefault();
    $userLogin.toggle('slow');
    $inputEmailLogin.focus();
    if ($userRegister.is(':visible')) {
      $userRegister.hide('slow');
    }
  });

  $('.new-registation, .register-button').click((e) => {
    e.preventDefault();
    $userRegister.toggle('slow');
    $inputFirstname.focus();
    if ($userLogin.is(':visible')) {
      $userLogin.hide('slow');
    }
  });

  function handleAJAXError(xhr, status, error) {
    $pageContent
      .empty()
      .append(`<div>Ajax Error categories: ${error}</div>`);
  }
  $('#cart').click(((e) => {
    e.preventDefault();
    $shopingCart.toggle('slow');
    $userLogin.hide('slow');
    $userRegister.hide('slow');
    const checkUserLogged = JSON.parse(localStorage.getItem('userToken'));
    if (checkUserLogged !== null) {
      $('.checkout-proceed').empty().html('<button type="button" class="btn btn-dark btn-block checkout-proceed">Checkout</button>');
    }
  }));

  // checkout method
  $('.checkout-proceed').click(() => {
    const userLogged = JSON.parse(localStorage.getItem('user'));
    if (userLogged === null) {
      $shopingCart.hide('slow');
      $userLogin.toggle('slow');
      $inputEmailLogin.focus();
      return;
    }
    $shopingCart.hide();
    const userData = JSON.parse(localStorage.getItem('user'));
    const $checkout = $(checkoutTemplate);
    $checkout.find('[name="user-name"]').val(`${userData.firstname} ${userData.lastname}`);
    $checkout.find('[name="user-street"]').val(userData.street);
    $checkout.find('[name="user-city"]').val(`${userData.postal} ${userData.city}`);

    const storedProducts = JSON.parse(localStorage.getItem('cart'));
    const $productsList = $checkout.find('.products-list');
    storedProducts.forEach((product) => {
      $productsList.append(`<li>
    <span class="product-name">${product.name}</span>
    <span class="product-price">${product.price}</span>
    <span class="product-quantity">${product.quantity}</span>
    </li>`);
    });
    const totalPrice = JSON.parse(localStorage.getItem('totalPrice'));
    $checkout.find('.cart-total').text(`Total ${totalPrice}`);

    $checkout.find('.checkout-buy').click((evt) => {
      evt.preventDefault();
      const data = JSON.stringify({
        products: storedProducts,
        user: {
          customer_id: userData.id,
          customer_email: userData.email,
          name: $checkout.find('[name="user-name"]').val(),
          street: $checkout.find('[name="user-street"]').val(),
          city: $checkout.find('[name="user-city"]').val(),
        },
        payment_method_id: $checkout.find('[name="payment"]:checked').val(),
        total_price: totalPrice,
      });
      /* eslint-disable */
      $.ajax(`${server}/api/order`, {
          method: 'POST',
          contentType: 'application/json',
          data,
        })
        /* eslint-enable */
        .done(() => {
          $checkout
            .empty()
            .append(`<div class="alert alert-success">
            The order has been placed!
            </div>`);
        })
        .fail(() => {
          $checkout
            .empty()
            .append(`<div class="alert alert-danger">
            An error ocurred, sorry, we dont give back money!
            </div>`);
        });
    });

    $('.page-content')
      .empty()
      .append($checkout);

    const $paymentMethods = $checkout
      .find('.payment-methods')
      .empty();

    $.ajax(`${server}/api/payment_methods`)
      .done((data) => {
        data.forEach((paymentMethod) => {
          const $paymentMethod = $(paymentMethodRadioTemplate);
          $paymentMethod.find('input').attr('value', paymentMethod.id);
          $paymentMethod.find('img')
            .attr('src', paymentMethod.icon)
            .attr('alt', paymentMethod.method);
          $paymentMethods.append($paymentMethod);
        });
      })
      .fail(handleAJAXError);
    // loading products
  });

  $pageContent.css(('padding-top'), $('.navbar').outerHeight());

  //  read categories
  $.ajax(`${server}/api/categories`)
    .done((categories) => {
      //  populate carousel with categories
      const $carousel = mkCarousel(categories);
      $pageContent.append($carousel);
      $carousel.carousel();
      //  Iterate over the categories and append to navbar
      categories.forEach((category, number) => {
        $('.navbar-nav').append(`
            <li class="nav-item">
            <a class="nav-link" data-id="${number}" data-name="${category.name}" href="#">${category.name}</a>
            </li>`);
      });
    })
    //  or fail trying
    .fail(handleAJAXError);

  //  ajax req and append products grid
  $.ajax(`${server}/api/products`)
    .done((products) => {
      //  append products-grid after carousel
      function loadCards() {
        $pageContent
          .append(`<div class="infobox"><h2 id="infos">All products (${Object.keys(products).length})</h2></div>`)
          .append('<div id="products-grid" class="container-fluid"></div>');
        //  populate products-grid with products
        $('#products-grid').append('<div class="row"></div>');
        refreshProducts(products, '-1');
      }
      loadCards();
      // click event handler on nav-links
      $('.navbar-nav .nav-item').click((eventObj) => {
        eventObj.preventDefault();
        const { target } = eventObj;
        const linkName = target.getAttribute('data-id');
        $('.navbar-nav .active').removeClass('active');
        $(target).closest('li').addClass('active');
        //  clean the products-grid and update the content
        $pageContent.empty();
        loadCards();
        refreshProducts(products, linkName);
      });
    })
    //  or fail trying
    .fail(handleAJAXError);
});
