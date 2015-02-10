define(function(require, exports, module) {
    var View = require('famous/core/View');
    var Surface = require('famous/core/Surface');
    var Transform = require('famous/core/Transform');
    var StateModifier = require('famous/modifiers/StateModifier');
    
    // import the SlideshowView class
    var SlideshowView = require('views/SlideshowView');

    function AppView() {
        View.apply(this, arguments);
        console.log('app view args', arguments, this); //, 
        
        // create a new instance of slideshow view
        var slideshowView = new SlideshowView({data: this.options.data});
        
        // add the instance to app view
        this.add(slideshowView);
        
        this.test()
    }

    AppView.prototype = Object.create(View.prototype);
    AppView.prototype.constructor = AppView;

	AppView.prototype.test = function() {
        console.log('appview test');
    };


    AppView.DEFAULT_OPTIONS = {
    	// it's a good idea to add a property in the default options
        // even when it's undefined    
        data: undefined
    };

    module.exports = AppView;
});
