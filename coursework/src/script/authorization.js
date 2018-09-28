"use strict";

/**+
 * show authorization menu or hide it
 */
function buildAuthorizationForm() {
  if ($('div.authorization').length !== 0) {
    $('div.authorization').remove();
  } else {
    var $divAuthorization = $('<div />', {class: 'authorization'});
    $divAuthorization.append(
      $('<h3 />', {class: 'authorization__header'}).text('Sign in'),
      $('<p />', {class: 'authorization__text'}).text('Login'),
      $('<input />', {
        type: 'text',
        placeholder: 'Your login',
        id: 'login',
        class: 'authorization__input'
      }),
      $('<p />', {class: 'authorization__text'}).text('Password'),
      $('<input />', {
        type: 'password',
        placeholder: 'Your password',
        id: 'password',
        class: 'authorization__input'
      }),
      $('<div />', {class: 'authorization__btn_block'}).append(
        $('<a />', {
          class: 'authorization__btn',
          href: '#',
          text: 'Log in'
        }),
        $('<a />', {
          class: 'authorization__btn',
          href: '#',
          text: 'Cancel'
        })
      ),
      $('<div />', {class: 'authorization__btn_block'}).append(
        $('<a />', {
          class: 'authorization__hint',
          text: 'Forgot password?',
          href: '#'
        }),
        $('<a />', {
          class: 'authorization__hint',
          text: 'New user?',
          href: '#'
        })
        )
    );
    $('.header__flex-right').append($divAuthorization);

    //cancel
    $('.authorization__btn:last').click(function (event) {
      $('div.authorization').remove();
      event.preventDefault();
    });

    //login
    $('.authorization__btn:first').click(function (event) {
      checkInputs();
      event.preventDefault();
    });
  }
}

function checkInputs() {
  $('.warning').remove();
  var log = $('#login').val();
  var pass = $('#password').val();

  if (log && pass){

  } else {
    $('div.authorization').append(
      $('<p />', {class: 'warning'}).text('Please, input log and pass')
    );
  }

}