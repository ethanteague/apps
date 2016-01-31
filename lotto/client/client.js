  // Startup
  Meteor.startup(function() {
    BlazeLayout.setRoot("body");
  })

  // Subscriptions
  Tracker.autorun(function() {
    Meteor.subscribe('LottoGames');
  });

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
          LottoGames.insert({title: game, date: drawdate, nums: winnum});
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
      }, 1111111120000); // Poll every two minutes, set to 120000.

      return Session.get("games");
    }
  });
