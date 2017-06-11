/// <reference path="ember-types.d.ts"/>
/// <reference path="ember-data-types.d.ts"/>
import EmberData from "ember-data"
import Ember from "ember"



declare global {

    // extendable index that maps Ember.inject.service("store") to the actual type of EmberDataStore
    // effectivly enabling typechecking usage of services
    interface _serviceTypeIndex {
        "store": typeof EmberData.Store
        // @NOTE: _this can be extended manually with custom services.
        //        application services can be added via app/typescript/sysdig/index.d.ts)

    }

    // extendable index of application models
    //
    interface _modelTypeIndex {
        // define your applications models through app/typescript/sysdig/index.d.ts

        // @TODO: find out if there is some way to have Ember.Model.extend() calls automatically register to typescript
    }
}


// @TODO: more lookup type indexes?
//         e.g. this.controllerFor, etc


// @TODO use a module instead of a global (if possible)
/*
declare module "application-extendable-types" {
    type ServiceTypeIndex = _serviceTypeIndex
    type ModelTypeIndex = _modelTypeIndex
    // export default { ModelTypeIndex, ServiceTypeIndex }
    export { _serviceTypeIndex as ServiceTypeIndex }
    export { _modelTypeIndex as ModelTypeIndex }

    interface ApplicationExtendableTypes {
        ServiceTypeIndex: _serviceTypeIndex
        ModelTypeIndex: _modelTypeIndex
    }
    export default ApplicationExtendableTypes
}
*/
