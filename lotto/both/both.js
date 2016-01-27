// Collections

Events = new Mongo.Collection("events");
Events.attachSchema(new SimpleSchema({
  creator: {
    type: String,
    autoValue: function() {
      return Meteor.userId();
    },
    autoform: {
      type: 'hidden',
    }
  },
  title: {
    type: String,
    label: "Title",
    max: 200
  },
  summary: {
    type: String,
    label: "Details",
    optional: true,
    max: 1000
  }
}));

//SECURITY - Allow Callbacks for posting
Events.allow({
  insert: function(userId, doc) {
    // only allow posting if you are logged in
    return !!userId;
  },
  update: function(userId, doc) {
    //only allow updating if you are owner
    return doc.submittedById === Meteor.userId();
  },
  remove: function(userID, doc) {
    //only allow deleting if you are owner
    return doc.submittedById === Meteor.userId();
  }
});
