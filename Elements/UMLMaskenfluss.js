define(function (require, exports, module) {
	"use strict";

    function UMLMaskenfluss() {
        type.UMLDependency.apply(this, arguments);
    }
    // inherits from UMLDirectedRelationship
    UMLMaskenfluss.prototype = Object.create(type.UMLDependency.prototype);
    UMLMaskenfluss.prototype.constructor = UMLMaskenfluss;

    function UMLMaskenflussView() {
        type.UMLDependencyView.apply(this, arguments);
        this.lineColor = '#0000ff';
    }
    // inherits from UMLGeneralEdgeView
    UMLMaskenflussView.prototype = Object.create(type.UMLDependencyView.prototype);
    UMLMaskenflussView.prototype.constructor = UMLMaskenflussView;
    UMLMaskenflussView.prototype.getStereotypeLabelText = function () {
        return "«Maskenfluss»";
    };


    UMLMaskenflussView.prototype.canConnectTo = function (view, isTail) {
        return (view.model instanceof type.UMLModelElement) ||
               (view.model instanceof type.Hyperlink);
    };

    //# Backbone
    type.UMLMaskenfluss     = UMLMaskenfluss;
    type.UMLMaskenflussView = UMLMaskenflussView;
});