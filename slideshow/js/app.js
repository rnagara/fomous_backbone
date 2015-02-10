define(function(require, exports, module) {
    
    var Engine      = require('famous/core/Engine');
    var AppView     = require('views/AppView');
    var PicasaModel = require('models/PicasaModel');
    var mainContext = Engine.createContext();
    var SlideModel  = new PicasaModel({}, {
      userId: '109813050055185479846',
      albumId: '6013105701911614529',
      queryParams: '?alt=json&hl=en_US&access=visible&fields=entry(id,media:group(media:content,media:description,media:keywords,media:title))'
    });

    
    function _appViewCreate(data) {
      console.log(data);
      // instantiates AppView with our url data
      var appView = new AppView({data: data});
      
      // add the instance to the context
      mainContext.add(appView);
      
    }
    
    exports.init = function(){
    	var self = this;
    
    	SlideModel.fetch();
        SlideModel.on('change', function(model){
          _appViewCreate.call(self, model.values());
        });
    
      console.log('app init');
    };
    
});
