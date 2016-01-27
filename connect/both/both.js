// Collections
Geo = new Mongo.Collection("geo");
Geo.Address = new SimpleSchema({
  formattedAddress: {
    type: String,
    optional: true
  },
  geopoint: {
    type: [Number], //[longitude, latitude]
    decimal: true,
  },
  city: {
    type: String,
    optional: true
  },
  postalCode: {
    type: String,
    optional: true
  },
  country: {
    type: String,
    optional: true
  },
  countryName: {
    type: String,
    optional: true
  }
});

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
  address: {
    type: Geo.Address,
    autoform: {
      type: "google-places-input"
        // geopointName: "myOwnGeopointName" //optional, you can use a custom geopoint name
    }
  },
  when: {
    type: Date,
    label: "Date",
    autoform: {
      type: "bootstrap-datetimepicker"
    }
  },
  "users.$.id": {
    type: String,
    label: "Select a user",
    autoform: {
      options: function() {
        var options = [];
        Meteor.users.find().forEach(function(element) {
          options.push({
            label: element.profile.firstName + ' ' + element.profile.lastName,
            value: element._id
          })
        });
        return options;
      }
    }
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
