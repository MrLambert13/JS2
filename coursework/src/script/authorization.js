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
          href: '#',
          id: 'createUser'
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
    //new user click
    $('#createUser').click(function (event) {
      buildMenuregistration();
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
    getUserFromDB(function (users) {
      var userFind = false;
      users.forEach(function (oneUser) {
        if (oneUser.login === log && oneUser.pass === pass) {
          userFind = true;
          //set cookie for user login, pass ann ID
          setCookie('userId', oneUser.id);
          setCookie('userLogin', oneUser.login);
          setCookie('userPassword', oneUser.pass);
          setCookie('userGroup', oneUser.policy);
          checkCoockieForUserName();
        }
      });
      if (!userFind) {
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
  // TODO something :D
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
      callback(users);
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

/**
 * Check if user already authorized
 */
function checkCoockieForUserName() {
  var $accountButton = $('.headerRight__account');
  $accountButton.unbind('click');
  //close Sign in window
  $('.authorization').remove();
  if (!getCookie('userLogin')) {
    //set account text standart
    $accountButton.text('My Account ').append($('<i />', {class: 'fas fa-caret-down'}));
    //add event for authorization
    $accountButton.click(function (event) {
      buildAuthorizationForm();
      event.preventDefault();
    });
  } else {
    $accountButton.text('Hello, ' + getCookie('userLogin'));
    $accountButton.click(function (event) {
      buildMenuUser();
      event.preventDefault();
    });
  }
}

/**
 * Build menu for change profile and logout
 */
function buildMenuUser() {
  if ($('div.authorization').length !== 0) {
    $('div.authorization').remove();
  } else {
    var $divUserMenu = $('<div />', {class: 'authorization'});
    $divUserMenu.append(
      $('<div />', {class: 'flex-jcsb'}).append(
        //left column with name of properties
        $('<div />', {class: 'divNameOfProp'}).append(
          $('<p />', {class: 'propName'}).text('Name:'),
          $('<p />', {class: 'propName'}).text('Password:'),
          $('<p />', {class: 'propName'}).text('E-mail:'),
          $('<p />', {class: 'propName'}).text('Gender:'),
          $('<p />', {class: 'propName'}).text('Credit card:'),
          $('<p />', {class: 'propName'}).text('About:')
        ),
        //right column with value of properties
        $('<div />', {class: 'divValueOfProp'}).append(
          $('<p />', {class: 'propValue', id: 'log'}),
          $('<p />', {class: 'propValue', id: 'pass'}),
          $('<p />', {class: 'propValue', id: 'email'}),
          $('<p />', {class: 'propValue', id: 'gender'}),
          $('<p />', {class: 'propValue', id: 'creditCard'}),
          $('<p />', {class: 'propValue', id: 'bio'})
        )
      ),
      $('<div />', {class: 'flex-jcsa'}).append(
        $('<a />', {class: 'authorization__btn', id: 'multiBtnLeft'}).text('Exit'),
        $('<a />', {class: 'authorization__btn', id: 'multiBtnRight'}).text('Change')
      )
    );

    //fill value
    var log = getCookie('userLogin');
    var pass = getCookie('userPassword');
    getUserFromDB(function (users) {
      users.forEach(function (thisUser) {
        if (thisUser.login === log && thisUser.pass === pass) {
          $('#log').text(thisUser.login);
          $('#pass').text(thisUser.pass);
          $('#email').text(thisUser.email);
          $('#gender').text(thisUser.gender);
          $('#creditCard').text(thisUser.creditCard);
          $('#bio').text(thisUser.bio);
        }
      });
    });

    //add main div in DOM
    $('.header__flex-right').append($divUserMenu);

    //feedback button for admin
    if (getCookie('userGroup') === 'admins') {
      console.log($('#multiBtnLeft'));
      $('#multiBtnLeft').after(
        $('<a />', {class: 'authorization__btn', id: 'btnFeedback', ref: 'feedback.html'})
          .text('Feedback')
      );
    }

    //click exit
    if ($('#multiBtnLeft').text() === 'Exit') {
      $('#multiBtnLeft').click(function (event) {
        //do logout
        deleteCookie('userId');
        deleteCookie('userLogin');
        deleteCookie('userPassword');
        deleteCookie('userGroup');
        checkCoockieForUserName();
      });
    }
    //click change
    if ($('#multiBtnRight').text() === 'Change') {
      $('#multiBtnRight').click(function () {
        var $divValue = $('.divValueOfProp');
        //do change profile
        // convertTextToInput('#log');
        for (var key in $divValue.children()) {
          convertTextToInput('#' + $divValue.children()[key].id);
        }
        //delete eventlistener
        //change button to save and cancel
        changeMultiButton();
      });
    }
  }
}

/**
 * Build menu for change profile and logout
 */
function buildMenuregistration() {
  $('div.authorization').remove();
  var $divUserMenu = $('<div />', {class: 'authorization'});
  $divUserMenu.append(
    $('<div />', {class: 'flex-jcsb'}).append(
      //left column with name of properties
      $('<div />', {class: 'divNameOfProp'}).append(
        $('<p />', {class: 'propName'}).text('Name:'),
        $('<p />', {class: 'propName'}).text('Password:'),
        $('<p />', {class: 'propName'}).text('E-mail:'),
        $('<p />', {class: 'propName'}).text('Gender:'),
        $('<p />', {class: 'propName'}).text('Credit card:'),
        $('<p />', {class: 'propName'}).text('About:')
      ),
      //right column with value of properties
      $('<div />', {class: 'divValueOfProp'}).append(
        $('<input />', {class: 'propValue', id: 'log'}),
        $('<input />', {class: 'propValue', id: 'pass'}),
        $('<input />', {class: 'propValue', id: 'email'}),
        $('<input />', {class: 'propValue', id: 'gender'}),
        $('<input />', {class: 'propValue', id: 'creditCard'}),
        $('<input />', {class: 'propValue', id: 'bio'})
      )
    ),
    $('<div />', {class: 'flex-jcsa'}).append(
      $('<a />', {class: 'authorization__btn', id: 'multiBtnLeft'}).text('Exit'),
      $('<a />', {class: 'authorization__btn', id: 'multiBtnRight'}).text('Create')
    )
  );
  //add main div in DOM
  $('.header__flex-right').append($divUserMenu);
  //click exit
  if ($('#multiBtnLeft').text() === 'Exit') {
    $('#multiBtnLeft').click(function (event) {
      $('div.authorization').remove();
    });
  }
  //click save
  if ($('#multiBtnRight').text() === 'Create') {
    $('#multiBtnRight').click(function () {
      $.ajax({
        url: 'http://localhost:3000/users',
        type: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        data: JSON.stringify({
          login: $('#log').val(),
          pass: $('#pass').val(),
          email: $('#email').val(),
          gender: $('#gender').val(),
          creditCard: $('#creditCard').val(),
          bio: $('#bio').val(),
          cart: []
        }),
        success: function (data) {
          setCookie('userId', data.id);
          setCookie('userLogin', data.login);
          setCookie('userPassword', data.pass);
          setCookie('userGroup', data.policy);
          $('div.authorization').remove();
          checkCoockieForUserName();
        }
      });
    });
  }
}

/**
 * change button when user want to change self profile
 */
function changeMultiButton() {
  var $right = $('#multiBtnRight');
  var $left = $('#multiBtnLeft');

  $right.unbind();
  $right.text('Cancel');


  $left.unbind();
  $left.text('Save');
  $left.addClass('btn_save');

  //click on cancel button
  $right.click(function () {
    $('div.authorization').remove();
  });
  //click on save button
  $left.click(function () {
    //save change, change cookie, check cookie
    var id = getCookie('userId');
    $.ajax({
      url: 'http://localhost:3000/users/' + id,
      type: 'PATCH',
      headers: {
        'content-type': 'application/json',
      },
      data: JSON.stringify({
        login: $('#log').val(),
        pass: $('#pass').val(),
        email: $('#email').val(),
        gender: $('#gender').val(),
        creditCard: $('#creditCard').val(),
        bio: $('#bio').val()
      }),
      success: function () {
        deleteCookie('userLogin');
        deleteCookie('userPassword');
        setCookie('userLogin', $('#log').val());
        setCookie('userPassword', $('#pass').val());
        $('div.authorization').remove();
        checkCoockieForUserName();
      }
    });
  });
}

/**
 * change p to input
 * @param idText {string} - id of element
 */
function convertTextToInput(idText) {
  var currentVal = $(idText).text();
  //replace text on input
  var $newInput = $('<input />', {id: idText.slice(1), value: currentVal});
  $(idText).replaceWith($newInput);
}

/**
 * Search in cookie user login
 * @param name {string} - User login for search
 * @return {any} - undefined if not found name user, or return it's name
 */
function getCookie(name) {
  var matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

/**
 * Save data in cookies
 * @param name {string} - name for data save
 * @param value {string} - value this data
 * @param options {object} - advanced option for cookie
 */
function setCookie(name, value, options) {
  options = options || {};
  var expires = options.expires;

  if (typeof expires === "number" && expires) {
    var d = new Date();
    d.setTime(d.getTime() + expires * 1000);
    expires = options.expires = d;
  }
  if (expires && expires.toUTCString) {
    options.expires = expires.toUTCString();
  }
  //secure value
  value = encodeURIComponent(value);

  var updatedCookie = name + "=" + value;

  for (var propName in options) {
    updatedCookie += "; " + propName;
    var propValue = options[propName];
    if (propValue !== true) {
      updatedCookie += "=" + propValue;
    }
  }
  document.cookie = updatedCookie;
}

/**
 * Function for delete cookie with "name", over change date
 * @param name {string} - name of cookie
 */
function deleteCookie(name) {
  setCookie(name, "", {
    expires: -1
  })
}