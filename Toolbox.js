define(function (require, exports, module) {
	"use strict";

    var Toolbox     = app.getModule("diagrams/ToolboxView");
    var QuickEdit   = app.getModule("ui/QuickEdit");
    var Factory     = app.getModule("engine/Factory");
    var Repository  = app.getModule("core/Repository");
    var Toast       = app.getModule("ui/Toast");
    var FileSystem = app.getModule("filesystem/FileSystem");
    var DiagramManager = app.getModule("diagrams/DiagramManager");

	var TXG_CLASS_DDD      = 'txg-class_ddd';
    var TXG_ACTIVITY_DDD      = 'txg-activity_ddd';
    var // Classes (Basic)
        TX_ENTITY          = 'tx-entity',
        TX_VIEW            = 'tx-view',
        TX_SERVICE         = 'tx-service',
        TX_VALUE_OBJECT    = 'tx-value-object',
        TX_MASKENFLUSS     = 'tx-maskenfluss',
        TX_REQUIREMENT     = 'tx-requirement',
        TX_IMAGE     = 'tx-image',

        TX_STEP          = 'tx-step',
        TX_EXCEPTION_FLOW          = 'tx-exception-flow',
        TX_ITERATION          = 'tx-iteration';


        var TX_INFORMATION     = 'tx-information';

	function setupToolbox() {
        // Classes (Basic)
        Toolbox.addGroup(TXG_CLASS_DDD, 'Classes (DDD)', [type.UMLClassDiagram, type.UMLCompositeStructureDiagram]);
        
        Toolbox.addItem(TX_ENTITY,          TXG_CLASS_DDD, 'Entity',        'icon-UMLDataEntity',           'rect');
        Toolbox.addItem(TX_VIEW,            TXG_CLASS_DDD, 'View',          'icon-UMLView',                 'rect');
        Toolbox.addItem(TX_SERVICE,         TXG_CLASS_DDD, 'Service',       'icon-UMLService',              'rect');
        Toolbox.addItem(TX_VALUE_OBJECT,    TXG_CLASS_DDD, 'Value Object',  'icon-UMLValueObject',          'rect');
        Toolbox.addItem(TX_MASKENFLUSS,     TXG_CLASS_DDD, 'View-Flow',     'icon-UMLMaskenfluss',          'line');
        Toolbox.addItem(TX_REQUIREMENT,     TXG_CLASS_DDD, 'Requirement',   'icon-UMLRequirement',          'rect');
        Toolbox.addItem(TX_IMAGE,           TXG_CLASS_DDD, 'Image',         'icon-UMLImageView',            'rect');

        Toolbox.addItem(TX_INFORMATION,     TXG_CLASS_DDD, 'Information',   'icon-UMLRequirement',          'rect');


        Toolbox.addGroup(TXG_ACTIVITY_DDD, 'Activity (DDD)', [type.UMLActivityDiagram]);

        Toolbox.addItem(TX_STEP,          TXG_ACTIVITY_DDD, 'UMLStep',        'icon-UMLStep',           'rect');
        Toolbox.addItem(TX_EXCEPTION_FLOW,     TXG_ACTIVITY_DDD, 'UMLExceptionFlow',   'icon-UMLExceptionFlow',          'line');
        Toolbox.addItem(TX_ITERATION,     TXG_ACTIVITY_DDD, 'UMLIteration',   'icon-UMLIteration',          'rect');

        Toolbox.addItem(TX_INFORMATION,     TXG_ACTIVITY_DDD, 'Information',   'icon-UMLRequirement',          'rect');

        // Event Handling
        $(Toolbox).on('elementCreated', function (event, id, editor, x1, y1, x2, y2) {
            try {
                var diagram             = editor.diagram,
                    parent              = diagram._parent,
                    view                = null,
                    tailView            = diagram.getViewAt(editor.canvas, x1, y1, false),
                    headView            = diagram.getViewAt(editor.canvas, x2, y2, false),
                    tailModel           = tailView ? tailView.model : null;

                var options = {
                        x1        : x1,
                        y1        : y1,
                        x2        : x2,
                        y2        : y2,
                        tailView  : tailView,//diagram.getViewAt(editor.canvas, x1, y1, true),
                        headView  : headView,//diagram.getViewAt(editor.canvas, x2, y2, true),
                        tailModel : tailView ? tailView.model : null,
                        headModel : headView ? headView.model : null
                    };

                switch (id) {
                // Classes
                case TX_ENTITY:
                    view = Factory.createModelAndView("UMLDataEntity", parent, diagram, options);
                    break;
                case TX_VIEW:
                    view = Factory.createModelAndView("UMLView", parent, diagram, options);
                    break;
                case TX_SERVICE:
                    view = Factory.createModelAndView("UMLService", parent, diagram, options);
                    break;
                case TX_VALUE_OBJECT:
                    view = Factory.createModelAndView("UMLValueObject", parent, diagram, options);
                    break;
                case TX_MASKENFLUSS:
                    options.y1 = tailView.top;
                    view = Factory.createModelAndView("UMLMaskenfluss", tailModel, diagram, options);
                    view.model.stereotype = "ViewFlow";
                    break;
                case TX_REQUIREMENT:
                    if ((options.x2 - options.x1) < 5) { options.x2 = options.x1 + 70; }
                    if ((options.y2 - options.y1) < 5) { options.y2 = options.y1 + 40; }
                    view = Factory.createModelAndView("UMLRequirement", parent, diagram, options);
                    break;
                case TX_STEP:
                    view = Factory.createModelAndView("UMLStep", parent, diagram, options);
                    break;
                case TX_ITERATION:
                    view = Factory.createModelAndView("UMLIteration", parent, diagram, options);
                    break;
                case TX_EXCEPTION_FLOW:
                    options.y1 = tailView.top;
                    view = Factory.createModelAndView("UMLExceptionFlow", tailModel, diagram, options);
                    view.model.stereotype = "Exception";
                    break;
                case TX_INFORMATION:
                    if ((options.x2 - options.x1) < 5) { options.x2 = options.x1 + 70; }
                    if ((options.y2 - options.y1) < 5) { options.y2 = options.y1 + 40; }
                    view = Factory.createModelAndView("UMLInformation", parent, diagram, options);
                    break;
                case TX_IMAGE:
                    FileSystem.showOpenDialog(false, false, "Select an Image ...", null, ["png"], function (err, files) {
                        if (!err) {
                            if (files.length > 0) {
                                // User selected one or more files
                                toDataUrl(files, function(dataUrl) {
                                    if ((options.x2 - options.x1) < 5) { options.x2 = options.x1 + 70; }
                                    if ((options.y2 - options.y1) < 5) { options.y2 = options.y1 + 40; }
                                    view = Factory.createModelAndView("UMLImage", parent, diagram, options);
                                    Repository.get(view._id).setBase64Image(dataUrl);
                                    DiagramManager.repaint()
                                })
                            } else {
                                // User canceled
                            }
                        } else {
                            // Handle error
                        }
                    });
                    break;
                }

                // Open QuickEdit for the created view.
                if (view) {
                    view = Repository.get(view._id);
                    if (view instanceof type.NodeView) {
                        _.defer(function () {
                            QuickEdit.open(editor, view, view.left, view.top);
                        });
                    } else if (view instanceof type.EdgeView) {
                        _.defer(function () {
                            QuickEdit.open(editor, view, Math.round((x1 + x2) / 2), Math.round((y1 + y2) / 2));
                        });
                    }
                }

            } catch (err) {
                if (_.isString(err)) {
                    Toast.error(err);
                } else {
                    console.error(err.stack);
                }
            }
        });
    }


    function toDataUrl(url, callback, outputFormat){
        var img = new Image();
        img.crossOrigin = 'Anonymous';
        img.src = url;
        img.onload = function(){
            var canvas = document.createElement('CANVAS');
            var ctx = canvas.getContext('2d');
            var dataURL;
            canvas.height = this.height;
            canvas.width = this.width;
            ctx.drawImage(this, 0, 0);
            dataURL = canvas.toDataURL(outputFormat);
            callback(dataURL);
            canvas = null;
        };
    }
    
    //#
    exports.setupToolbox = setupToolbox;
});