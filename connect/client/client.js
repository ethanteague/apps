  // Startup
  Meteor.startup(function() {
    BlazeLayout.setRoot('body');

    GoogleMaps.load({
      key: 'AIzaSyDR8HrQIgHJjeMd8kutTczttCsMiDHhbL8', // optional, could be loaded via Meteor.settings.public.GOOGLE_MAP_API
      libraries: 'places' // can be an array
    });
  });

  // Subscriptions
  Tracker.autorun(function() {
    Meteor.subscribe('Directory');
    Meteor.subscribe('Events');
  });

  // Templates
  Template.eventOutput.helpers({
    invites: function() {
      var filtered = [];
      eventsFind = Events.find().fetch();
      var loggedUser = Meteor.userId();
      eventsFind.forEach(function(element) {
        element.users.forEach(function(e) {
          if (loggedUser == e.id) {
            filtered.push(element);
          }
        })
      });
      return filtered;
    },
    invitations: function() {
      var mine = [];
      mineFind = Events.find().fetch();
      var mineUser = Meteor.userId();
      mineFind.forEach(function(thing) {
        if (mineUser == thing.creator) {
          mine.push(thing);
        }
      });
      return mine;
    },


  });

  Template.userDir.helpers({
    name: function() {
      return Meteor.users.find().fetch();
    },
  });

  Template.userName.helpers({
    currentUser: function() {
      return Meteor.user();
    }
  });

  Template.register.events({

    'submit #register-form': function(e, t) {
      e.preventDefault();
      // retrieve the input field values
      var email = t.find('#register-email').value,
        password = t.find('#register-password').value,
        first = t.find('#register-first').value,
        last = t.find('#register-last').value;
      // Trim and validate your fields here....

      // If validation passes, supply the appropriate fields to the
      // Meteor.loginWithPassword() function.
      Accounts.createUser({
        email: email,
        password: password,
        firstName: first,
        lastName: last
      }, function(err) {
        if (err) {
          alert('Something is not right');
        }
        // The user might not have been found, or their passwword
        // could be incorrect. Inform the user that their
        // login attempt has failed.
        else {
          Meteor.loginWithPassword(email, password);
        }
        // The user has been logged in.
      });

      return false;
    },

    'submit #login-form': function(e, t) {
      e.preventDefault();

      var email = t.find('#login-email').value,
        password = t.find('#login-password').value;
      // retrieve the input field values
      Meteor.loginWithPassword(email, password);
      return false;
    }

  });
