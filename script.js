"use strict";

function Container(id, className) {
  this.id = id;
  this.className = className;
}

Container.prototype.render = function () {
  var div = document.createElement('div');

  div.className = this.className;
  div.id = this.id;

  return div;
}


Container.prototype.remove = function () {
  //получаем элемент который нужно удалить
  var removeElement = document.getElementById(this.id);

  // Его родителю говорим удалить дочерний элемент, полученный выше
  removeElement.parentNode.removeChild(removeElement);
}

function Menu(id, className, items) {
  Container.call(this, id, className);

  this.items = items;
}

Menu.prototype = Object.create(Container.prototype);

Menu.prototype.render = function () {
  var ul = document.createElement('ul');

  ul.className = this.className;
  ul.id = this.id;

  this.items.forEach(function (item) {
    if (item instanceof Container) {
      ul.appendChild(item.render());
    }
  });

  return ul;
};

//второе задание
function SubMenu(id, className, items) {
  Menu.call(this, id, className, items);
}

SubMenu.prototype = Object.create(Menu.prototype);


function MenuItem(href, label, subItems) {
  Container.call(this, '', 'menu-item');

  this.href = href;
  this.label = label;
  this.subItems = subItems;
}

MenuItem.prototype = Object.create(Container.prototype);

MenuItem.prototype.render = function () {
  var li = document.createElement('li');
  var a = document.createElement('a');

  a.href = this.href;
  a.textContent = this.label;

  li.appendChild(a);
  li.className = this.className;

  //для 2го задания
  this.subItems.forEach(function (item) {
    if (item instanceof SubMenu) {
      li.appendChild(item.render());
    }
  });

  return li;
};

MenuItem.prototype.remove = function () {
  //получаем ссылку которую нужно удалить
  var removeElement = document.querySelector(`[href='${this.href}']`);

  // удаляем его вместе с пунктом li
  removeElement.parentNode.remove();
};