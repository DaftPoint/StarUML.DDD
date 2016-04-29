define(function (require, exports, module) {
    "use strict";

    app.getModule("core/PreferenceManager");
    app.getModule("engine/Factory");
    app.getModule("diagrams/DiagramManager");

    var originalDrawAttribute = type.UMLAttributeView.prototype.drawObject;

    type.UMLAttributeView.prototype.documentationInfoIconCreated = false;

    type.UMLAttributeView.prototype.drawObject = function(canvas) {
        originalDrawAttribute.apply(this, canvas);
        var size = 16;
        if(this.model.documentation != null && this.model.documentation != "" && this.documentationInfoIconCreated == false) {
            this.documentationInfoIconCreated = true;
            var options = {
                x1        : this.left,
                y1        : this.top,
                x2        : this.left + 16,
                y2        : this.top + 16
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
            this.documentationInfoIcon.left = this._parent._parent.left - (this.documentationInfoIcon.width/2);
            var pullTop = Math.abs((this.height - size)) / 2;
            var pullTopCeil = Math.ceil(pullTop);
            this.documentationInfoIcon.top = this.top - JSON.parse(JSON.stringify(pullTopCeil));
            this.documentationInfoIcon.drawObject(canvas);
        }
    };
});