/// <reference path="ember-types.d.ts"/>
/// <reference path="ember-data-types.d.ts"/>
/// <reference path="application-extendable-types.d.ts"/>

//
// This file exports all the separate modules from
//
// - ember-types
// - ember-data-types
// - application-extendable-type (global type only)
//
// Into proper named modules (as used by generated Ember App code)
//


// @TODO
// - EmberData is exported as a global type
//
//




declare module "ember" {

  import "application-extendable-types";
  import Ember from "ember-types";

  //Ember-Data Store is injected in all Ember Routes
  // import EmberData from "ember-data-types";
  // type EmberDataStore = typeof EmberData.Store


  export default Ember
}

// type EmberArray = Ember.Array

declare module "rsvp" {
  import Ember from "ember-types";
  export default Ember.RSVP
}


declare module "ember-data" {
  // import EmberData from "ember-data-types";
  export default EmberData
}

//
// re-export ember-data submodules (needed for module imports in ember model files)
//
declare module "ember-data/attr" {
  let attr : typeof EmberData.attr
  export default attr
}

declare module "ember-data/model" {
  let Model : typeof EmberData.Model
  export default Model
}

declare module "ember-data/relationships" {
  let hasMany : typeof EmberData.hasMany
  let belongsTo : typeof EmberData.belongsTo
  export { hasMany, belongsTo }
}




//
// Some types to silence type errors from default initializers / helpers
// (work in progress)
//
type Global = any
declare var global : Global

//
// TODO: move ember-cli these initializers and helpers into their own package
//
declare module "ember-load-initializers" {
  interface LoadInitializer {
    (app: EmberApplication, prefix: string): void
  }
  var loadInitializer : LoadInitializer
  export default loadInitializer
}

declare module "ember-resolver" {
  export default {

  }
}
declare module "ember-cli-app-version/utils/regexp" {
  let shaRegExp : RegExp
  let versionRegExp : RegExp
  export { shaRegExp, versionRegExp }
}
declare module "ember-inflector/lib/helpers/pluralize" {
  let pluralize : (str: string) => string
  export default pluralize
}
declare module "ember-inflector/lib/helpers/singularize" {
  let singularize : (str: string) => string
  export default singularize
}
declare module "ember-inflector" {
  import pluralize from "ember-inflector/lib/helpers/pluralize"
  import singularize from "ember-inflector/lib/helpers/singularize"
  export { pluralize, singularize }
}

declare module "ember-cli-app-version/initializer-factory" {
  type InitializerFactory = (name: string, version: any) => (() => void)
  let initializerFactory : InitializerFactory
  export default initializerFactory
}

declare module "ember-ajax/services/ajax" {
  interface EmberAjax {

  }
  let ajax : EmberAjax
  export default ajax
}


declare module "ember-data/setup-container" {
  interface SetupContainer {

  }
  let setupContainer : SetupContainer
  export default setupContainer
}
declare module "ember-data/-private/instance-initializers/initialize-store-service" {
  type InitializeStoreService = any
  let initializeStoreService : InitializeStoreService
  export default initializeStoreService
}
declare module "ember-resolver/resolvers/classic/container-debug-adapter" {

  interface ContainerDebugAdapter {
  }
  let containerDebugAdapter : ContainerDebugAdapter
  export default containerDebugAdapter
}

// Ember Concurrency
declare module "ember-concurrency/-helpers" {

  type TaskHelperClosure = (taskMethod: string, args: [boolean | string], hash?: object) => any
  let taskHelperClosure : TaskHelperClosure
  export { taskHelperClosure }
}

