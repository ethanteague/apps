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
      //bottom: 'userDir'
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


FlowRouter.route('/login', {
  //name: 'login',
  action: function(params) {
    BlazeLayout.render('main', {
      top: 'header',
      content: 'login'
    });
  }
});
FlowRouter.route('/register', {
  //name: 'register',
  action: function(params) {
    BlazeLayout.render('main', {
      top: 'header',
      content: 'register'
    });
  }
});
