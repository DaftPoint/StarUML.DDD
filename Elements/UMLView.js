define(function (require, exports, module) {
	"use strict";

    var PreferenceManager 		= app.getModule("core/PreferenceManager");
    var UMLDomainDrivenElement  = require("Elements/UMLDomainDrivenElement");
	
	function UMLView() {
        type.UMLDomainDrivenElement.apply(this, arguments);
    }
    // inherits from UMLClassifier
    UMLView.prototype = Object.create(type.UMLDomainDrivenElement.prototype);
    UMLView.prototype.constructor = UMLView;

    function UMLViewView() {
        type.UMLDomainDrivenElementView.apply(this, arguments);
        this.fillColor  = PreferenceManager.get("uml.class.fillColor", "#a3e0ff") || PreferenceManager.get("view.fillColor", "#a3e0ff");
        this.fillColor = "#a3e0ff";
        this.stereoTypeLabelText = "View";
        this.iconName = "view";
    }
    // inherits from UMLClassView
    UMLViewView.prototype = Object.create(type.UMLDomainDrivenElementView.prototype);
    UMLViewView.prototype.constructor = UMLViewView;

    //# Backbone
    type.UMLView            = UMLView;
    type.UMLViewView        = UMLViewView;
});