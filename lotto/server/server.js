
//inside a meteor method
Meteor.methods({
  "stream": function(){
    // For launch set to http://www.flalottery.com/video/en/theWinningNumber.xml.
    var Stream = HTTP.get("http://virtualputty.com/test/sample.xml");
    return Stream;
  }
});

var games = new Mongo.Collection("games");
games.allow({
  insert: function(){
    return true;
  },
  update: function(){
    return true;
  },
  remove: function(){
    return true;
  }
});
