  // Startup
  Meteor.startup(function() {
    BlazeLayout.setRoot("body");
  })

  // Grab our results.
  function callLotto() {
    var title = [];
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
  }

  // Templates
  Template.pollGrab.helpers({
    data: function() {
      callLotto(); // Need to initiate on page load.
      Meteor.setInterval(function() {
        callLotto();
      }, 20000); // Poll every two minutes.
      return Session.get("games");
    }
  });
