  // Startup
  Meteor.startup(function() {
    BlazeLayout.setRoot("body");
  })


  // Templates
  Template.pollGrab.helpers({
    data: function() {
      var title = [];
      Meteor.call('stream', function(err, res) {
        var xml = $.parseXML(res.content),
        xml = $(xml);
        xml.find('description').each(function() {
          title.push(this.innerHTML);
        });
        Session.set('games', title);
        console.log(title[0]);
      });
      return Session.get('games');
    }
  });
