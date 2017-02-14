
var userChannel = Backbone.Radio.channel('user');
$.ajaxPrefilter( function ( options, originalOptions, jqXHR){
    options.url = 'http://localhost:3000' + options.url;
  });

  var Users =  Backbone.Collection.extend({
    url: '/users'
  });

  var UserListView = Backbone.View.extend({
    el: '.page',

    events:{
        "click .update-count":"updateCount"
      },
    updateCount:function(){
      userChannel.trigger('user-count:increment');
      },
    render: function (){
      var users = new Users();
      var that = this;
      users.fetch({
        success: function (users) {
          var user1 = []
          var template = Handlebars.compile('<table class="table striped"><thead><tr><th>First Name</th><th>Last Name</th></tr><thead><tbody>{{#each users}}<tr><td>{{first_name}}</td><td>{{last_name}}</td></tr>{{/each}}></tbody></table><button class="update-count">Update Count</button>');
          that.$el.html(template({users:users.toJSON()}));
        }
      });
    },

  });

  var UserCount = Backbone.Model.extend({
    url:'/usercount'
  });

  var UserCountView = Backbone.View.extend({
    el:'.page',
    render: function(){
      var that = this;
      var userCount = new UserCount();
      userCount.fetch({
        success: function (user) {
          console.log(user.get('count'));
          var template = Handlebars.compile('<h2>Number of Users</h2><h1>{{userCount}}<h1>');
          that.$el.html(template({userCount:user.get('count')}));
        }
      });
      // var userChannel = Backbone.Radio.channel('user');

    }
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
