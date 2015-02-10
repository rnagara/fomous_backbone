// define this module in Require.JS
define(function(require, exports, module) {

    // Import additional modules to be used in this view 
    var View = require('famous/core/View');
    var Surface = require('famous/core/Surface');
    var Transform = require('famous/core/Transform');
    var StateModifier = require('famous/modifiers/StateModifier');
    var ImageSurface = require('famous/surfaces/ImageSurface');

	var SlideData = require('seed/SlideData');

    // Constructor function for our SlideView class
    function SlideView() {

        // Applies View's constructor function to SlideView class
        View.apply(this, arguments);
        
        // this.options created from any options passed in during
        // instantiation and the default options (explanation below)
        this.rootModifier = new StateModifier({
            size: this.options.size
        });
      
        // saving a reference to the new node
        this.mainNode = this.add(this.rootModifier);
        
        // make sure you invoke the helper function
        // in the right context by using .call()
        _createBackground.call(this);
        _createFilm.call(this);
        _createPhoto.call(this);
    }

    // Establishes prototype chain for EmptyView class to inherit from View
    SlideView.prototype = Object.create(View.prototype);
    SlideView.prototype.constructor = SlideView;

    // Default options for EmptyView class
    SlideView.DEFAULT_OPTIONS = {
    	size: [400, 450],
    	filmBorder: 15,
    	photoBorder: 3,
        photoUrl: SlideData.defaultImage
    };
console.log(SlideData.getUrl());
    // Define your helper functions and prototype methods here
    // the _ before the function name indicates it's a private function
    function _createBackground() {
        var background = new Surface({
            properties: {
                backgroundColor: '#FFFFF5',
                boxShadow: '0 10px 20px -5px rgba(0, 0, 0, 0.5)'
            }
        });

        this.mainNode.add(background);
        
        background.on('click', function() { console.log('click');
            // the event output handler is used to broadcast outwards
            this._eventOutput.emit('click');
        }.bind(this));
    }
    
    function _createFilm() {
        this.options.filmSize = this.options.size[0] - 2 * this.options.filmBorder;

        var film = new Surface({
            size: [this.options.filmSize, this.options.filmSize],
            properties: {
                backgroundColor: '#222',
                zIndex: 1,
                // makes the surface invisible to clicks
                pointerEvents: 'none'
            }
        });

        var filmModifier = new StateModifier({
            origin: [0.5, 0],
            align: [0.5, 0],
            transform: Transform.translate(0, this.options.filmBorder, 1)
        });

        this.mainNode.add(filmModifier).add(film);
    }
    
    function _createPhoto() {
        var photoSize = this.options.filmSize - 2 * this.options.photoBorder;

        var photo = new ImageSurface({
            size: [photoSize, photoSize],
            content: this.options.photoUrl,
            properties: {
                zIndex: 2,
                pointerEvents: 'none'
            }
        });

        this.photoModifier = new StateModifier({
            origin: [0.5, 0],
            align: [0.5, 0],
            transform: Transform.translate(0, this.options.filmBorder + this.options.photoBorder, 2)
        });

        this.mainNode.add(this.photoModifier).add(photo);
    }
    

    module.exports = SlideView;
    
});
