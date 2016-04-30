define(function (require, exports, module) {
	"use strict";

    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    // SEE http://one-day-from.blogspot.de/2013/09/svg-in-html-5-canvas-tainted-canvas.html
    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
	
    function drawImage(imageName, canvas, base64) {
        var image = new Image();
        if(base64 !== null || base64 !== undefined) {
            image.src = base64;
        }
        var pixel = (this.font.size * 96 / 72) + 5;
        var zoomFactor = canvas.zoomFactor.numer;
        var sizeWidth = (this.width * zoomFactor);
        var sizeHeight= (this.height * zoomFactor - pixel * zoomFactor);
        canvas.context.drawImage(image, this.left * zoomFactor, this.top * zoomFactor, sizeWidth, sizeHeight);
    }

    function drawIcon(imageName, canvas, base64) {
        var image = new Image();
        image.src = base64;
        var zoomFactor = canvas.zoomFactor.numer;
        var sizeWidth = 16 * zoomFactor;
        var sizeHeight= 16 * zoomFactor;
        var left = (this.left * zoomFactor) + (this.width * zoomFactor) - sizeWidth - (5 * zoomFactor);
        var top = (this.top * zoomFactor) + (5 * zoomFactor);
        canvas.context.drawImage(image, left, top, sizeWidth, sizeHeight);
    }

    function drawErrorIcon(imageName, canvas, base64) {
        var image = new Image();
        image.src = base64;
        var zoomFactor = canvas.zoomFactor.numer;
        var sizeWidth = 16 * zoomFactor;
        var sizeHeight= 16 * zoomFactor;

        var x = this.errorIconLeft;
        var y = this.errorIconTop;
        if(this.points.getPoint(0).x > this.points.getPoint(1).x) {
            x = x - (sizeWidth/2);
            y = y - (sizeHeight/2);
        } else {
            y = y - (sizeHeight/2);
            x = x - (sizeWidth/2);
        }
        /*if(this.points.getPoint(0).y > this.points.getPoint(1).y) {
            y = y - (sizeHeight/2);
        }*/
        canvas.context.drawImage(image, x, y, sizeWidth, sizeHeight);
    }

    function getImage(imageName) {
        /*var imagePath = './style/icons/' + imageName + '.svg';
        imagePath = require.toUrl(imagePath);
        var image = new Image();
        image.src = imagePath;
        return image;*/
    }

    //# Backbone
    exports.drawImage = drawImage;
    exports.drawIcon  = drawIcon;
    exports.drawErrorIcon  = drawErrorIcon;
    exports.getImage  = getImage;
});