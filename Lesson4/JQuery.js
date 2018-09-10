"use strict";

/**
 * Получает даные с JSON сервера и возвращает нужный текст в зависимости от переданного значения
 * @param idTarget {int} - id обекта который ищем на json сервере
 * @param callback {function} - фунеция которую будем выполнять после выполнения запроса
 */
function getJsonText(idTarget, callback) {
  var result;
  $.ajax({
    url: 'http://localhost:3000/texts',
    dataType: "json",
    success: function (data) {
      $.each(data, function (i, val) {
        //ес
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
    //вешаем события на все вкладки
    $('#tabs').on('click', '.tab', function (event) {
      //для всех вкладок удаляем класс который отвечает за "активную" вкладку
      $.each($('.tab'), function (i, val) {
        val.classList.remove('active');
      });
      //делаем выбранную вкладку "активной"
      event.target.classList.add('active');

      //Заполняем содержимое div в соответствии с выбранной вкладкой
      getJsonText(+event.target.dataset.id, function (result) {
        $('.text')[0].innerText = result;
      });

    });
  });
})(jQuery);

