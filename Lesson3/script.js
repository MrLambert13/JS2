window.onload = function () {

  function changeText(text) {
    return text.replace(/\'/g, `"`);
  }

  document.getElementById('btn').addEventListener('click', function (event) {
    var left = document.getElementById('input');
    var right = document.getElementById('output');

    right.innerText = changeText(left.innerText);
  })

};