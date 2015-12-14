define(function (require, exports, module) {
    "use strict";
    
    var Factory 			    = app.getModule("engine/Factory");
    var AppInit                 = app.getModule("utils/AppInit");

    var UMLDataEntity           = require("Elements/UMLDataEntity");
    var UMLView                 = require("Elements/UMLView");
    var UMLService              = require("Elements/UMLService");
    var UMLMaskenfluss          = require("Elements/UMLMaskenfluss");
    var UMLValueObject          = require("Elements/UMLValueObject");
    var UMLRequirement          = require("Elements/UMLRequirement");

    var DomainDrivenMetaModel   = require("MetaModel");
    var DomainDrivenToolbox     = require("Toolbox");

    var Helper                  = app.getModule("utils/Helper");
    var FileUtils               = app.getModule("file/FileUtils");
    var Extensionutils          = app.getModule("utils/ExtensionUtils");

    function modelElementLinkPrecondition(options) {
        Helper.assert(
            (options.tailModel instanceof type.UMLView || options.tailModel instanceof type.UMLOperation) 
            && (options.headModel instanceof type.UMLView  || (options.headModel instanceof type.Hyperlink 
                                                                && options.headModel.reference instanceof type.UMLClassDiagram)),
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

        //Factory.registerDiagramFn("UMLDomainDrivenClassDiagram",              structuralDiagramFn);
        //Factory.registerViewOfFn("UMLDomainDrivenClassDiagram",              viewForGeneralDiagramFn);

        DomainDrivenToolbox.setupToolbox();
    });

});