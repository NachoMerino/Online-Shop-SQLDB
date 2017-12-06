//  import core files
import $ from 'jquery';
import 'bootstrap/js/src';
import './styles.scss';
import navbarTemplate from './templates/navbar.html';
import modalTemplate from './templates/modal.html';
import mkCarousel from './carousel';
import { mkProductCard, refreshProducts } from './products';


//  append navbar
$(() => {
  //  append modal window
  $('#root').append(modalTemplate);
  //  append navbar
  $('#root').append(navbarTemplate);
  //  read categories
  $.ajax('./static/categories.json')
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
  $.ajax('./static/products.json')
    .done((products) => {
      //  append products-grid after carousel
      $('#root').append(`<div class="infobox"><h2 id="infos">All products (${Object.keys(products).length})</h2></div>`);
      $('#root').append('<div id="products-grid" class="container-fluid"></div>');
      //  populate products-grid with products
      $('#products-grid').append('<div class="row"></div>');
      products
        .forEach((product) => {
          $('.row').append(mkProductCard(product));
        });
      // click event handler on nav-links
      $('.nav-link').click((eventObj) => {
        const { target } = eventObj;
        const linkName = target.getAttribute('data-id');
        //  clean the products-grid and update the content
        $('#products-grid').empty();
        refreshProducts(products, linkName);
      });
      $('.detailsButton').click((eventObj) => {
        const { target } = eventObj;
        $('.modal-title').text(`More info about ${target.getAttribute('data-name')}`);
        $('.modal-body').text(`The price of this product is ${target.getAttribute('data-price')}`);
        //  console.log(target.getAttribute('data-price'));
      });
    })
    //  or fail trying
    .fail((xhr, status, error) => {
      $('#root').append(`<div>Ajax Error products: ${error}</div>`);
    });

  // End
});
