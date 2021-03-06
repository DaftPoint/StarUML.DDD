define(function (require, exports, module) {
	"use strict";

    var Core = app.getModule("core/Core");
    var Graphics = app.getModule("core/Graphics");
    var Coord = Graphics.Coord;
    var Point = Graphics.Point;

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
        return "«ViewFlow»";
    };


    UMLMaskenflussView.prototype.canConnectTo = function (view, isTail) {
        return (view.model instanceof type.UMLModelElement) ||
               (view.model instanceof type.Hyperlink) ||
               (view.model instanceof type.UMLOperationView);
    };
    
    //# Backbone
    type.UMLMaskenfluss     = UMLMaskenfluss;
    type.UMLMaskenflussView = UMLMaskenflussView;
});