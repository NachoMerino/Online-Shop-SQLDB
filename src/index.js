//  import core files
import $ from 'jquery';
import 'bootstrap/js/src';
import './styles.scss';
import navbarTemplate from './templates/navbar.html';
import modalTemplate from './templates/modal.html';
import checkoutTemplate from './templates/checkout.html';
import mkCarousel from './carousel';
import refreshProducts from './products';

//  append navbar
$(() => {
  const $pageContent = $('<div class="page-content"></div>');
  $('#root').append(modalTemplate)
    .append(navbarTemplate)
    .append($pageContent);

  function handleAJAXError(xhr, status, error) {
    $pageContent
      .empty()
      .append(`<div>Ajax Error categories: ${error}</div>`);
  }

  // Load the data storaged in the LocalStorage
  function getUserData(user) {
    const userData = JSON.parse(localStorage.getItem(user));
    $('#customer-name').val(`${userData.firstname} ${userData.lastname}`);
    $('#customer-street').val(userData.street);
    $('#customer-postcode').val(`${userData.postal} ${userData.city}`);
  }

  function checkSumPrice(cart) {
    const cartPrices = JSON.parse(localStorage.getItem(cart));
    $('.total-price-info h4').html(`Total Price: ${cartPrices} €`);
  }
  // checkout method
  $('.checkout-proceed').click(() => {
    $('.shopping-cart').hide();
    $('.page-content')
      .empty()
      .append(checkoutTemplate);
    getUserData('User');
    checkSumPrice('totalPrice');
  });
  $pageContent.css(('padding-top'), $('.navbar').outerHeight());

  $('#cart').click(((e) => {
    e.preventDefault();
    $('.shopping-cart').toggle('slow', (() => {}));
  }));
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
