"use strict";

(function ($) {
  $('document').ready(function () {
    //Load all goods from db.json/goods
    loadGoods();
    //Load cart from db.json/cart
    buildCart();
    //Add event on btn 'Add to cart'
    $('#goods').on('click', '.item__card-link', function (event) {
      // console.log(event.target.dataset.id);
      addToCart(event.target.dataset.id);
      event.preventDefault();
    })
  });
})(jQuery);



/**
 * Add to cart good
 * @param article {number} - Article from selected good
 */
function addToCart(article) {
  //TODO buy goods
}

/**
 * load goods from db.json/goods
 */
function loadGoods() {
  $.getJSON('http://localhost:3000/goods', function (data) {
    // console.log(data);
    for (var key in data) {
      //card of good
      var $a = $('<a />');
      $a.attr('href', 'product.html').addClass('item__linktoproduct')
        .append($('<img />').attr({
          src: data[key]['image'],
          alt: data[key]['name'],
          class: 'item__img'
        }))
        .append($('<h6 />').addClass('item__name').text(data[key]['name']))
        .append($('<p />').addClass('item__price').text('$ ' + data[key]['cost'].toFixed(2)));

      //button add to cart
      var $buyLinkBlock = $('<div />');
      $buyLinkBlock.addClass('item__card')
        .append($('<a />').attr({
            href: '#',
            class: 'item__card-link',
            'data-id': key
          })
            .text('Add to cart')
        );

      //main div for item
      var $itemDiv = $('<div />');
      $itemDiv.addClass('item')
        .append($a).append($buyLinkBlock);
      //add all in main section
      $('#goods').append($itemDiv);
    }
  });
}