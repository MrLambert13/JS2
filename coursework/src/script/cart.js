"use strict";
/*
<div id="cart" class="cart__menu menuCart">
  <div class="menuCart__row flex-jcsb-aic">
    <div class="menuCart__row_col1">
      <a href="#"><img src="img/reboxzane1.jpg" alt=""></a>
    </div>
    <div class="menuCart__row_col2 col2">
      <a class="col2__name" href="#">Rebox Zane</a>
      <img class="col2__star block" src="img/stars.png" alt="">
      <span class="col2__price">1 x $250</span>
    </div>
    <div class="menuCart__row_col3">
      <a class="action__del" href="#"><i class="fas fa-times-circle"></i></a>
    </div>
  </div>
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

  $.getJSON('http://localhost:3000/cart', function (data) {
    // console.log(data);
    if (data.length === 0) {
      $cart.append($('<p />').text('No goods'));
    } else {

    }

  });
}