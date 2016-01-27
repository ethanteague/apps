FlowRouter.notFound = {
  // Subscriptions registered here don't have Fast Render support.
  subscriptions: function() {
  },
  action: function() {

  }
};

FlowRouter.route('/', {
  action: function(params) {
    BlazeLayout.render('main', {
      top: 'header',
      content: 'eventOutput',
    });
  }
});

FlowRouter.route('/event', {
  action: function(params) {
    BlazeLayout.render('main', {
      top: 'header',
      content: 'insertEventForm'
    });
  }
});
