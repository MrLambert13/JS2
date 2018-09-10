"use strict";

function getJsonText(idTarget, callback) {
  var result;
  $.ajax({
    url: 'http://localhost:3000/texts',
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
    $('#tabs').on('click', '.tab', function (event) {
      getJsonText(+event.target.dataset.id, function (result) {
        $('.text')[0].innerText = result.toString();
      });
    });
  });
})(jQuery);

