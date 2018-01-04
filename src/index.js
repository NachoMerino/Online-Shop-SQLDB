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
const server = 'http://nachoserver:9090';

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
  const $inputEmail = $('#inputEmail');
  const $inputFirstname = $('#inputFirstname');
  const $loginButton = $('.login-button');
  const $registerButton = $('.register-button');
  const $userButton = $('.usertools-button');
  const $logoutButton = $('.logout-button');
  
  // check if user exist in localstorage
  const loggedUser = JSON.parse(localStorage.getItem('user'));
  if (loggedUser !== null) {
    const user = JSON.parse(localStorage.getItem('user'));
    $loginButton.hide();
    $registerButton.hide();
    $userButton
      .show()
      .html(`<i class="fa fa-user" aria-hidden="true"></i> ${user.firstname}`);
    $logoutButton.show();
  }

  $($pageContent).click(() => {
    $userRegister.hide('slow');
    $userLogin.hide('slow');
  });

  //  fake login
  $('.form-signin').on('submit', ((e) => {
    e.preventDefault();
    $userLogin.hide('slow');
    $('#inputEmail').val('');
    $('#inputUsername').val('');
    $loginButton.hide();
    $registerButton.hide();
    const user = JSON.parse(localStorage.getItem('user'));
    $userButton
      .show()
      .html(`<i class="fa fa-user" aria-hidden="true"></i> ${user.firstname}`);
    $logoutButton.show();
  }));
  //  fake login
  $('.login-button, .register').click((e) => {
    e.preventDefault();
    // Add a random active user ID
    // Select an active user by his id and storage the data as an object in the localStorage
    function selectActiveUser(id) {
      $.ajax(`${server}/api/customers/${id}`)
        .done((user) => {
          const userInfo = {
            id: user[0].id,
            firstname: user[0].firstname,
            lastname: user[0].lastname,
            email: user[0].email,
            phone: user[0].phone,
            city: user[0].city,
            postal: user[0].postal,
            street: user[0].street,
          };
          localStorage.setItem('user', JSON.stringify(userInfo));
          $('#inputEmail').val(userInfo.email);
          $('#inputUsername').val(`${userInfo.firstname} ${userInfo.lastname}`);
        });
    }
    // make a query for all the active users in our shop
    $.ajax(`${server}/api/activecustomers`)
      .done((userIDs) => {
        const arrayIDs = [];
        userIDs.forEach((id) => {
          arrayIDs.push(id);
        });
        const activeUserID = [];
        for (let i = 0; i < arrayIDs.length; i += 1) {
          activeUserID.push(arrayIDs[i].id);
        }
        const max = activeUserID.length - 1;
        const userID = Math.floor(Math.random() * max);
        // selected one user with a random math of its id
        selectActiveUser(activeUserID[userID]);
      });
    $userLogin.toggle('slow');
    $inputEmail.focus();
    if ($userRegister.is(':visible')) {
      $userRegister.hide('slow');
    }
  });
  // logout
  $logoutButton.click(() => {
    localStorage.removeItem('user');
    $logoutButton.hide();
    $userButton.hide();
    $loginButton.show();
    $registerButton.show();
  });


  $('.signin').click((e) => {
    e.preventDefault();
    $userLogin.toggle('slow');
    $inputEmail.focus();
    if ($userRegister.is(':visible')) {
      $userRegister.hide('slow');
    }
  });

  $registerButton.click((e) => {
    e.preventDefault();
    $userRegister.toggle('slow');
    $inputFirstname.focus();
    if ($userLogin.is(':visible')) {
      $userLogin.hide('slow');
    }
  });

  $('.new-registation').click((e) => {
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
    $('.shopping-cart').toggle('slow');
  }));


  // checkout method
  $('.checkout-proceed').click(() => {
    $('.shopping-cart').hide();
    const userData = JSON.parse(localStorage.getItem('User'));
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
      $.ajax(`${server}/api/order`, {
        method: 'POST',
        contentType: 'application/json',
        data,
      })
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
      $pageContent
        .append(`<div class="infobox"><h2 id="infos">All products (${Object.keys(products).length})</h2></div>`)
        .append('<div id="products-grid" class="container-fluid"></div>');
      //  populate products-grid with products
      $('#products-grid').append('<div class="row"></div>');
      refreshProducts(products, '-1');
      // click event handler on nav-links
      $('navbar-nav .nav-item').click((eventObj) => {
        eventObj.preventDefault();
        const { target } = eventObj;
        const linkName = target.getAttribute('data-id');
        $('.navbar-nav .active').removeClass('active');
        $(target).closest('li').addClass('active');
        //  clean the products-grid and update the content
        refreshProducts(products, linkName);
      });
    })
    //  or fail trying
    .fail(handleAJAXError);

  // Add a random active user ID

  // Select an active user by his id and storage the data as an object in the localStorage
  /*
  function selectActiveUser(id) {
    $.ajax(`${server}/api/customers/${id}`)
      .done((user) => {
        const userInfo = {
          id: user[0].id,
          firstname: user[0].firstname,
          lastname: user[0].lastname,
          email: user[0].email,
          phone: user[0].phone,
          city: user[0].city,
          postal: user[0].postal,
          street: user[0].street,
        };
        localStorage.setItem('user', JSON.stringify(userInfo));
      });
  }

  // make a query for all the active users in our shop
  $.ajax(`${server}/api/activecustomers`)
    .done((userIDs) => {
      const arrayIDs = [];
      userIDs.forEach((id) => {
        arrayIDs.push(id);
      });
      const activeUserID = [];
      for (let i = 0; i < arrayIDs.length; i += 1) {
        activeUserID.push(arrayIDs[i].id);
      }
      const max = activeUserID.length - 1;
      const userID = Math.floor(Math.random() * max);
      // selected one user with a random math of its id
      selectActiveUser(activeUserID[userID]);
    });

  localStorage.removeItem('user');
  // End
  */
});
