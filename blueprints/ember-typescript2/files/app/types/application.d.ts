// This file enables Typescript to typecheck models and services
// @TODO: this file could be generated automatically?

//
// If you see type errors like:
//
//    error TS2345: Argument of type '"my-model"' is not assignable to parameter of type 'never'.
//
// Then you need to add "my-model" to this files



// --------------------- Introduction --------------------------

//
// Type checking models:
//  - var model = this.store.createRecord(modelName)  <-- should return the actual type of your model
//  - model.get('myProp')   <-- warn is 'myProp' does not exist on model
//  - var name = model.get('name')   <-- understands that 'name' is a string if you defined it with DS.attr('string')
// Type checking of services:
//  - Ember.service.inject('myService')   <-- returns the type of MyService which enables autocompletion and type checking
//

//
// How it works:
// - you import application modules
// - the type is inferred with `typeof`
// - each module is added to an index, effectively enabling Type script to find each module by name
//




// ---------------------- Models --------------------------------


//
// There are currently two ways to enable type checking on Ember Data models:
//   1: Type inference (automatic)
//   2: Declare your own interfaces
//




//
// Method #1: let Typescript figure out the type (type inference)
//

// Models: Import the actual Ember.Model and use `typeof`
//import MyModel from "../models/my-model"




//
// Method #2: Import the "IMyModel" interface
//         (note the curly braces around the module name)
//
//
// NOTE: you need to add your own interfaces to your model like so:
//
//     // app/models/my-model.ts
//     import DS from 'ember-data';
//
//      export interface MyModel extends EmberDataModel {
//          readonly version: number,
//          readonly name: string,
//          readonly dateCreated: Date,
//      }
//
//      export default DS.Model.extend({
//        version: DS.attr('number'),
//        name: DS.attr('string'),
//        dateCreated: DS.attr('date'),
//      });
//
//

// Import the inferface:
//import { IMyModel } from "../models/my-model"



// ---------------------- Services --------------------------------

// Service types work similar to model types, you can either use type inference or define your own interfaces
//import LoggerService from "../services/logger"
//import { ILoggerService } from "../services/logger"





// ---------------------- Global type index -------------------------



//
// Extend the global index of models and services
//
// TODO: We use a global but perhaps we can just import and re-export the _modelTypeIndex and _serviceTypeIndex?
//
//declare global {
    //
    // Model index: this maps the name of models with their actual types, e.g. stuff like
    //
    //    this.store.createRecord("user", {}) => User
    //    this.store.find("user", 1) => Promise(User)
    //
    interface _modelTypeIndex {
        // Method 1: using typeinference
        //"my-model": typeof MyModel


        // Method 2: using interfaces
        //"my-model": IMyModel,
    }


    //
    // Service index: this is a global which is accessed by the Ember type definitions
    // It maps your service names to the actual service types:
    //
    //    Ember.service.inject("awesomeService") => AwesomeService
    //
    interface _serviceTypeIndex {
        // Method 1: using typeinference
        //"logger": typeof LoggerService

        // Method2: using interfaces
        //"logger": ILoggerService

    }


    //
    // Initializers
    //
    // Check your app/initializers/*.js
    //
    // Example:
    // with an initializer like the following:
    // ----------------------------------------------------------
    //    // app/initializers/session.js
    //    export function initialize(application) {
    //        application.inject('controller', 'sessionService', 'service:session');
    //        application.inject('route', 'sessionService', 'service:session');
    //        application.inject('component', 'sessionService', 'service:session');
    //    }
    //
    //    export default {
    //        name: 'session',
    //        initialize: initialize
    //    };
    // ----------------------------------------------------------
    //
    // Augment the EmberController, EmberRoute, and EmberComponent as follows:
    //
    // ----------------------------------------------------------
    //    // app/types/application.d.ts
    //    interface EmberRoute {
    //        sessionService: typeof SessionService
    //    }
    // ----------------------------------------------------------
    //
    // (it is assumed the SessionService is already imported in this application.d.ts)
    //


    interface EmberRoute {
        // add your service injections here
    }
    interface EmberController {
        // add your service injections here
    }
    interface EmberComponent {
        // add your service injections here
    }
//}
