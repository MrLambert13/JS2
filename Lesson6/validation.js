"use strict";

/**
 * Объект отвечающий за валидацию
 * @property {string} nameHint - Подсказка для имени
 * @property {object} nameRegExp - Регулярное выражение для имени
 * @property {string} dateHint - Подсказка для имени
 * @property {object} dateRegExp - Регулярное выражение для имени
 * @property {string} telHint - Подсказка для телефона
 * @property {object} telRegExp - Регулярное выражение для номера телефона
 * @property {string} emailHint - Подсказка для пароля
 * @property {object} emailRegExp - Регулярное выражение для E-mail
 * @property {string} textHint - Подсказка для текста
 * @property {object} emailRegExp - Регулярное выражение для E-mail
 * @property {HTMLElement} elementForm - Форма в которой проходят проверки
 * @property {array} text - массив куда передаются все сообщения о валидации
 * @property {object} $dialogBox - диалоговое окно для валидации в DOM
 */
const params = {
  nameHint: 'Имя содержит только буквы.',
  nameRegExp: /^[A-Za-zА-Яа-яёЁ\s]+$/,
  telHint: 'Телефон подчиняется шаблону +7(000)000-0000',
  telRegExp: /^\+\d\(\d{3}\)\d{3}-\d{4}$/,
  dateHint: 'Дата должна быть в формате дд.мм.гггг',
  dateRegExp: /^\d{2}.\d{2}.\d{4}$/,
  emailHint: 'E-mail выглядит как mymail@mail.ru, или my.mail@mail.ru, или my-mail@mail.ru',
  emailRegExp: /^[a-z]{2}[\.-]?[a-z]{4}@mail.ru$/,
  textHint: 'Текст произвольный, но хотя бы 1 символ',
  textRegExp: /\w/,
  elementForm: document.querySelector('form.my-form'),
  text: [],
  $dialogBox: $('#dialog'),

  /**
   * Создание массива с подсказками валидации
   * @param {string} message - Сообщение подсказки
   */
  createHint(message) {
    var result = this.text.findIndex((elem) => {
      return (elem === message);
    });
    if (result === -1) {
      this.text.push(message);
    }
  },

  /**
   * Валидация поля ввода имени, при неверном вводе показать подсказку и подчеркнуть поле красным
   * @return {boolean} true если всё верно, false если нет
   */
  nameContainerCheck() {
    const elem = this.elementForm.querySelector('[name=name]');

    //очищаем выделение перед проверкой
    elem.classList.remove('warning');

    //проверяем условие
    if (this.nameRegExp.test(elem.value)) {
      return true;
    }
    $(elem).effect("bounce", "slow");
    //красная рамка у input
    elem.classList.add('warning');
    //создание сообщения под input
    this.createHint(this.nameHint);
  },

  /**
   * Валидация поля ввода телефона, при неверном вводе показать подсказку и подчеркнуть поле красным
   * @return {boolean} true если всё верно, false если нет
   */
  telContainerCheck() {
    const elem = this.elementForm.querySelector('[name=phone]');

    //очищаем подскази и выделение перед проверкой
    elem.classList.remove('warning');

    //проверяем условие
    if (this.telRegExp.test(elem.value)) {
      return true;
    }
    $(elem).effect("bounce", "slow");
    //красная рамка у input
    elem.classList.add('warning');
    //создание сообщения под input
    this.createHint(this.telHint);
  },

  /**
   * Валидация поля ввода E-mail, при неверном вводе показать подсказку и подчеркнуть поле красным
   * @return {boolean} true если всё верно, false если нет
   */
  emailContainerCheck() {
    const elem = this.elementForm.querySelector('[name=email]');
    //очищаем подскази и выделение перед проверкой
    elem.classList.remove('warning');
    //проверяем условие
    if (this.emailRegExp.test(elem.value)) {
      return true;
    }
    $(elem).effect("bounce", "slow");
    //красная рамка у input
    elem.classList.add('warning');
    //создание сообщения под input
    this.createHint(this.emailHint);
  },

  /**
   * Валидация текстового поля, при неверном вводе показать подсказку и подчеркнуть поле красным
   * @return {boolean} true если всё верно, false если нет
   */
  textContainerCheck() {
    const elem = this.elementForm.querySelector('[name=text]');
    //очищаем подскази и выделение перед проверкой
    elem.classList.remove('warning');
    //проверяем верно ли введен пароль
    if (this.textRegExp.test(elem.value)) {
      return true;
    }
    $(elem).effect("bounce", "slow");
    //красная рамка у input
    elem.classList.add('warning');
    //создание сообщения под input
    this.createHint(this.textHint);
  },

  /**
   * Валидация текстового поля, при неверном вводе показать подсказку и подчеркнуть поле красным
   * @return {boolean} true если всё верно, false если нет
   */
  dateContainerCheck() {
    const elem = this.elementForm.querySelector('[name=date]');
    //очищаем подскази и выделение перед проверкой
    elem.classList.remove('warning');
    //проверяем верно ли введены данные
    if (this.dateRegExp.test(elem.value)) {
      return true;
    }
    $(elem).effect("bounce", "slow");
    //красная рамка у input
    elem.classList.add('warning');
    //создание сообщения под input
    this.createHint(this.dateHint);
  },

  /**
   * Главная функция объекта
   * @param {object} event - событие которое произошло при нажатии на кнопку
   */

  mainCheck(event) {
    // очищаем валидацию из переменной
    this.text = [];
    //очищаем диалоговое окно от сообщений
    $(this.$dialogBox).empty();
    //проверяем имя
    var nameCheck = this.nameContainerCheck();
    //проверяем дату
    var dateCheck = this.dateContainerCheck();
    //проверяем телефон
    var telCheck = this.telContainerCheck();
    //проверяем пароль
    var emailCheck = this.emailContainerCheck();
    //проверяем повтор пароля
    var textConfirmCheck = this.textContainerCheck();

    //если все проверки верны заканчиваем функцию и продолжаем отправку формы, иначе останавливаем действие браузера по умолчанию
    if (nameCheck && telCheck &&
      emailCheck && textConfirmCheck && dateCheck) {
      return;
    } else {
      event.preventDefault();
      //показываем диалог для валидатора
      this.text.forEach((value) => this.$dialogBox.append($('<p />').text(value)));
    }
    this.$dialogBox.dialog({
      width: 500,
      dialogClass: "no-close",
      buttons: [
        {
          text: "OK",
          click: function () {
            $(this).dialog("close");
          }
        }
      ]
    });
    this.$dialogBox.dialog("open");
  },
};

(function ($) {
  $(function () {
    // делаем ввод даты через jQuery UI
    $('[name="date"]').datepicker(
      {
        monthNames: [
          "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
          "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"
        ],
        dayNamesMin: [
          "Вс", "Пн", "Вт", "Ср",
          "Чт", "Пт", "Сб"
        ],
        firstDay: 1,
        dateFormat: "dd.mm.yy"
      });
    //скрываем диалоговое окно
    $("#dialog").dialog({autoOpen: false});


    //вещаем слушателя событий на отправку формы
    params.elementForm.addEventListener('submit', (event) => params.mainCheck(event));
  });
})(jQuery);
