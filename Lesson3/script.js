window.onload = function () {

  /**
   * Функция заменяет все однарные кавычки на двойные, кроме конструкции "n't" d аглоязычной верси.
   * @param text {string} Передаваемый иходный текст
   * @return {string} обработанный текст
   */
  function changeText(text) {
    return text.replace(/(?!=n)\'(?!t)/g, `"`);
  }

  document.getElementById('btn').addEventListener('click', function (event) {
    var left = document.getElementById('input');
    var right = document.getElementById('output');

    right.innerText = changeText(left.innerText);
  })

};