// Collections

LottoGames = new Mongo.Collection("LottoGames");
LottoGames.attachSchema(new SimpleSchema({
  title: {
    type: String,
  },
  date: {
    type: String,
  },
  nums: {
    type: String,
  }
}));

LottoGames.allow({
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
