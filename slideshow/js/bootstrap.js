// Require.js allows us to configure shortcut alias
// There usage will become more apparent further along in the tutorial.
require.config({

  baseUrl: 'js/',
  paths: {
    famous: 'vendor/famous',
    jquery: 'vendor/jquery/jquery.custom',
    underscore: 'vendor/underscore/underscore',
    backbone: 'vendor/backbone/backbone'
  }

});

// Load our app module and pass it to our definition function
require(['app', 'jquery'], function(App,$){
  App.init();
  console.log($.Deferred,$.Callbacks);
});