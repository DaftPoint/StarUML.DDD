define(function (require, exports, module) {
	"use strict";

    var PreferenceManager 		= app.getModule("core/PreferenceManager");
    var UMLDomainDrivenElement  = require("Elements/UMLDomainDrivenElement");
	
	function UMLDataEntity() {
        type.UMLDomainDrivenElement.apply(this, arguments);

        //this.stereotype = 'Entity';
    }
    // inherits from UMLClassifier
    UMLDataEntity.prototype = Object.create(type.UMLDomainDrivenElement.prototype);
    UMLDataEntity.prototype.constructor = UMLDataEntity;
    
    function UMLDataEntityView() {
        type.UMLDomainDrivenElementView.apply(this, arguments);
        this.fillColor  = PreferenceManager.get("uml.class.fillColor", "#ffca2b") || PreferenceManager.get("view.fillColor", "#ffca2b");
        this.fillColor = "#ffca2b";
        this.iconName = "entity";
        this.stereoTypeLabelText = "Entity";
    }
    // inherits from UMLDomainDrivenElementView
    UMLDataEntityView.prototype = Object.create(type.UMLDomainDrivenElementView.prototype);
    UMLDataEntityView.prototype.constructor = UMLDataEntityView;

    //# Backbone
    type.UMLDataEntity      = UMLDataEntity;
    type.UMLDataEntityView  = UMLDataEntityView;
});