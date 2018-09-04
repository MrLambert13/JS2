"use strict";

/**
 * Класс галареи, который создает под превью див, само превью в виде <img> вставляет в тег <a>
 * @param path_prev {string} путь к картинке превьюшке
 * @param path_img_url {string} путь к полноразмерной картинке
 */
function Gallery(path_prev, path_img_url) {
  var pathPrev;
  var pathImg;

  function setPathPrev() {
    pathPrev = path_prev;
  }

  function setPathImgUrl() {
    pathImg = path_img_url;
  }

  function getPathPrev() {
    return pathPrev;
  }

  function getPathImgUrl() {
    return pathImg;
  }

  function init() {
    setPathImgUrl();
    setPathPrev();
  }

  this.run = function () {
    init();
    var div = document.createElement('div');
    div.className = 'imgPrev';
    var a = document.createElement('a');
    a.href = getPathImgUrl();
    var img = document.createElement('img');
    img.src = getPathPrev();
    a.appendChild(img);
    a.className = 'a';
    div.appendChild(a);
    return div;
  }
}

window.onload = function () {
  document.getElementById('gallery').addEventListener('click', function (event) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://localhost:3000/gallery');
    xhr.send();
    xhr.onreadystatechange = function () {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        var galleryArr = JSON.parse(xhr.responseText);

        var main = document.createElement('div');
        main.className = 'div';

        galleryArr.forEach(function (item) {
          var galleryElem = new Gallery(item.path_prev, item.path_img_url);
          main.appendChild(galleryElem.run());
        });

        document.body.appendChild(main);
      }
    }
  })
};