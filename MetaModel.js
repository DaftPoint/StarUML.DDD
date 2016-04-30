define(function (require, exports, module) {
	"use strict";

	var MetaModelManager  	= app.getModule("core/MetaModelManager");

    function _registerMetaModel() {
        var metaModel = {
            "UMLView": {
                "kind": "class",
                "super": "UMLClass",
                "attributes": [
                    //{ "name": "isActive",   "kind": "prim", "type": "Boolean", "visible": true, "default": false }
                ],
                "view": "UMLViewView",
                "ordering": 9000
            },
            "UMLDataEntity": {
                "kind": "class",
                "super": "UMLClass",
                "attributes": [
                    //{ "name": "isActive",   "kind": "prim", "type": "Boolean", "visible": true, "default": false }
                ],
                "view": "UMLDataEntityView",
                "ordering": 9001
            },
            "UMLService": {
                "kind": "class",
                "super": "UMLClass",
                "attributes": [
                    //{ "name": "isActive",   "kind": "prim", "type": "Boolean", "visible": true, "default": false }
                ],
                "view": "UMLServiceView",
                "ordering": 9002
            },
            "UMLValueObject": {
                "kind": "class",
                "super": "UMLClass",
                "attributes": [
                    //{ "name": "isActive",   "kind": "prim", "type": "Boolean", "visible": true, "default": false }
                ],
                "view": "UMLValueObjectView",
                "ordering": 9003
            },
            "UMLMaskenfluss": {
                "kind": "class",
                "super": "UMLDependency",
                "attributes": [
                    //{ "name": "mapping", "kind": "prim", "type": "String", "visible": true }
                ],
                "view": "UMLMaskenflussView",
                "ordering": 9004
            },
            "UMLViewView": {
                "kind": "class",
                "super": "UMLClassView"
            },
            "UMLDataEntityView": {
                "kind": "class",
                "super": "UMLClassView"
            },
            "UMLServiceView": {
                "kind": "class",
                "super": "UMLClassView"
            },
            "UMLValueObjectView": {
                "kind": "class",
                "super": "UMLClassView"
            },
            "UMLMaskenflussView": {
                "kind": "class",
                "super": "UMLDependencyView"
            },
            "UMLRequirementView": {
                "kind": "class",
                "super": "UMLNoteView"
            },
            "UMLStep": {
                "kind": "class",
                "super": "UMLAction",
                "attributes": [
                    //{ "name": "isActive",   "kind": "prim", "type": "Boolean", "visible": true, "default": false }
                ],
                "view": "UMLStepView",
                "ordering": 9005
            },
            "UMLStepView": {
                "kind": "class",
                "super": "UMLActionView"
            },
            "UMLExceptionFlow": {
                "kind": "class",
                "super": "UMLControlFlow",
                "attributes": [
                    //{ "name": "mapping", "kind": "prim", "type": "String", "visible": true }
                ],
                "view": "UMLExceptionFlowView",
                "ordering": 9006
            },
            "UMLExceptionFlowView": {
                "kind": "class",
                "super": "UMLControlFlowView"
            },
            "UMLInformationView": {
            "kind": "class",
                "super": "UMLNoteView"
            },
            "UMLImageView": {
                "kind": "class",
                "super": "UMLNoteView",
                "attributes": [
                    { "name": "base64Image", "kind": "prim", "type": "String", "visible": true }
                ]
            }/*,,
            "UMLClassDiagram": {
                "kind": "class",
                "super": "UMLDiagram",
                "views": [
                    "UMLPackageView",
                    "UMLModelView",
                    "UMLSubsystemView",
                    "UMLContainmentView",
                    "UMLClassView",
                    "UMLInterfaceView",
                    "UMLSignalView",
                    "UMLDataTypeView",
                    "UMLPrimitiveTypeView",
                    "UMLEnumerationView",
                    "UMLDependencyView",
                    "UMLGeneralizationView",
                    "UMLRealizationView",
                    "UMLInterfaceRealizationView",
                    "UMLAssociationView",
                    "UMLAssociationClassLinkView",
                    "UMLPortView",
                    "UMLPartView",
                    "UMLConnectorView",
                    "UMLCollaborationView",
                    "UMLCollaborationUseView",
                    "UMLRoleBindingView",
                    "UMLObjectView",
                    "UMLLinkView",
                    "UMLArtifactView",
                    "UMLComponentView",
                    "UMLArtifactInstanceView",
                    "UMLComponentInstanceView",
                    "UMLComponentRealizationView",
                    "UMLNodeView",
                    "UMLNodeInstanceView",
                    "UMLDeploymentView",
                    "UMLCommunicationPathView",
                    "UMLUseCaseView",
                    "UMLActorView",
                    "UMLUseCaseSubjectView",
                    "UMLExtendView",
                    "UMLIncludeView",
                    "UMLProfileView",
                    "UMLExtensionView",
                    "UMLMetaClassView",
                    "UMLStereotypeView"
                ]
            }*/
        };
        MetaModelManager.register(metaModel);
    }

    //#
    exports.registerMetaModel = _registerMetaModel;
});