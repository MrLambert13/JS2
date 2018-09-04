"use strict";

function Gallery () {

}

window.onload = function () {
  document.getElementById('gallery').addEventListener('click', function (event) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://localhost:3000/gallery');
    xhr.send();
    xhr.onreadystatechange = function () {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        var galleryArr = JSON.parse(xhr.responseText);

        console.log(galleryArr);
        galleryArr.forEach(function (item) {
          var div = document.createElement('div');
          div.className = 'div';
          var a = document.createElement('a');
          a.href = item.path_img_url;
          var img = document.createElement('img');
          img.src = item.path_prev;
          a.appendChild(img);
          a.className = 'a';
          div.appendChild(a)
          document.body.appendChild(div);
        });

      }
    }
  })
};