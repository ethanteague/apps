  // Startup
  Meteor.startup(function() {
    BlazeLayout.setRoot("body");
  })


  // Templates
  Template.pollGrab.helpers({
    data: function() {
      var title = [];
      Meteor.setInterval(function() {
        Meteor.call("stream", function(err, res) {
          xml = $.parseXML(res.content),
            xml = $(xml);
          xml.find("item").each(function(i, j) {
            if ($(j).attr("winnum") && $(j).attr("windd")) {
              game = $(j).attr("game").toUpperCase();
              winnum = $(j).attr("winnum");
              drawdate = $(j).attr("windd");
              title.push({
                "game": game,
                "winnum": winnum,
                "drawdate": drawdate
              });
            }
          });
          Session.set("games", title);
        });
      }, 120000); // Poll every two minutes.
      return Session.get("games");
    }
  });
