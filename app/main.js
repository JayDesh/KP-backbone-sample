requirejs(['view/user-count-view', 'view/user-list-view'], function(UserCountView, UserListView){

  var userChannel = Backbone.Radio.channel('user');
  $.ajaxPrefilter( function ( options, originalOptions, jqXHR){
      options.url = 'http://localhost:3000' + options.url;
    });

  var Router = Backbone.Router.extend({
    routes: {
      '': 'home',
      'count': 'userCount'
    }});
  var userList = new UserListView();
  var userCount = new UserCountView();
  var router = new Router();
  router.on('route:home', function () {
    userList.render();
  } );
  router.on('route:userCount', function () {
    userCount.render();
  });
  Backbone.history.start();
});
