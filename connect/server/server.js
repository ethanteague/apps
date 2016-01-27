Meteor.publish('Events', function() {
  return Events.find();
})

Meteor.publish('Directory', function () {
   return Meteor.users.find({}, {fields: {username: 1, emails: 1, profile: 1}})
});
/*
Meteor.startup(function() {
  UploadServer.init({
    tmpDir: process.env.PWD + '/uploads/tmp',
    uploadDir: process.env.PWD + '/uploads/',
    checkCreateDirectories: true, //create the directories for you
  });
});
*/
Accounts.onCreateUser(function(options, user) {
   // Use provided profile in options, or create an empty object
   user.profile = options.profile || {};
   // Assigns first and last names to the newly created user object
   user.profile.firstName = options.firstName;
   user.profile.lastName = options.lastName;
   // Returns the user object
   return user;
});
