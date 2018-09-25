"use strict";

/*
<div id="cart" class="cart__menu menuCart">

  <a href="checkout.html" class="menuCart__btn menuCart__btn_check ">chekout</a>
  <a href="cart.html" class="menuCart__btn menuCart__btn_cart ">go to cart</a>

</div>*/


function buildCart() {
  //TODO Load cart
  var $cart = $('#cart');
  $cart.empty();
  var totalPrice = 0;
  $.ajax({
    url: 'http://localhost:3000/cart',
    dataType: 'json',
    success: function (cart) {
      if (cart.length === 0) {
        $cart.text('No goods');
      } else {
        cart.forEach(function (item) {
          //build goods in cart
          $cart.append(
            $('<div />')
              .addClass('menuCart__row flex-jcsb-aic')
              .append(
                $('<div />')
                  .addClass('menuCart__row_col1')
                  .append(
                    $('<a />')
                      .attr({
                        href: '#',
                        'data-quantity': item.quantity,
                        'data-id': item.id
                      })
                      .append(
                        $('<img />').attr({
                          src: item.image,
                          alt: item.name,
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
                      .text(item.name),
                    //TODO add stars
                    $('<img />').attr({
                      class: 'col2__star block',
                      src: 'img/stars.png',
                      alt: 'stars'
                    }),
                    //count and price
                    $('<span />')
                      .addClass('col2__price')
                      .text(item.quantity + ' x $ ' + (+item.price).toFixed(2))
                  ),
                //col 3 with btn remove
                $('<div />')
                  .addClass('menuCart__row_col3')
                  .append(
                    $('<a />')
                      .attr({
                        class: 'action__del',
                        href: '#',
                        'data-id': item.id
                      })
                      .append(
                        $('<i />').addClass('fas fa-times-circle')
                      )
                  )
              )
          );
          totalPrice += item.quantity * item.price;
          // console.log(totalPrice.toFixed(2));

        });
        $cart.append(
          $('<div />')
            .addClass('menuCart__total flex-jcsb')
            .append(
              $('<span />').addClass('menuCart__total_text').text('TOTAL'),
              $('<span />').addClass('menuCart__total_text').text('$' + totalPrice.toFixed(2))
            )
        );
      }
    }
  });
  $cart.append(

  )
}

/**
 * Add to cart good
 * @param target {HTMLElement} - clicked element in DOM
 */
function addToCart(target) {
  //get id
  var id = target.dataset.id;
  //check cart for this ID
  var entity = $('#cart [data-id="' + target.dataset.id + '"]');
  if (entity.length) {
    //selected good already in the cart
    $.ajax({
      url: 'http://localhost:3000/cart/' + id,
      type: 'PATCH',
      headers: {
        'content-type': 'application/json',
      },
      data: JSON.stringify({
        quantity: +$(entity)[0].dataset.quantity + 1,
      }),
      success: function () {
        // rebuld cart
        buildCart();
      }
    })
  } else {
    //it is first good
    $.ajax({
      url: 'http://localhost:3000/cart',
      type: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      data: JSON.stringify({
        id: id,
        quantity: 1,
        name: target.dataset.name,
        price: target.dataset.price,
        image: target.dataset.srcimg
      }),
      success: function () {
        // rebuld cart
        buildCart();
      }
    })
  }
}

function removeFromCart(target) {
  //get id
  var id = target.dataset.id;
  $.ajax({
    url: 'http://localhost:3000/cart/' + id,
    type: 'DELETE',
    success: function () {
      // rebuld cart
      buildCart();
    }
  })
}