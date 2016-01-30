
//inside a meteor method
Meteor.methods({
  "stream": function(){
    var Stream = HTTP.get("http://www.flalottery.com/video/en/theWinningNumber.xml");
    return Stream;
  }
});
