"use strict";

/**
 * Объект отвечающий за валидацию
 * @property {string} nameHint - Подсказка для имени
 * @property {object} nameRegExp - Регулярное выражение для имени
 * @property {string} telHint - Подсказка для телефона
 * @property {object} telRegExp - Регулярное выражение для номера телефона
 * @property {string} emailHint - Подсказка для пароля
 * @property {object} emailRegExp - Регулярное выражение для E-mail
 * @property {string} textHint - Подсказка для текста
 * @property {object} emailRegExp - Регулярное выражение для E-mail
 * @property {HTMLElement} elementForm - Форма в которой проходят проверки
 */
const params = {
  nameHint: 'Имя содержит только буквы.',
  nameRegExp: /[A-Za-zА-Яа-яёЁ]/,
  telHint: 'Телефон подчиняется шаблону +7(000)000-0000',
  telRegExp: /+\d\(\d{3}\)\d{3}-\d{d}/,
  emailHint: 'E-mail выглядит как mymail@mail.ru, или my.mail@mail.ru, или my-mail@mail.ru',
  emailRegExp: /someRegExp/, //TODO RegExp
  textHint: 'Текст произвольный, но хотя бы 1 символ',
  textRegExp: /\w/,
  elementForm: document.querySelector('form'),

  /**
   * Создание подсказки
   * @param {string} message - Сообщение подсказки
   * @return {HTMLElement} - элемент который мы добавляем в DOM
   */
  createHint(message) {
    //создаем тег div
    const div = document.createElement('div');
    //В текст ставим подсказку
    div.textContent = message;
    //делаем стиль тексту
    div.classList.add('warningText');
    return div;
  },

  /**
   * Удаление подсказки
   * @param {object} elem - Элемент к которому подсказку нужно удалить
   */
  removeHint(elem) {
    //в моем коде 1й элемент HTML collection это и есть подсказка, так то бы конечно искать послений элемент надо
    const hint = elem.parentElement.children[1];
    //Если есть такой элемент удаляем
    if (hint) {
      hint.remove();
    }
  },

  /**
   * Валидация поля ввода имени, при неверном вводе показать подсказку и подчеркнуть поле красным
   * @return {boolean} true если всё верно, false если нет
   */
  nameContainerCheck() {
    const elem = this.elementForm.querySelector('[name=name]');

    //очищаем подскази и выделение перед проверкой
    this.removeHint(elem);
    elem.classList.remove('warning');

    //проверяем условие
    return this.nameRegExp.test(elem.value)

    //красная рамка у input
    elem.classList.add('warning');
    //создание сообщения под input
    elem.parentElement.appendChild(this.createHint(this.nameHint));
    return; //TODO
  },

  /**
   * Валидация поля ввода телефона, при неверном вводе показать подсказку и подчеркнуть поле красным
   * @return {boolean} true если всё верно, false если нет
   */
  telContainerCheck() {
    const elem = this.elementForm.querySelector('[name=phone]');

    //очищаем подскази и выделение перед проверкой
    this.removeHint(elem);
    elem.classList.remove('warning');

    //проверяем условие
    if (elem.value.length === 11 && Number.isInteger(+elem.value)) {
      return true;
    }
    //красная рамка у input
    elem.classList.add('warning');
    //создание сообщения под input
    elem.parentElement.appendChild(this.createHint(this.telHint));

    return;
  },

  /**
   * Валидация поля ввода пароля, при неверном вводе показать подсказку и подчеркнуть поле красным
   * @return {boolean} true если всё верно, false если нет
   */
  passContainerCheck() {
    const elem = this.elementForm.querySelector('[name=password]');
    //очищаем подскази и выделение перед проверкой
    this.removeHint(elem);
    elem.classList.remove('warning');
    //проверяем условие
    if (elem.value.length > 4 && elem.value.length < 51) {
      return true;
    }
    //красная рамка у input
    elem.classList.add('warning');
    //создание сообщения под input
    elem.parentElement.appendChild(this.createHint(this.passHint));

    return;
  },

  /**
   * Валидация поля повтора пароля, при неверном вводе показать подсказку и подчеркнуть поле красным
   * @param {boolean} passIsTrue - Если пароль прошел валидацию, проверяем повтор пароля, иначе сразу подчеркиваем
   * @return {boolean} true если всё верно, false если нет
   */
  passConfirmContainerCheck(passIsTrue) {
    const elem = this.elementForm.querySelector('[name=passwordConfirm]');
    //очищаем подскази и выделение перед проверкой
    this.removeHint(elem);
    elem.classList.remove('warning');
    //проверяем верно ли введен пароль
    if (passIsTrue) {
      //получаем что введено в пароль
      const pass = this.elementForm.querySelector('[name=password]');
      //проверяем условие
      if (elem.value === pass.value) {
        return true;
      }
    }
    //красная рамка у input
    elem.classList.add('warning');
    //создание сообщения под input
    elem.parentElement.appendChild(this.createHint(this.passConfirmHint));
    return;
  },

  /**
   * Главная фунеция объекта
   * @param {object} event - событие которое произошло при нажатии на кнопку
   */
  mainCheck(event) {
    //проверяем имя
    let nameCheck = this.nameContainerCheck();
    //проверяем телефон
    let telCheck = this.telContainerCheck();
    //проверяем пароль
    let passCheck = this.passContainerCheck();
    //проверяем повтор пароля
    let passConfirmCheck = this.passConfirmContainerCheck(passCheck);

    //если все проверки верны заканчиваем функцию и продолжаем отправку формы, иначе останавливаем действие браузера по умолчанию
    if (nameCheck && telCheck &&
      passCheck && passConfirmCheck) {
      return;
    } else {
      event.preventDefault();

    }
  },
};

//вещаем слушателя событий на отправку формы
params.elementForm.addEventListener('submit', (event) => params.mainCheck(event));

for (const param of this.mapValues[row]) {
  value += param;
}
return value === "XXX" || value === "000";