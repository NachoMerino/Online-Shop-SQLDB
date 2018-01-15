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

const bcrypt = require('bcryptjs');

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
  // Webpage loaded

  // BackEnd Error displayed
  function loadError(errdata) {
    $('.alert-danger').remove();
    $('.user-register, .user-login')
      .append(`<div class="alert alert-danger">
                  ${errdata}
                  </div>`);
  }

  // check if there is an activation link incoming
  if (window.location.href.includes('activate')) {
    const activationCode = window.location.href.slice(-20);
    /* eslint-disable */
    $.ajax(`${server}/api/activate/${activationCode}`, {
        method: 'PUT',
        contentType: 'application/json',
      })
      /* eslint-enable */
      .done((data) => {
        if (data.err === undefined) {
          $('#detailsModal').modal('toggle');
          $('.modal-title').text('Your Account has been activated');
          $('.modal-image').attr('src', 'https://cdn.pixabay.com/photo/2013/07/12/17/00/approved-151676_960_720.png');
          $('.modal-lorem').remove();
          $('.modal-footer button, .close, .modal-open').click(() => {
            window.location = window.location.replace('/', ' ');
          });
        } else {
          loadError(data.err);
        }
      })
      .fail((data) => {
        loadError(data.err);
      });
  }
  // load user data if the user exist in localStorage
  const checkUserLS = JSON.parse(localStorage.getItem('user'));
  if (checkUserLS !== null) {
    $loginButton.hide();
    $registerButton.hide();
    $logoutButton.show();
    $userButton
      .show()
      .html(`<i class="fa fa-user" aria-hidden="true"></i> ${checkUserLS.firstname}`);
  }

  // hide the popup content when click outside of it
  $($pageContent).click(() => {
    $userRegister.hide('slow');
    $userLogin.hide('slow');
    $shopingCart.hide('slow');
  });

  // Register Form
  $('.form-register').on('submit', ((e) => {
    e.preventDefault();
    localStorage.removeItem('user');
    /* eslint-disable */
    $.ajax(`${server}/api/register`, {
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({
          firstname: $('.form-register #inputFirstname').val(),
          lastname: $('.form-register #inputLastname').val(),
          birthdate: $('.form-register #inputDate').val(),
          email: $('.form-register #inputEmail').val(),
          city: $('.form-register #inputCity').val(),
          postal: $('.form-register #inputPostal').val(),
          street: $('.form-register #inputStreet').val(),
          pwd: $('.form-register #inputPasswordRegister').val(),
        }),
      })
      /* eslint-enable */
      .done((data) => {
        if (data.err === undefined) {
          $('.user-register').hide();
          $userButton
            .show()
            .html(`<i class="fa fa-user" aria-hidden="true"></i> ${data.firstname}`);
          $logoutButton.show();
          $loginButton.hide();
          $registerButton.hide();
          localStorage.setItem('userToken', JSON.stringify(data.token));
          localStorage.setItem('user', JSON.stringify({
            id: data.id,
            firstname: data.firstname,
            lastname: data.lastname,
            birthdate: data.birthdate.slice(0, 10),
            email: data.email,
            phone: data.phone,
            city: data.city,
            postal: data.postal,
            street: data.street,
          }));
        } else {
          loadError(data.err);
        }
      })
      .fail((data) => { loadError(data.err); });
  }));
  // EDIT user
  $userButton.click((e) => {
    e.preventDefault();
    $userRegister.toggle();
    $('#register').hide();
    const $toDelete = $userRegister.find('form');
    $toDelete.find('h2').text('Update');
    $toDelete.find('button').text('Update');
    $toDelete.removeClass('form-register').addClass('form-update');
    $('#inputPasswordRegister').removeClass('placeholder').attr('placeholder', 'Password to Confirm Changes');
    $('#inputFirstname').val(checkUserLS.firstname);
    $('#inputLastname').val(checkUserLS.lastname);
    $('#inputDate').val(checkUserLS.birthdate);
    $('#inputEmail').val(checkUserLS.email);
    $('#inputCity').val(checkUserLS.city);
    $('#inputPostal').val(checkUserLS.postal);
    $('#inputStreet').val(checkUserLS.street);
    /* eslint-disable */
    $('.form-update').on('submit', ((e) => {
      e.preventDefault();
      $.ajax(`${server}/api/user/${checkUserLS.id}`, {
          method: 'PUT',
          contentType: 'application/json',
          data: JSON.stringify({
            firstname: $('.form-update #inputFirstname').val(),
            lastname: $('.form-update #inputLastname').val(),
            birthdate: $('.form-update #inputDate').val(),
            email: $('.form-update #inputEmail').val(),
            city: $('.form-update #inputCity').val(),
            postal: $('.form-update #inputPostal').val(),
            street: $('.form-update #inputStreet').val(),
            pwd: $('.form-update #inputPasswordRegister').val(),
          }),
        })
        /* eslint-enable */
        .done((data) => {
          if (data.err === undefined) {
            $('.alert-success').remove();
            $('.form-update')
              .append(`<div class="alert alert-success" role="alert">
                    <strong>Well done!</strong> You successfully read this important alert message.
                    </div>`);
          } else {
            loadError(data.err);
          }
        })
        .fail((data) => {
          loadError(data.err);
        });
    }));
  });

  // REAL LOGIN
  $('.form-signin').on('submit', ((e) => {
    e.preventDefault();
    const userEmail = $inputEmailLogin.val();
    const userPwd = $inputPassword.val();
    // sending the post request
    /* eslint-disable */
    bcrypt.hash(userPwd, 10, (err, hash) => {
      $.ajax(`${server}/api/login`, {
          method: 'POST',
          contentType: 'application/json',
          data: JSON.stringify({
            email: userEmail,
            pwd: hash,
          }),
        })
        /* eslint-enable */
        // success
        .done((data) => {
          if (data.err === undefined) {
            $userLogin.hide('slow');
            $inputEmailLogin.val('');
            $inputPassword.val('');
            $loginButton.hide();
            $registerButton.hide();
            localStorage.setItem('userToken', JSON.stringify(data.token));
            localStorage.setItem('user', JSON.stringify({
              id: data.id,
              firstname: data.firstname,
              lastname: data.lastname,
              email: data.email,
              phone: data.phone,
              birthdate: data.birthdate.slice(0, 10),
              city: data.city,
              postal: data.postal,
              street: data.street,
            }));
            $userButton
              .show()
              .html(`<i class="fa fa-user" aria-hidden="true"></i> ${data.firstname}`);
            $logoutButton.show();
          } else {
            loadError(data.err);
          }
        })
        // fail login
        .fail((data) => {
          loadError(data.err);
        });
      if (err) {
        throw err;
      }
    });
  }));
  $('.login-button, .register').click((e) => {
    e.preventDefault();
    // createRandomUser();
    // fix user because im lazy to write
    $inputEmailLogin.val('escatman@gmail.com');
    $inputPassword.val('halloworld');
    $('.form-register #inputEmail').val('escatman@gmail.com');
    //
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
    if (checkUserLS === null) {
      $shopingCart.hide('slow');
      $userLogin.toggle('slow');
      $inputEmailLogin.focus();
      return;
    }
    $shopingCart.hide();
    const $checkout = $(checkoutTemplate);
    $checkout.find('[name="user-name"]').val(`${checkUserLS.firstname} ${checkUserLS.lastname}`);
    $checkout.find('[name="user-street"]').val(checkUserLS.street);
    $checkout.find('[name="user-city"]').val(`${checkUserLS.postal} ${checkUserLS.city}`);

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
          customer_id: checkUserLS.id,
          customer_email: checkUserLS.email,
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
