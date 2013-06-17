Template.team.helpers(Meteor.userFunctions);
Template.createProject.helpers(Meteor.userFunctions);
Template.teamHeader.helpers(Meteor.userFunctions);
Template.teamBody.helpers(Meteor.userFunctions);

Template.teamBody.events({
  'click #createProject': function(event) {
    event.preventDefault();
    Meteor.Router.to('createProject', 
      this.code);
  }
});