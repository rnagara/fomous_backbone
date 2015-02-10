define(function(require, exports, module) {
    
    var Backbone = require('backbone');
    var PicasaModel = Backbone.Model.extend({
      urlRoot: 'https://picasaweb.google.com/data/feed/api/user/',
      initialize: function(attributes, options){
        this.userId = options.userId || '';
        this.albumId = options.albumId || '';
        this.queryParams = options.queryParams || '';
        
        
      },
      url: function(){
        return _.result(this, 'urlRoot') + this.userId + '/albumid/' + this.albumId + this.queryParams;
      },
      parse: function(resp, options){
        var urls = [];
        var entries = resp.feed.entry;
        for (var i = 0; i < entries.length; i++) {
            var media = entries[i].media$group;
            urls.push(media.media$content[0].url);
        }
        return urls;
      }
    });

    module.exports = PicasaModel;
});