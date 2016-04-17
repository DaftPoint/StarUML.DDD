define(function (require, exports, module) {
	"use strict";

    var PreferenceManager = app.getModule("core/PreferenceManager");
    require("Elements/UMLDomainDrivenElement");
	
    function UMLValueObject() {
        type.UMLDomainDrivenElement.apply(this, arguments);
    }
    // inherits from UMLClassifier
    UMLValueObject.prototype = Object.create(type.UMLDomainDrivenElement.prototype);
    UMLValueObject.prototype.constructor = UMLValueObject;

    function UMLValueObjectView() {
        type.UMLDomainDrivenElementView.apply(this, arguments);
        this.fillColor  = PreferenceManager.get("uml.class.fillColor", "#ffadd6") || PreferenceManager.get("view.fillColor", "#ffadd6");
        this.fillColor = "#ffadd6";
        this.iconName = "valueObject";
        this.stereoTypeLabelText = "ValueObject";
    }
    // inherits from UMLClassView
    UMLValueObjectView.prototype = Object.create(type.UMLDomainDrivenElementView.prototype);
    UMLValueObjectView.prototype.constructor = UMLValueObjectView;

    //# Backbone
    type.UMLValueObjectView = UMLValueObjectView;
    type.UMLValueObject     = UMLValueObject;
});