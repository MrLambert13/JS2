"use strict";

(function ($) {
  $('document').ready(function () {
    //Load all goods from db.json/goods
    loadGoods();
    //Load cart from db.json/cart to mini cart
    buildMiniCart();


    //Add event on btn 'Add to cart'
    $('#goods').on('click', '.item__card-link', function (event) {
      // console.log(event.target.dataset.id);
      addToCart(event.target);
      event.preventDefault();
    });

    //Add event on btn remove good
    $('#cart, #bigCart').on('click', '.action__del', function (event) {
      removeFromCart(event.currentTarget);
      event.preventDefault();
    });

    //Add event on input quantity changed
    $('#bigCart').on('change', '.quantity__input', function (event) {
      changeInCart(event.target);
    });

  });
})(jQuery);





/**
 * load goods from db.json/goods
 */
function loadGoods() {
  $.getJSON('http://localhost:3000/goods', function (data) {
    data.forEach(function (elem) {
      //card of good
      var $a = $('<a />');
      $a.attr('href', 'product.html').addClass('item__linktoproduct')
        .append($('<img />').attr({
          src: elem.image,
          alt: elem.name,
          class: 'item__img'
        }))
        .append($('<h6 />').addClass('item__name').text(elem.name))
        .append($('<p />').addClass('item__price').text('$ ' + elem.price.toFixed(2)));
      //button add to cart
      var $buyLinkBlock = $('<div />');
      $buyLinkBlock.addClass('item__card')
        .append($('<a />').attr({
            href: '#',
            class: 'item__card-link',
            'data-id': elem.id,
            'data-name': elem.name,
            'data-price': elem.price,
            'data-srcImg': elem.image,
            'data-color': elem.color,
            'data-size': elem.size,
            'data-shipping': elem.shipping
          //TODO сюда добавлять новые данные
          })
            .text('Add to cart')
        );
      //main div for item
      var $itemDiv = $('<div />');
      $itemDiv.addClass('item')
        .append($a).append($buyLinkBlock);
      //add all in main section
      $('#goods').append($itemDiv);
    });
  });
}