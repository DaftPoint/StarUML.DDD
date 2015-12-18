define(function (require, exports, module) {
	"use strict";

	var UML = app.getModule("uml/UML");

    require("Graphics");

    function UMLRequirementView() {
        type.UMLNoteView.apply(this, arguments);
        this.stereotypeDisplay  = UML.SD_ICON;
        this.iconName = "requirement";
        this.autoResize = true;
        this._leftPadding   = 0;
        this._rightPadding  = 0;
        this._topPadding    = 0;
        this._bottomPadding = 0;
    }
    // inherits from UMLNoteView
    UMLRequirementView.prototype = Object.create(type.UMLNoteView.prototype);
    UMLRequirementView.prototype.constructor = UMLRequirementView;

    UMLRequirementView.prototype.size = function (canvas) {
        this.height = 32;
        this.width = 32;
    };

    UMLRequirementView.prototype.drawObject = function (canvas) {
        drawImage.call(this, this.iconName, canvas);
    };

    UMLRequirementView.prototype.drawIcon = function (canvas, rect) {
    };

    function drawImage(imageName, canvas) {        
        var imagePath = '../style/icons/' + imageName + '.svg';
        imagePath = require.toUrl(imagePath);
        var image = new Image();
        image.src = imagePath;
        var sizeWidth = (this.width);
        var sizeHeight= (this.height);
        canvas.context.drawImage(image, this.left, this.top, sizeWidth, sizeHeight);
    }

    //#backbone
    type.UMLRequirementView	= UMLRequirementView;
});