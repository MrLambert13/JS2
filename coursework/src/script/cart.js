"use strict";

/*
<div id="cart" class="cart__menu menuCart">

  <div class="menuCart__total flex-jcsb">
    <span class="menuCart__total_text">TOTAL</span>
    <span class="menuCart__total_text">$500.00</span>
  </div>

  <a href="checkout.html" class="menuCart__btn menuCart__btn_check ">chekout</a>
  <a href="cart.html" class="menuCart__btn menuCart__btn_cart ">go to cart</a>

</div>*/

function buildCart() {
  //TODO Load cart
  var $cart = $('#cart');
  $cart.empty();
  var totalPrice = 0;
  $.getJSON('http://localhost:3000/cart', function (data) {
    // console.log(data);
    if (data.length === 0) {
      $cart.text('No goods');
    } else {
      for (var key in data) {

        getInfo(key, function (name, price, srcImage) {
          // console.log(name, price, srcImage);
          //build good sin cart
          $cart.append(
            $('<div />')
              .addClass('menuCart__row flex-jcsb-aic')
              .append(
                $('<div />')
                  .addClass('menuCart__row_col1')
                  .append(
                    $('<a />')
                      .attr('href', '#')
                      .append(
                        $('<img />').attr({
                          src: srcImage,
                          alt: name,
                          style: 'height: 85px'
                        })
                      )
                  ),
                //add name in col2 cart
                $('<div />')
                  .addClass('menuCart__row_col2 col2')
                  .append(
                    $('<a />')
                      .attr({
                        class: 'col2__name',
                        href: '#'
                      })
                      .text(name),
                    //TODO add stars
                    $('<img />').attr({
                      class: 'col2__star block',
                      src: 'img/stars.png',
                      alt: 'stars'
                    }),
                    //count and price
                    $('<span />')
                      .addClass('col2__price')
                      .text(data[key] + ' x $' + price) //TODO count
                  ),
                //col 3 with btn remove
                $('<div />')
                  .addClass('menuCart__row_col3')
                  .append(
                    $('<a />')
                      .attr({
                        class: 'action__del',
                        href: '#'
                      })
                      .append(
                        $('<i />').addClass('fas fa-times-circle')
                      )
                  )
              )
          );
          totalPrice += data[key] * price;
          console.log(totalPrice);
        });
      }
    }

  });
}

function getInfo(id, callback) {
  $.ajax({
    url: 'http://localhost:3000/goods',
    dataType: 'json',
    success: function (dataGoods) {
      callback(dataGoods[id]['name'], dataGoods[id]['cost'], dataGoods[id]['image']);
    }
  })
}