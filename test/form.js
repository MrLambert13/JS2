"use strict";

var validation = {
  phone: /^\+7\(\d{3}\)\d{3}\-\d{4}$/,
  email: /^[-._a-z0-9]+@([a-z0-9][-a-z0-9]+\.)+[a-z]{2.6}$/i,
  name: /^\w{3,}$/
};

window.onload = function () {
  document.getElementById('submit').addEventListener('click', function (event) {
    Object.keys(validation).forEach(function (rule) {
      var fields = document.querySelectorAll('[data-validation-rule="' + rule + '"]');
      console.log(fields);
      fields.forEach(function (field) {
        if (validation[rule].test(field.value)) {
          field.classList.remove('invalid');
        } else {
          field.classList.add('invalid');
        }
      });
    });
    event.preventDefault();
  });
};