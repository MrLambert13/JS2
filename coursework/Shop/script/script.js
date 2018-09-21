"use strict";

$('document').ready(function () {
  loadGoods();
});

function loadGoods() {
  //load goods from goods.json
  $.getJSON('json/goods.json', function (data) {
    console.log(data);

  });
}