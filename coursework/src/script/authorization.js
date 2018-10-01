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

    //button cancel
    $('.authorization__btn:last').click(function (event) {
      $('div.authorization').remove();
      event.preventDefault();
    });

    //button login
    $('.authorization__btn:first').click(function (event) {
      checkInputs();
      event.preventDefault();
    });
  }
}

/**
 * Check inputs, for registration
 */
function checkInputs() {
  $('.warning').remove();
  var log = $('#login').val();
  var pass = $('#password').val();

  if (log && pass) {
    getUserFromDB(function (user, password) {
      var findUser = false;
      if (log === user && pass === password) {
        findUser = true;
      }
      if (!findUser) {
        addWarning('Login/password incorrect')
      }

    });
  } else {
    addWarning('Please, input log and pass');
  }

}

/**
 * Registration for new users
 * @param userLogin {string} - login
 * @param userPassword - password
 */
function addToUsersDB(userLogin, userPassword) {
  var currentCart = null;
  getCurrentCart(function (cart) {
    currentCart = cart;
    console.log(currentCart);
  });
  console.log(currentCart);

  /*$.ajax({
    url: 'http://localhost:3000/users',
    type: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    data: JSON.stringify({
      login: userLogin,
      pass: userPassword,
      policy: 'users',
    }),
  })*/
}

/**
 * Add warning message in login window
 * @param text {string} - warning text for show
 */
function addWarning(text) {
  $('div.authorization').append(
    $('<p />', {class: 'warning'}).text(text)
  );
}

/**
 * Get login from DB and give to callback it
 * @param callback {function} - function where do some action with login
 */
function getUserFromDB(callback) {
  $.ajax({
    url: 'http://localhost:3000/users',
    dataType: 'json',
    success: function (users) {
      users.forEach(function (user) {
        callback(user.login, user.pass);
      });
    }
  });
}

/**
 * Get current cart, when user registration (else cart is be lost)
 * @param callback {function} - for work with cart
 */
function getCurrentCart(callback) {
  $.ajax({
    url: 'http://localhost:3000/cart',
    dataType: 'json',
    success: function (data) {
      callback(data);
    }
  });
}