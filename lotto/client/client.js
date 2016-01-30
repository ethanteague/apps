  // Startup
  Meteor.startup(function() {
    BlazeLayout.setRoot("body");
  })


  // Templates
  Template.pollGrab.helpers({
    data: function() {
      var title = [],
        game = [],
        winnum = [],
        drawdate = [];

      Meteor.call("stream", function(err, res) {
        var xml = $.parseXML(res.content),
          xml = $(xml);
        xml.find("item").each(function(i, j) {
          game = {
            "game": $(j).attr("game")
          };
          winnum = {
            "winnum": $(j).attr("winnum")
          };
          drawdate = {
            "drawdate": $(j).attr("windd")
          };
          title.push(game, winnum, drawdate);
        });
        Session.set("games", title);
        console.log(title);
      });
      return Session.get("games");
    }
  });
