"use strict";
/*
<div class="item">
  <a href="product.html" class="item__linktoproduct">
    <img class="item__img" src="img/item1.jpg" alt="item1">
    <h6 class="item__name">Mango People T-shirt</h6>
    <p class="item__price">&#36;52.00</p>
  </a>
  <div class="item__card">
    <a class="item__card-link" href="#"><img src="img/shoppingcard-white.svg" alt="card">
      Add to
      Cart</a>
  </div>
</div>*/

(function ($) {
  $('document').ready(function () {
    //Load all goods from db.json/goods
    loadGoods();
    //Load cart from db.json/cart
    loadCart();
    //Add event on btn 'Add to cart'
    $('#goods').on('click', '.item__card-link', function (event) {
      // console.log(event.target.dataset.id);
      addToCart(event.target.dataset.id);
      event.preventDefault();
    })
  });
})(jQuery);

function loadCart() {
  //TODO Load cart
}

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