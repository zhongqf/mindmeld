Template.signIn.helpers({
});

Template.signIn.rendered = function() {
  $(document).ready(function() {
    $('#usernameOrEmail').focus();
  });
}

Template.signIn.events({
  'focus #usernameOrEmail': function(event) {
    $('#usernameGroup').removeClass('error');
    $('#usernameOrEmailNotFound').hide();
  },
  'focus #password': function(event) {
    $('#passwordGroup').removeClass('error');
    $('#passwordIncorrect').hide();
  },
  'click #signIn': function(event) {

    event.preventDefault();
    $('#waiting').show();
    $('#signIn').addClass('disabled');


    var usernameOrEmail = $('#usernameOrEmail').val();
    var password = $('#password').val();

    if ($('#signInCredentials').parsley().validate()) { 
      Meteor.loginWithPassword(usernameOrEmail, password, function(error) {
        event.preventDefault();
        $('#waiting').hide();
        if (error) {
          $('#signIn').removeClass('disabled');
          if (error.error == 403 && error.reason == "User not found") {
            $('#usernameOrEmailNotFound').show();
            $('#usernameGroup').addClass('error');
          }
          if (error.error == 403 && error.reason == "Incorrect password") {
            $('#passwordIncorrect').show();
            $('#passwordGroup').addClass('error');
          }
          return;
        }

        var redir = SessionAmplify.get('redir');
        if (redir) {
          SessionAmplify.set('redir', null);
          window.location.replace(redir);
        } else {
          window.location.replace(Router.path('home'));
        }

      });
    }
  }
});
