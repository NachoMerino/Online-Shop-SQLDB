import $ from 'jquery';
import cardTemplate from './templates/card-template.html';

//  create product box in grid
export default function mkProductCard(product) {
  const $el = $(cardTemplate);
  $el.find('div:nth-child(1)').addClass(`card ${product.category_id}`);
  $el.find('.card-title').text(product.name);
  $el.find('.card-text').text(`Price: ${product.price}€`);
  $el.find('.card-img-top').attr('src', `./static/assets/images/${product.type}.jpg`);
  return $el;
}

//  filter and refresh the products
//  TODO 1.3: Add refresh Products
