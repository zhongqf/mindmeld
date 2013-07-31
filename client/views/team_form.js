Template.createTeam.helpers(Meteor.userFunctions);
Template.editTeam.helpers(Meteor.userFunctions);
Template.teamForm.helpers(_.extend(_.clone(Meteor.userFunctions), Meteor.formFunctions));

Template.teamForm.events({
  'click #delete': function(event) {
    event.preventDefault();

    var teamId = $(document).find('[name=_id]').val();

    Meteor.call('deleteTeam', teamId, function(error) {
      if (error) {
        Meteor.Errors.throw(error.reason);
        //TOO: handle errors in notifications
      } else {
        Meteor.Router.to('home');
      }
    })
  },
  'click #create': function(event) {
    event.preventDefault();

    var team = {
      name: $(document).find('[name=name]').val(),
      detail: $(document).find('[name=detail]').val()
    }

    Meteor.call('createTeam', team, function(error, team) {
      if (error) {
        //TODO: handle errors in notifications
        Meteor.Errors.throw(error.reason);
        //if team already exists, go there
        if (error.error == 302)
          Meteor.Router.to('team', error.details)
      } else {
        var notificationAttributes = {
          entity: 'team',
          action: 'create',
          team: team
        };

        Meteor.call('createTeamNotification', notificationAttributes, function(error) {
          if (error) {
            console.log(error);
            //TODO: handle errors in notifications    
          }
          Meteor.Router.to('team', team.code);
        });      
      }
    });
  },
  'click #edit': function(event) {
    event.preventDefault();

    var team = {
      _id: $(document).find('[name=_id]').val(),
      name: $(document).find('[name=name]').val(),
      detail: $(document).find('[name=detail]').val()
    }

    Meteor.call('editTeam', team, function(error, team) {
      if (error) {
        //TODO: handle errors in notifications
        Meteor.Errors.throw(error.reason);
      } else {
        Meteor.Router.to('team', team.code);
      }
    });
  },
  'click #cancel': function(event) {
    event.preventDefault();
    var teamId = $(document).find('[name=_id]').val();
    var team = Teams.findOne(teamId);
    Meteor.Router.to('team',
      team.code);
  }
});