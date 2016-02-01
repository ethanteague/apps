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
          var game = $(j).attr("game").toUpperCase(),
          winnum = $(j).attr("winnum"),
          drawdate = $(j).attr("windd");
          thisObj = LottoGames.find({["date"]: Date(drawdate), ["title"]: "POWERBALL", ["_id"] : "8k2EsNJhYzavbBjcj"}).fetch(title);
          console.log(thisObj);
          title.push({
            "game": game,
            "winnum": winnum,
            "drawdate": drawdate
          });
          LottoGames.insert({title: game, date: new Date(drawdate), nums: winnum});

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
      }, 99991111111120000); // Poll every two minutes, set to 120 * 1000.

      return Session.get("games");
    }
  });
