define(['../../../node_modules/handlebars/dist/handlebars'],function(Handlebars){
  var userChannel = Backbone.Radio.channel('user');
  userChannel.on('user-count:increment', function() {
    console.log('An event has happened!');
  });  
  var UserCount = Backbone.Model.extend({
    url:'/usercount'
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
      var userChannel = Backbone.Radio.channel('user');
      userChannel.on('user-count:increment', function() {
        console.log('An event has happened!');
      });
    }
  });
});
