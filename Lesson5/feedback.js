"use strict";

/**
 * Функция создания подтвержденных отзывов
 */
function buildApproved() {
  var $approvedDiv = $('#approved');
  // Очищаем блок с подтверденными отзывами
  $approvedDiv.empty();

  // Отправляем запрос на получение списка подтвержденных отзывов
  $.ajax({
    url: 'http://localhost:3000/feedback',
    dataType: 'json',
    success: function (data) {

      // Перебираем отзывы
      data.forEach(function (item) {
        // Создаем div - элемент и содержимое
        if (item.status === 'approve') {
          var $div = $('<div />', {
            text: item.text,
            class: 'approved',
            'data-id': item.id,
          });
        }
        // Добавляем все в dom
        $approvedDiv.append($div);
      });
    }
  })
}

/**
 * Функция создания отзывов для модерации
 */
function buildNewFeedback() {
  var $addedDiv = $('#added');
  // Очищаем блок с подтверденными отзывами
  $addedDiv.empty();

  // Отправляем запрос на получение списка отзывов для модерации
  $.ajax({
    url: 'http://localhost:3000/feedback',
    dataType: 'json',
    success: function (data) {

      // Перебираем отзывы
      data.forEach(function (item) {
        // Создаем div - элемент и содержимое
        if (item.status === 'add') {
          var $div = $('<div />', {
            text: item.text,
          });
          //Создаем кнопки принять и отклонить отзыв
          var $btnApr = $('<button />', {
            text: 'Approve',
            class: 'btnApr approved',
            'data-id': item.id,
          });

          var $btnDcl = $('<button />', {
            text: 'Decline',
            class: 'btnDcl declined',
            'data-id': item.id,
          });

          $div.append($btnApr).append($btnDcl);
        }
        // Добавляем все в dom
        $addedDiv.append($div);
      });
    }
  })
}

/**
 * Функция создания отклоненных отзывов
 */
function buildDeclined() {
  var $declinedDiv = $('#declined');
  // Очищаем подтверденные комментарии
  $declinedDiv.empty();

  // Отправляем запрос на получение списка подтвержденных отзывов
  $.ajax({
    url: 'http://localhost:3000/feedback',
    dataType: 'json',
    success: function (data) {

      // Перебираем отзывы
      data.forEach(function (item) {
        // Создаем div - элемент и содержимое
        if (item.status === 'decline') {
          var $div = $('<div />', {
            text: item.text,
            class: 'declined',
            'data-id': item.id,
          });
        }
        // Добавляем все в dom
        $declinedDiv.append($div);
      });
    }
  })
};

/**
 * Функция запроса, которая подсчитывает количество отзывов
 * @param callback {function} функция в которой будет обрабатываться полученное количество
 */
function responseFeedback(callback) {
  var count = 0;
  $.ajax({
    url: 'http://localhost:3000/feedback',
    dataType: 'json',
    success: function (data) {
      count = data.length;
      callback(count);
    },
  });
}

/**
 * Рендерит все отзывы
 */
function render() {
  // Рисуем отзывы подтвержденные
  buildApproved();
  //Рисуем новые отзывы
  buildNewFeedback();
  //Рисуем отзывы отклоненные
  buildDeclined();
}

(function ($) {
  $(function () {
    render();

    //событие нажатия на кнопку Отправить отзыв
    $('body').on('click', '#submit', function () {
      var $newFeedback = $('#newFeedback');
      // Пробуем найти отзывы в db.json
      responseFeedback(function (numbFeedbacks) {
        if (numbFeedbacks === 0) {
          // Отзыв первый
          $.ajax({
            url: 'http://localhost:3000/feedback',
            type: 'POST',
            headers: {
              'content-type': 'application/json',
            },
            data: JSON.stringify({
              id: 1,
              text: $newFeedback.value,
              status: 'add',
            }),
            success: function () {
              // Перерисовываем отзывы для модерации
              buildNewFeedback();
            }
          })
        } else {
          // Отзыв не первый
          $.ajax({
            url: 'http://localhost:3000/feedback',
            type: 'POST',
            headers: {
              'content-type': 'application/json',
            },
            data: JSON.stringify({
              id: numbFeedbacks + 1,
              text: $newFeedback.val(),
              status: 'add',
            }),
            success: function () {
              // Перерисовываем отзывы для модерации
              buildNewFeedback();
            }
          })
        }
      });
    });

    $('#added').on('click', '.btnApr, .btnDcl', function () {
      //находим id элемента
      var $id = $(this).attr('data-id');
      $.ajax({
        url: 'http://localhost:3000/feedback/' + $id,
        type: 'PATCH',
        headers: {
          'content-type': 'application/json',
        },
        data: JSON.stringify({
          status: (this.className.search('btnApr') !== -1) ? 'approve': 'decline'
        }),
        success: function () {
          render();
        }
      });
    });
  });
})(jQuery);