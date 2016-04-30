define(function (require, exports, module) {
    "use strict";

    app.getModule("core/PreferenceManager");
    app.getModule("engine/Factory");
    app.getModule("diagrams/DiagramManager");

    var originalDrawAttribute = type.UMLAttributeView.prototype.drawObject;

    type.UMLAttributeView.prototype.documentationInfoIconCreated = false;

    type.UMLAttributeView.prototype.drawObject = function(canvas) {
        originalDrawAttribute.apply(this, canvas);
        var zoomFactor = canvas.zoomFactor.numer;
        var size = 16 * zoomFactor;
        if(this.model.documentation != null && this.model.documentation != "") {
            this.documentationInfoIconCreated = true;
            var options = {
                x1        : (this.left * zoomFactor),
                y1        : (this.top * zoomFactor),
                x2        : (this.left * zoomFactor) + size,
                y2        : (this.top * zoomFactor) + size
            };
            this.documentationInfoIcon = new type.UMLRequirementView();
            this.documentationInfoIcon.defaultHeight = size;
            this.documentationInfoIcon.defaultWidth = size;
            this.documentationInfoIcon.size();
            this.documentationInfoIcon.left = options.x1;
            this.documentationInfoIcon.top = options.y1;
            this.documentationInfoIcon._leftPadding   = 0;
            this.documentationInfoIcon._rightPadding  = 0;
            this.documentationInfoIcon._topPadding    = 0;
            this.documentationInfoIcon._bottomPadding = 0;
        }
        if(this.model.documentation == null && this.documentationInfoIcon != null) {
            this.documentationInfoIcon = null;
            this.documentationInfoIconCreated = false;
        } else if(this.documentationInfoIcon != null && this.model.documentation != "") {
            this.documentationInfoIcon.left = (this._parent._parent.left*zoomFactor) - (this.documentationInfoIcon.width*zoomFactor/2);
            var pullTop = Math.abs((this.height*zoomFactor - size)) / 2;
            this.documentationInfoIcon.top = (this.top*zoomFactor) - JSON.parse(JSON.stringify(pullTop));
            this.documentationInfoIcon.drawObject(canvas);
        }
    };
});