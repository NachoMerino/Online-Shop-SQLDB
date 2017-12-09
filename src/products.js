import $ from 'jquery';
import cardTemplate from './templates/card-template.html';

//  create product box in grid
export function mkProductCard(product) {
  const $el = $(cardTemplate);
  $el.find('div:nth-child(1)').addClass(`card ${product.category_id}`);
  $el.find('.card-title').text(product.name);
  $el.find('.card-text').text(`Price: ${product.price}€`);
  $el.find('.card-img-top').attr('src', `./static/assets/images/0${product.category_id}.jpg`);
  $el.find('.detailsButton').attr('data-name', `${product.name}`);
  $el.find('.detailsButton').attr('data-id', `${product.category_id}`);
  $el.find('.detailsButton').attr('data-price', `${product.price}`);
  return $el;
}
//  filter and refresh the products
export default function refreshProducts(products, type) {
  $('#products-grid').empty();
  $('#products-grid').append('<div class="row"></div>');
  const cat = parseInt(type, 10);
  //  check if request all product
  if (cat === -1) {
    products.forEach((product) => {
      $('.row').append(mkProductCard(product));
    });
    $('#infos').text(`All products (${Object.keys(products).length})`);
  } else {
    //  request only one product
    products.filter(product => product.category_id === cat)
      .forEach((product) => {
        $('.row').append(mkProductCard(product));
      });
    const activeCategory = $('.navbar-nav .active').text();
    console.log(activeCategory);
    $('#infos').text(`Total products in ${activeCategory} (${Object.keys(products.filter(product => product.category_id === cat)).length})`);
  }
  $('.detailsButton').click((eventObj) => {
    const { target } = eventObj;
    $('.modal-title').text(`More info about ${target.getAttribute('data-name')}`);
    $('.modal-image').attr('src', `./static/assets/images/0${target.getAttribute('data-id')}.jpg`);
    $('.modal-body').text(`The price of this product is € ${target.getAttribute('data-price')}`);
    $('.modal-total').text(`Total 1x ${target.getAttribute('data-name')} is € ${target.getAttribute('data-price')}`);
    $('#detailsModal').modal('toggle');
  });
}
