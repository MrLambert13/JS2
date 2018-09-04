"use strict";
window.onload = function () {
  document.getElementById('send').addEventListener('click', function (event) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://localhost:3000/items');
    xhr.send();
    xhr.onreadystatechange = function () {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        var items = JSON.parse(xhr.responseText);

        items = items.map(function (item) {
          if (item.sub) {
            console.log(item.sub[0]);
            return new MenuItem(item.href, item.label, new SubMenu('submenu', 'submenu', new MenuItem(
              function (item) {
                return [item.sub[0].href, item.sub[0].label];
              }
              )
              )
            );
          } else {
            return new MenuItem(item.href, item.label);
          }
        });

        var menu = new Menu('menu', 'menu', items);

        document.body.appendChild(menu.render());
      }
    };

    event.preventDefault();
  })
};