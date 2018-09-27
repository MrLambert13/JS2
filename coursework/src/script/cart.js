"use strict";

/*
<div class="row flex">
  <div class="detail flex-aic liStyle-none">
   
    <div>
      <a href="#"><h3 class="detail__prodName">Mango People T-shirt</h3></a>
      <p class="detail__prodChar">Color: <span class="detail__prodChar-gray">RED</span></p>
      <p class="detail__prodChar">Size: <span class="detail__prodChar-gray">Xll</span></p>
    </div>
    
  </div>
  
  <div class="cardPrice">
    <p class="cardPrice__text">$150</p>
  </div>
  
  <div class="quantity flex-aic">
    <input class="quantity__input" type="number" value="2" min="1">
  </div>
  
  <div class="ship">
    <p class="ship__text">FREE</p>
  </div>
  
  <div class="subtotal">
    <p class="cardPrice__text">$300</p>
  </div>
  
  <div class="action">
    <a class="action__del" href="#"><i class="fas fa-times-circle"></i></a>
  </div>
  
</div>
*/

function buildBigCart() {
  var checkUrl = /cart.html/;
  var currentUrl = document.location.href;
  console.log(currentUrl);
  //if this opened
  if (checkUrl.test(currentUrl)) {
    var $cartBig = $('#bigCart');
    $.ajax({
      url: 'http://localhost:3000/cart',
      dataType: 'json',
      success: function (cart) {
        if (cart.length === 0) {
          $cartBig.text('YOUR CART IS EMPTY');
          buildNumber(cart.length);
        } else {
          cart.forEach(function (item) {
            //column PRODUCT
            var $divItem = $('<div />', {class: 'row flex'});
            var $scaleImgDiv = $('<div />', {class: 'img-scale'});
            var $imageGood = $('<a />', {href: '#'});
            $imageGood.append(
              $('<img />', {
                src: item.image,
                alt: item.name
              })
            );
            $scaleImgDiv.append($imageGood);
            $divItem.append($scaleImgDiv);
            $cartBig.append($divItem);

            //column DETAIL
          });
        }
      }
    });
  } else {

  }

}

/**
 * Function add small number of goods on top cart in header
 * and remove it if count < 0
 * @param count {number} count added goods
 */
function buildNumber(count) {
  if (count > 0) {
    var $cartImg = $('.cart-hov');
    $cartImg.append(
      $('<div />', {class: 'cart__number'}).text(count)
    );
  } else {
    $('.cart__number').remove();
  }
}

/**
 * Build cart and add selected goods
 */
function buildMiniCart() {
  //TODO Load cart
  var $cart = $('#cart');
  $cart.empty();
  var totalPrice = 0;
  var totalCount = 0;
  $.ajax({
    url: 'http://localhost:3000/cart',
    dataType: 'json',
    success: function (cart) {
      if (cart.length === 0) {
        $cart.text('YOUR CART IS EMPTY');
        buildNumber(cart.length);
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
          totalCount += item.quantity;
          totalPrice += item.quantity * item.price;
          // console.log(totalPrice.toFixed(2));
          buildNumber(totalCount);
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
  // add button
  $cart.append(
    $('<a />', {
      class: 'menuCart__btn menuCart__btn_check',
      href: 'checkout.html',
    }).text('chekout'),
    $('<a />', {
      class: 'menuCart__btn menuCart__btn_cart',
      href: 'cart.html',
    }).text('go to cart')
  )
  //Load cart from db.json/cart to big cart
  buildBigCart();
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
        buildMiniCart();
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
        buildMiniCart();
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
      buildMiniCart();
    }
  })
}