define(function (require, exports, module) {
	"use strict";
	
    function drawImage(imageName, canvas) {        
        var imagePath = './style/icons/' + imageName + '.svg';
        imagePath = require.toUrl(imagePath)
        var image = new Image();
        image.src = imagePath;
        var pixel = (this.font.size * 96 / 72) + 5;
        var sizeWidth = (this.width);
        var sizeHeight= (this.height - pixel);
        canvas.context.drawImage(image, this.left, this.top, sizeWidth, sizeHeight);
    }

    function drawIcon(imageName, canvas) {
        var imagePath = './style/icons/' + imageName + '.svg';
        imagePath = require.toUrl(imagePath)
        var image = new Image();
        image.src = imagePath;
        var sizeWidth = 16;
        var sizeHeight= 16;
        canvas.context.drawImage(image, this.left + this.width - 16 - 5, this.top + 5, sizeWidth, sizeHeight);
    }

    function getImage(imageName) {
        var imagePath = './style/icons/' + imageName + '.svg';
        imagePath = require.toUrl(imagePath)
        var image = new Image();
        image.src = imagePath;
        return image;
    }

    //# Backbone
    exports.drawImage = drawImage;
    exports.drawIcon  = drawIcon;
    exports.getImage  = getImage;
});