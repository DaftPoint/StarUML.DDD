define(function (require, exports, module) {
    "use strict";

    app.getModule("core/PreferenceManager");
    app.getModule("engine/Factory");
    app.getModule("diagrams/DiagramManager");

    var UML               = app.getModule("uml/UML");
    var Graphics          = require("Graphics");

    function UMLActivityElement() {
        type.UMLAction.apply(this, arguments);
    }

    // inherits from UMLClassifier
    UMLActivityElement.prototype = Object.create(type.UMLAction.prototype);
    UMLActivityElement.prototype.constructor = UMLActivityElement;

    function UMLActivityElementView() {
        type.UMLActionView.apply(this, arguments);
        this.stereotypeDisplay = UML.SD_DECORATION_LABEL;
        this.stereoTypeLabelText = "UMLActivityElement";
        this.iconName = null;
        this.base64Image = null;
        this.documentationInfoIconCreated = false;
        this.documentationInfoIcon = null;
    }

    UMLActivityElementView.prototype = Object.create(type.UMLActionView.prototype);
    UMLActivityElementView.prototype.constructor = UMLActivityElementView;
    UMLActivityElementView.prototype.getStereotypeLabelText = function () {
        return "«" + this.stereoTypeLabelText + "»";
    };

    UMLActivityElementView.prototype.drawObject = function (canvas) {
        type.UMLActionView.prototype.drawObject.call(this, canvas);
        if(this.iconName != null && (this.stereotypeDisplay == UML.SD_DECORATION || this.stereotypeDisplay == UML.SD_DECORATION_LABEL)) {
            Graphics.drawIcon.call(this, this.iconName, canvas, this.base64Image);
        }
        this.drawIcon(canvas, this.rect);
    };

    UMLActivityElementView.prototype.drawIcon = function (canvas, rect) {
        if(this.iconName != null && (this.stereotypeDisplay == UML.SD_ICON || this.stereotypeDisplay == UML.SD_ICON_LABEL)) {
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

    UMLActivityElementView.prototype.update = function(canvas) {
        switch (this.stereotypeDisplay) {
            case UML.SD_NONE:
                this.suppressAttributes = false;
                this.suppressOperations = false;
                break;
            case UML.SD_ICON:
                this.suppressAttributes = true;
                this.suppressOperations = true;
                break;
            case UML.SD_ICON_LABEL:
                this.suppressAttributes = true;
                this.suppressOperations = true;
                break;
            case UML.SD_DECORATION:
                this.suppressAttributes = false;
                this.suppressOperations = false;
                break;
            case UML.SD_DECORATION_LABEL:
                this.suppressAttributes = false;
                this.suppressOperations = false;
                break;
        }
        type.UMLActionView.prototype.update.call(this, canvas);
    };

    //# Backbone
    type.UMLActivityElement            = UMLActivityElement;
    type.UMLActivityElementView        = UMLActivityElementView;
});