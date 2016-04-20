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
        return "«Maskenfluss»";
    };


    UMLMaskenflussView.prototype.canConnectTo = function (view, isTail) {
        return (view.model instanceof type.UMLModelElement) ||
               (view.model instanceof type.Hyperlink) ||
               (view.model instanceof type.UMLOperationView);
    };

    /*UMLMaskenflussView.prototype.initialize = function(canvas, x1, y1, x2, y2) {
        this.points.clear();
        //this.points.add(Coord.junction(this.tail.getBoundingBox(canvas), new Point(x1, y1)));
        this.points.add(new Point(x1, y1));
        this.points.add(Coord.junction(this.head.getBoundingBox(canvas), Coord.getCenter(this.tail.getBoundingBox(canvas))));
        if (this.lineStyle === Core.LS_RECTILINEAR || this.lineStyle === Core.LS_ROUNDRECT) {
            this.points.convObliqueToRectilinear();
        }
    };*/

    //# Backbone
    type.UMLMaskenfluss     = UMLMaskenfluss;
    type.UMLMaskenflussView = UMLMaskenflussView;
});