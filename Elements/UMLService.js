define(function (require, exports, module) {
	"use strict";

    var PreferenceManager       = app.getModule("core/PreferenceManager");
    var UMLDomainDrivenElement  = require("Elements/UMLDomainDrivenElement");
	
    function UMLService() {
        type.UMLDomainDrivenElement.apply(this, arguments);

        //this.stereotype = 'Service';
    }
    // inherits from UMLClassifier
    UMLService.prototype = Object.create(type.UMLDomainDrivenElement.prototype);
    UMLService.prototype.constructor = UMLService;

    function UMLServiceView() {
        type.UMLDomainDrivenElementView.apply(this, arguments);
        this.fillColor  = PreferenceManager.get("uml.class.fillColor", "#ff8056") || PreferenceManager.get("view.fillColor", "#ff8056");
        this.fillColor = "#ff8056";
        this.stereoTypeLabelText = "Service";
        this.iconName = "service";
    }
    // inherits from UMLClassView
    UMLServiceView.prototype = Object.create(type.UMLDomainDrivenElementView.prototype);
    UMLServiceView.prototype.constructor = UMLServiceView;

    //# Backbone
    type.UMLService         = UMLService;
    type.UMLServiceView     = UMLServiceView;
});