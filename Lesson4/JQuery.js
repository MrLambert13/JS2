"use strict";

/**
 * Получает даные с JSON сервера и возвращает нужный текст в зависимости от переданного значения
 * @param idTarget {int} - id обекта который ищем на json сервере
 * @param callback {function} - фунеция которую будем выполнять после выполнения запроса
 */
function getJsonText(url, idTarget, callback) {
  var result;
  $.ajax({
    url: url,
    dataType: "json",
    success: function (data) {
      $.each(data, function (i, val) {
          if (val.id === idTarget) {
            result = val.text;
          }
        }
      );
      callback(result);
    }
  });
}

(function ($) {


  $(function () {
    //Первое задание
    //вешаем события на все вкладки
    $('#tabs').on('click', '.tab', function (event) {
      //для всех вкладок удаляем класс который отвечает за "активную" вкладку
      $.each($('.tab'), function (i, val) {
        val.classList.remove('active');
      });
      //делаем выбранную вкладку "активной"
      event.target.classList.add('active');

      //Заполняем содержимое div в соответствии с выбранной вкладкой
      getJsonText('http://localhost:3000/texts', +event.target.dataset.id, function (result) {
        $('.text')[0].innerText = result;
      });
    });

    //второе задание
    //получаем нужный элемент DOM
    var cityInput = $('select[name="city"]')[0];
    //получаем список городов дл заполнени
    $.ajax({
      url: 'http://localhost:3000/city',
      dataType: "json",
      //заполнем выпадающий список данными с json сервера
      success: function (data) {
        $.each(data, function (i, val) {
          var opt = document.createElement('option');
          $(opt).attr('value', val).text(val);
          cityInput.appendChild(opt);
        });
      }
    });
    $(cityInput).click(function (event) {
      console.log($(cityInput).val());
    });
  });

})(jQuery);

