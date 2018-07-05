$(document).ready(function () {

  $("#formValidate").validate({
    rules: {
      firstname: {
        required: true,
        minlength: 5
      },
      lastname: {
        required: true,

      },
      username: {
        required: true,
        minlength: 5
      },
      password: {
        required: true,
        minlength: 5
      },
      cpassword: {
        required: true,
        minlength: 5,
        equalTo: "#password"
      },
    },
    //For custom messages
    messages: {
      firstname: {
        required: "Enter a username",
        minlength: "Enter at least 5 characters"
      },

    },
    errorElement: 'div',
    errorPlacement: function (error, element) {
      var placement = $(element).data('error');
      if (placement) {
        $(placement).append(error)
      } else {
        error.insertAfter(element);
      }
    }
  });

});