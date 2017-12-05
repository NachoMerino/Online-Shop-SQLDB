//  import core files
import $ from 'jquery';
import 'bootstrap/js/src';
import './styles.scss';
import navbarTemplate from './templates/navbar.html';
//  TODO 2.2: Add a new template for the modal windows
import mkCarousel from './carousel';
//  TODO 1.3: Add the new functions from products to import
import mkProductCard from './products';


//  append navbar
$(() => {
  //  TODO 2.3: Append modal windows tpl

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
        //  TODO 1.1: Add data attributes to the links: data-name
        $('.navbar-nav').append(`
            <li class="nav-item">
            <a class="nav-link" data-id="${number}" href="#">${category.name}</a>
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
      //  TODO 1.5: Add Counter
      //  append products-grid after carousel
      $('#root').append('<div id="products-grid" class="container-fluid"></div>');
      //  populate products-grid with products
      $('#products-grid').append('<div class="row"></div>');
      products
        .forEach((product) => {
          $('.row').append(mkProductCard(product));
        });
      // TODO 1.2: click event handler for nav-links

      // TODO 2.6: click event handler for details button
    });
  //  or fail trying TODO: BONUS
  // End
});
