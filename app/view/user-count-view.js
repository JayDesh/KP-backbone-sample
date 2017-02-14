define(['../../../node_modules/handlebars/dist/handlebars'],function(Handlebars){
  var userChannel = Backbone.Radio.channel('user');
  var UserCount = Backbone.Model.extend({
    url:'/usercount'
  });

  userChannel.on('user-count:increment', function() {
    var userCount = new UserCount();
    userCount.fetch({
      success: function (user) {
        console.log(user.get('count') + 1);
      }
    });
  });

  return Backbone.View.extend({
    el:'.count',
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
});
