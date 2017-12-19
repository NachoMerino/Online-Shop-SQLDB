//  import core files
import $ from 'jquery';
import 'bootstrap/js/src';
import './styles.scss';
import navbarTemplate from './templates/navbar.html';
import modalTemplate from './templates/modal.html';
import mkCarousel from './carousel';
import refreshProducts from './products';

//  append navbar
$(() => {
  $('#root').append(modalTemplate)
    .append(navbarTemplate);
  $('#cart').click(((e) => {
    e.preventDefault();
    $('.shopping-cart').toggle('slow', (() => {}));
  }));
  //  read categories
  $.ajax('http://localhost:9090/api/categories')
    .done((categories) => {
      //  populate carousel with categories
      const $carousel = mkCarousel(categories);
      $('#root').append($carousel);
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
    .fail((xhr, status, error) => {
      $('#root').append(`<div>Ajax Error categories: ${error}</div>`);
    });

  //  ajax req and append products grid
  $.ajax('http://localhost:9090/api/products')
    .done((products) => {
      //  append products-grid after carousel
      $('#root').append(`<div class="infobox"><h2 id="infos">All products (${Object.keys(products).length})</h2></div>`);
      $('#root').append('<div id="products-grid" class="container-fluid"></div>');
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
    .fail((xhr, status, error) => {
      $('#root').append(`<div>Ajax Error products: ${error}</div>`);
    });

  // Add a random active user ID

  // Load the data storaged in the LocalStorage
  function accessUserInfo(user) {
    const getUserDataLS = JSON.parse(localStorage.getItem(user));
    console.info('MY LS DATA', getUserDataLS);
    // console.info('My Random user firstname: ', getUserDataLS.firstname);
    // console.info('My Random user lastname: ', getUserDataLS.lastname);
    // console.info('My Random user email: ', getUserDataLS.email);
  }

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
        accessUserInfo('User');
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
