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

//  append navbar
$(() => {
  const $pageContent = $('<div class="page-content"></div>');
  $('#root')
    .append(modalTemplate)
    .append(navbarTemplate)
    .append($pageContent);

  function handleAJAXError(xhr, status, error) {
    $pageContent
      .empty()
      .append(`<div>Ajax Error categories: ${error}</div>`);
  }

  $('#cart').click(((e) => {
    e.preventDefault();
    $('.shopping-cart').toggle('slow', (() => {}));
  }));

  // checkout method
  $('.checkout-proceed').click(() => {
    const userData = JSON.parse(localStorage.getItem('User'));
    const $checkout = $(checkoutTemplate);
    $checkout.find('[name="user-name"]').val(`${userData.firstname} ${userData.lastname}`);
    $checkout.find('[name="user-street"]').val(userData.street);
    $checkout.find('[name="user-city"]').val(`${userData.postal} ${userData.city}`);
    $('.page-content')
      .empty()
      .append($checkout);

    const $paymentMethods = $checkout
      .find('.payment-methods')
      .empty();

    $.ajax('http://localhost:9090/api/payment_methods')
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
    const loadProducts = JSON.parse(localStorage.getItem('cart'));
    const loadtotalPrice = JSON.parse(localStorage.getItem('totalPrice'));
    $checkout.find('.products').html(`
      <h4>Total Price: ${loadtotalPrice} €</h4>
      <h5>Your order is:<h5>
      <p>Name: ${loadProducts[0].name}</p>
      `);

    $('.shopping-cart').hide();
  });

  $pageContent.css(('padding-top'), $('.navbar').outerHeight());

  //  read categories
  $.ajax('http://localhost:9090/api/categories')
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
  $.ajax('http://localhost:9090/api/products')
    .done((products) => {
      //  append products-grid after carousel
      $pageContent
        .append(`<div class="infobox"><h2 id="infos">All products (${Object.keys(products).length})</h2></div>`)
        .append('<div id="products-grid" class="container-fluid"></div>');
      //  populate products-grid with products
      $('#products-grid').append('<div class="row"></div>');
      refreshProducts(products, '-1');
      // click event handler on nav-links
      $('.nav-link').click((eventObj) => {
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
  function selectActiveUser(id) {
    $.ajax(`http://localhost:9090/api/customers/${id}`)
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
        localStorage.setItem('User', JSON.stringify(userInfo));
      });
  }

  // make a query for all the active users in our shop
  $.ajax('http://localhost:9090/api/activecustomers')
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

  localStorage.removeItem('User');
  // End
});
