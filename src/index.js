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
  $('.shopping-cart, #cart, .usertools-button, .logout-button, .user-lost-password, .user-setnew-password').hide();
  // login & register
  $('.user-login, .user-register, .user-lost-password, .user-setnew-password, .user-update')
    .hide()
    .css(('margin-top'), $('.navbar').outerHeight());

  const $userLogin = $('.user-login');
  const $userRegister = $('.user-register');
  const $userUpdate = $('.user-update');
  const $userLostPassword = $('.user-lost-password');
  const $inputEmailLogin = $('#inputEmailLogin');
  const $inputFirstname = $('#inputFirstname');
  const $loginButton = $('.login-button');
  const $registerButton = $('.register-button');
  const $userButton = $('.usertools-button');
  const $logoutButton = $('.logout-button');
  const $shopingCart = $('.shopping-cart');
  const $inputPassword = $('#inputPassword');
  const $checkoutProceed = $('.checkout-proceed');
  const $inputEmail1 = $('#inputEmail2');
  const $inputEmail2 = $('#inputEmail1');
  const $cart = $('#cart');
  // Webpage loaded

  function removeError() {
    $('.alert-danger, .alert-success').remove();
  }

  // BackEnd Error displayed
  function loadError(errData) {
    removeError();
    $('.user-register, .user-login, .user-lost-password, .user-setnew-password, .user-update')
      .append(`<div class="alert alert-danger">
                  ${errData}
                  </div>`);
  }

  function loadSuccess(succData) {
    removeError();
    $('.user-register, .user-login, .user-lost-password, .user-setnew-password, .user-update')
      .append(`<div class="alert alert-success" role="alert">
              ${succData}
              </div>`);
  }

  // Keyup function to check the emails
  function keyUpChecker(toCheck1, toCheck2, succMsg, failMsg) {
    toCheck1.keyup(() => {
      if (toCheck1.val() !== toCheck2.val()) {
        loadError(failMsg);
      } else if (toCheck1.val() === toCheck2.val()) {
        loadSuccess(succMsg);
      }
    });
  }

  // load a modal with a message and a picture
  function modalLoad(message, img) {
    $('#detailsModal').modal('toggle');
    $('.modal-title').text(message);
    $('.modal-image').attr('src', img);
    $('.modal-text').remove();
    $('.modal-footer button, .close, .modal-open').click(() => {
      // load the page we want, usually the main page
      window.location.replace('http://localhost:5000');
    });
  }

  // alert in case of AJAX failure
  function handleAJAXError(xhr, status, error) {
    $pageContent
      .empty()
      .append(`<div>Ajax Error categories: ${error}</div>`);
  }
  // here can be strore all the keyups DOM loaded for the Forms
  keyUpChecker($inputEmail1, $inputEmail2, 'Mails match', 'Mails should be equal');

  // check if there is an activation link incoming
  if (window.location.href.includes('activate')) {
    // select just the link of the navigation, are the last 20 characters
    const activationCode = window.location.href.slice(-20);
    /* eslint-disable */
    $.ajax(`${server}/api/activate/${activationCode}`, {
        method: 'PUT',
        contentType: 'application/json',
      })
      /* eslint-enable */
      .done((data) => {
        if (data.err === undefined) {
          // popup the modal to show the green tick
          modalLoad('Your Account has been activated', 'https://cdn.pixabay.com/photo/2013/07/12/17/00/approved-151676_960_720.png');
        } else {
          // if error happend
          modalLoad(data.err, 'https://cdn.pixabay.com/photo/2017/02/12/21/29/false-2061132_960_720.png');
        }
      })
      .fail(() => {
        modalLoad('Our server crashed!', 'https://cdn.pixabay.com/photo/2017/06/14/16/20/network-2402637_960_720.jpg');
      });
  }

  // Check if there is any recover password user comming
  if (window.location.href.includes('resetpassword')) {
    const recoveringCode = window.location.href.slice(-20);
    $('.user-setnew-password').show('slow');
    $('.form-setnew').on('submit', ((e) => {
      e.preventDefault();
      const pass1 = $('#recoverPassword1').val();
      const pass2 = $('#recoverPassword2').val();
      if (pass1 !== pass2) {
        loadError('Passwords must be equal');
      } else {
        $('.user-setnew-password').hide('slow');
        /* eslint-disable */
        $.ajax(`${server}/api/passwordreset/${recoveringCode}`, {
            method: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify({
              newPassword: pass2,
            }),
          })
          /* eslint-enable */
          .done((data) => {
            modalLoad(data, 'https://cdn.pixabay.com/photo/2013/07/12/17/00/approved-151676_960_720.png');
          })
          .fail((data) => {
            loadError(data.err);
          });
      }
    }));
  }
  // load the LS of the userToken
  const userToken = JSON.parse(localStorage.getItem('userToken'));
  const userCart = JSON.parse(localStorage.getItem('cart'));
  // load user data if the user exist in localStorage
  let checkUserLS = JSON.parse(localStorage.getItem('user'));
  if (checkUserLS !== null) {
    $loginButton.hide();
    $registerButton.hide();
    $logoutButton.show();
    $userButton
      .show()
      .html(`<i class="fa fa-user" aria-hidden="true"></i> ${checkUserLS.firstname}`);
  }

  if (userCart !== null) {
    $cart.show();
    const sum = [];
    userCart.forEach((data) => {
      sum.push(data.quantity);
    });
    const totalSum = sum.reduce((a, b) => a + b, 0);
    $('.badge').text(totalSum);
    // adding pictures and data
    /*
    $.ajax(`${server}/api/products`)
      .done((localStoragePicture) => {
        //  define obj
        const { target } = eventObj;
        //  define product obj and retriving data using jquery
        const product = {};
        product.id = $(target).parent().find('#detailsButton').attr('data-id');
        product.catid = $(target).parent().find('#detailsButton').attr('data-catid');
        product.name = $(target).parent().find('#detailsButton').attr('data-name');
        product.price = $(target).parent().find('#detailsButton').attr('data-price');
        const pictID = $(target).parent().find('#detailsButton')[0].attributes[6].value;
        product.pictures = localStoragePicture[pictID].pictures;
        product.quantity = 1;
        //  workaround duplication
        //  $(target).attr('disabled', true);
        //  add product to cart
        cart.addItem(product);
      });
      */
  }

  // hide the popup content when click outside of it
  $($pageContent).click(() => {
    $userRegister.hide('slow');
    $userLogin.hide('slow');
    $shopingCart.hide('slow');
    $userUpdate.hide('slow');
    $userLostPassword.hide('slow');
    $userRegister.hide('slow');
    $userLogin.hide('slow');
    $userUpdate.hide('slow');
    $userLostPassword.hide('slow');
  });

  // All navbar click events
  // logout
  $logoutButton.click(() => {
    $userUpdate.hide('slow');
    localStorage.removeItem('user');
    localStorage.removeItem('cart');
    localStorage.removeItem('userToken');
    localStorage.removeItem('totalPrice');
    $shopingCart.hide();
    $cart.hide();
    $logoutButton.hide();
    $userButton.hide();
    $loginButton.show();
    $registerButton.show();
  });

  $('.signin').click((e) => {
    e.preventDefault();
    $userLogin.toggle('slow');
    $inputEmailLogin.focus();
    if ($userRegister.is(':visible') || $userLostPassword.is(':visible')) {
      $userRegister.hide('slow');
      $userLostPassword.hide('slow');
    }
  });

  $userButton.click((e) => {
    e.preventDefault();
    removeError();
    $userLostPassword.hide('slow');
    $userUpdate.toggle('slow');
    $('#changePassword2').hide();
    $('#changePassword1').keyup(() => {
      if ($('#changePassword1').val() !== '') {
        $('#changePassword2').fadeIn('slow');
      } else if ($('#changePassword1').val() === '') {
        $('#changePassword2').fadeOut('slow');
      }
    });
    $('#register').hide();
    $('#updateFirstname').val(checkUserLS.firstname);
    $('#updateLastname').val(checkUserLS.lastname);
    $('#updateDate').val(checkUserLS.birthdate);
    $('#updateEmail').val(checkUserLS.email);
    $('#updateCity').val(checkUserLS.city);
    $('#updatePostal').val(checkUserLS.postal);
    $('#updateStreet').val(checkUserLS.street);
  });

  // Hide login and show recover form
  $('.lost-password').click((e) => {
    e.preventDefault();
    removeError();
    $('.user-login').hide('slow');
    $('.user-update').hide('slow');
    $userLostPassword.show('slow');
  });
  // LOGIN AND REGISTER BUTTON
  $('.login-button, .register').click((e) => {
    e.preventDefault();
    removeError();
    // fix user because im lazy to write
    $inputEmailLogin.val('escatman@gmail.com');
    $inputPassword.val('qwerty');
    $('.form-register #inputEmail').val('escatman@gmail.com');
    // fix user because im lazy to write
    $userLogin.toggle('slow');
    $userLostPassword.hide('slow');
    $inputEmailLogin.focus();
    if ($userRegister.is(':visible')) {
      $userRegister.hide('slow');
    }
  });

  $('.new-registation, .register-button').click((e) => {
    e.preventDefault();
    removeError();
    $userRegister.toggle('slow');
    $userLostPassword.hide('slow');
    $inputFirstname.focus();
    if ($userLogin.is(':visible')) {
      $userLogin.hide('slow');
    }
  });

  $cart.click(((e) => {
    removeError();
    e.preventDefault();
    $shopingCart.toggle('slow');
    $userLogin.hide('slow');
    $userRegister.hide('slow');
    if (userToken !== null) {
      $checkoutProceed.empty().html('<button type="button" class="btn btn-dark btn-block checkout-proceed">Checkout</button>');
    }
  }));

  // Register Form
  $('.form-register').on('submit', ((e) => {
    e.preventDefault();
    removeError();
    localStorage.removeItem('user');
    /* eslint-disable */
    $.ajax(`${server}/api/register`, {
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({
          firstname: $('#inputFirstname').val(),
          lastname: $('#inputLastname').val(),
          birthdate: $('#inputDate').val(),
          email: $('#inputEmail2').val(),
          city: $('#inputCity').val(),
          postal: $('#inputPostal').val(),
          street: $('#inputStreet').val(),
          pwd: $('#inputPasswordRegister').val(),
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

  // USER LOGIN
  $('.form-signin').on('submit', ((e) => {
    e.preventDefault();
    removeError();
    // sending the post request
    /* eslint-disable */
    $.ajax(`${server}/api/login`, {
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({
          email: $inputEmailLogin.val(),
          pwd: $inputPassword.val(),
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
          checkUserLS = JSON.parse(localStorage.getItem('user'));
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
  }));

  // EDIT user
  $('.form-update').on('submit', ((e) => {
    e.preventDefault();
    removeError();
    const pass1 = $('#changePassword1').val();
    const pass2 = $('#changePassword2').val();
    if (pass1 !== pass2) {
      loadError('Passwords must be equal');
    } else {
      /* eslint-disable */
      $.ajax(`${server}/api/user/${checkUserLS.id}`, {
          method: 'PUT',
          contentType: 'application/json',
          data: JSON.stringify({
            firstname: $('#updateFirstname').val(),
            lastname: $('#updateLastname').val(),
            birthdate: $('#updateDate').val(),
            email: $('#updateEmail').val(),
            city: $('#updateCity').val(),
            postal: $('#updatePostal').val(),
            street: $('#updateStreet').val(),
            oldPwd: $('#updatePasswordRegister').val(),
            pwd: pass2,
          }),
        })
        /* eslint-enable */
        .done((data) => {
          if (data.err === undefined) {
            loadSuccess('Info Updated');
          } else {
            loadError(data.err);
          }
        })
        .fail((data) => {
          loadError(data.err);
        });
    }
  }));

  // RECOVER PASSWORD
  $('.form-lostpass').on('submit', ((e) => {
    e.preventDefault();
    removeError();
    /* eslint-disable */
    $.ajax(`${server}/api/recover`, {
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({
          recEmail: $('.form-lostpass #inputEmailRecover').val(),
        }),
      })
      /* eslint-enable */
      .done((data) => {
        if (data.err === undefined) {
          $userLostPassword.hide();
          modalLoad('Email Sent', 'https://cdn.pixabay.com/photo/2017/02/08/08/38/mail-2048128_960_720.png');
        } else {
          loadError(data.err);
        }
      })
      .fail((data) => { loadError(data); });
  }));

  // checkout method
  $checkoutProceed.click(() => {
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
          headers: {
            authorization: `Bearer ${userToken}`,
          },
          data,
        })
        /* eslint-enable */
        .done((dataOrder) => {
          if (dataOrder.err === undefined) {
            $checkout
              .empty()
              .append(`<div class="alert alert-success">
            The order has been placed!
            </div>`);
          } else {
            $checkout
              .empty()
              .append(`<div class="alert alert-danger">
            ${dataOrder.err}
            </div>`);
          }
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
        refreshProducts(products, linkName);
      });
    })
    //  or fail trying
    .fail(handleAJAXError);
});
