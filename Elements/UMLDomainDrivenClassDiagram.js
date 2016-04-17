define(function (require, exports, module) {
	"use strict";

    function UMLDomainDrivenClassDiagram() {
        type.UMLClassDiagram.apply(this, arguments);
    }
    // inherits from UMLClassDiagram
    UMLDomainDrivenClassDiagram.prototype = Object.create(type.UMLClassDiagram.prototype);
    UMLDomainDrivenClassDiagram.prototype.constructor = UMLDomainDrivenClassDiagram;

    UMLDomainDrivenClassDiagram.prototype.canAcceptModel = function (model) {
    	var canAcceptModelSuper = type.UMLClassDiagram.canAcceptModel(model);
        return canAcceptModelSuper;
    };
});