define(function (require, exports, module) {
    "use strict";
    
    var Factory 			    = app.getModule("engine/Factory");
    var AppInit                 = app.getModule("utils/AppInit");
    var Helper                  = app.getModule("utils/Helper");
    var Extensionutils          = app.getModule("utils/ExtensionUtils");

    require("Elements/UMLDataEntity");
    require("Elements/UMLView");
    require("Elements/UMLService");
    require("Elements/UMLMaskenfluss");
    require("Elements/UMLValueObject");
    require("Elements/UMLRequirement");
    require("Elements/activity/UMLStep");
    require("Elements/activity/UMLException");

    app.getModule("file/FileUtils");
    
    var DomainDrivenMetaModel   = require("MetaModel");
    var DomainDrivenToolbox     = require("Toolbox");
    
    function modelElementLinkPrecondition(options) {
        Helper.assert(
            (options.tailModel instanceof type.UMLView || options.tailModel instanceof type.UMLOperation) 
            && (options.headModel instanceof type.UMLView  || (options.headModel instanceof type.Hyperlink 
                                                                && (options.headModel.reference instanceof type.UMLClassDiagram
                                                                || options.headModel.reference instanceof type.UMLActivityDiagram)))
            || ((options.tailModel instanceof type.Hyperlink && options.tailModel.reference instanceof type.UMLActivityDiagram) || options.headModel.reference instanceof type.UMLViewView),
            Mustache.render(Factory.ERR_INVALID_LINK, options.modelType)
        );
    }

    AppInit.htmlReady(function () {
        var cssPath = Extensionutils.getModulePath(module);
        Extensionutils.addLinkedStyleSheet(cssPath + "style/style.css");

        DomainDrivenMetaModel.registerMetaModel();
        Factory.registerModelFn("UMLView", Factory.defaultModelFn);
        Factory.registerModelAndViewFn("UMLView",   Factory.defaultModelAndViewFn);
        Factory.registerModelFn("UMLDataEntity", Factory.defaultModelFn);
        Factory.registerModelAndViewFn("UMLDataEntity",   Factory.defaultModelAndViewFn);
        Factory.registerModelFn("UMLService", Factory.defaultModelFn);
        Factory.registerModelAndViewFn("UMLService",   Factory.defaultModelAndViewFn);
        Factory.registerModelFn("UMLValueObject", Factory.defaultModelFn);
        Factory.registerModelAndViewFn("UMLValueObject",   Factory.defaultModelAndViewFn);
        Factory.registerModelAndViewFn("UMLMaskenfluss",   Factory.defaultDirectedRelationshipFn, { precondition: modelElementLinkPrecondition } );
        Factory.registerModelAndViewFn("UMLRequirement",      Factory.defaultViewOnlyFn, { viewType: "UMLRequirementView" });

        Factory.registerModelFn("UMLStep", Factory.defaultModelFn);
        Factory.registerModelAndViewFn("UMLStep",   Factory.defaultModelAndViewFn);
        Factory.registerModelAndViewFn("UMLExceptionFlow",   Factory.defaultDirectedRelationshipFn, null );

        //Factory.registerDiagramFn("UMLDomainDrivenClassDiagram",              structuralDiagramFn);
        //Factory.registerViewOfFn("UMLDomainDrivenClassDiagram",              viewForGeneralDiagramFn);

        DomainDrivenToolbox.setupToolbox();
    });

});