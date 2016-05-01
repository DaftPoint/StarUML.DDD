define(function (require, exports, module) {
    "use strict";

    var PreferenceManager = app.getModule("core/PreferenceManager");
    var UML               = app.getModule("uml/UML");
    var Graphics          = require("Graphics");

    function UMLIteration() {
        type.UMLStructuredActivityNode.apply(this, arguments);
    }
    UMLIteration.prototype = Object.create(type.UMLStructuredActivityNode.prototype);
    UMLIteration.prototype.constructor = UMLIteration;

    function UMLIterationView() {
        type.UMLStructuredActivityNodeView.apply(this, arguments);
        this.fillColor  = PreferenceManager.get("uml.class.fillColor", "#85FCFF") || PreferenceManager.get("view.fillColor", "#85FCFF");
        this.fillColor = "#85FCFF";
        this.base64Image = 'data:image/png;base64,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';
        this.stereoTypeLabelText = "Iteration";
        this.stereotypeDisplay = UML.SD_DECORATION_LABEL;
    }
    UMLIterationView.prototype = Object.create(type.UMLStructuredActivityNodeView.prototype);
    UMLIterationView.prototype.constructor = UMLIterationView;


    UMLIterationView.prototype.getStereotypeLabelText = function () {
        return "«" + this.stereoTypeLabelText + "»";
    };

    UMLIterationView.prototype.drawObject = function (canvas) {
        type.UMLStructuredActivityNodeView.prototype.drawObject.call(this, canvas);
        if(this.stereotypeDisplay == UML.SD_DECORATION || this.stereotypeDisplay == UML.SD_DECORATION_LABEL) {
            Graphics.drawIcon.call(this, this.iconName, canvas, this.base64Image);
        }
        this.drawIcon(canvas, this.rect);
    };

    UMLIterationView.prototype.drawIcon = function (canvas, rect) {
        if(this.stereotypeDisplay == UML.SD_ICON || this.stereotypeDisplay == UML.SD_ICON_LABEL) {
            Graphics.drawImage.call(this, this.iconName, canvas, this.base64Image);
        }
        if(this.model.documentation != null && this.model.documentation != "" && this.documentationInfoIconCreated == false) {
            this.documentationInfoIconCreated = true;
            var options = {
                x1        : this.left - 16,
                y1        : this.top - 12,
                x2        : this.left + 16,
                y2        : this.top + 12
            };
            this.documentationInfoIcon = new type.UMLRequirementView();
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
            this.documentationInfoIcon.left = this.left - (this.documentationInfoIcon.width/2);
            this.documentationInfoIcon.top = this.top - (this.documentationInfoIcon.height/2);
            this.documentationInfoIcon.drawObject(canvas);
        }
    };

    //# Backbone
    type.UMLIteration      = UMLIteration;
    type.UMLIterationView  = UMLIterationView;
});