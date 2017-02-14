define(['../../../node_modules/handlebars/dist/handlebars'], function(Handlebars){
  var Users =  Backbone.Collection.extend({
    url: '/users'
  });

  var userChannel = Backbone.Radio.channel('user');
  return Backbone.View.extend({
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
});
