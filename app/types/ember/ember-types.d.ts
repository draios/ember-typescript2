//
// Ember and EmberData types. based on @types/ember and Typescript 2.x blog posts
//

//
// actions
//
interface ActionsHash {
    // willTransition?: Function
    // error?: Function

    // any action can be defined, but actions are always a Function
    [key: string]: Function
}

declare interface ActionHandlerMixin {
    /**
    Triggers a named action on the ActionHandler
    **/
    send?(name: string, ...args: any[]): void;
    /**
    The collection of functions, keyed by name, available on this ActionHandler as action targets.
    **/
    actions?: ActionsHash;
}









// options passed to extend and create
// interface ObjectOptionsBase {
//     [key: string]: thisFunc<this>
// }
interface ObjectOptions // extends ObjectOptionsBase // <T extends EmberObject>
{
    init?: (this: this) => void,
    willDestroy?: (this: this) => void,

    // @TODO: enable this to allow any type of object property inside extend()
    // [key: string]: boundAny<this>
    [key: string]: ((this: this, ...arg: any[]) => any)
                   & any


}

interface EmberTransition {

}


interface RouteOptions extends ObjectOptions
{
    // NOTE, whatever model() returns will be the argumnet to setupController()
    //       there is currently no way to handle this

    // @TODO: model = Promise | object?
    //beforeModel?: (transition: any) => any
    model?: (this: this & EmberRoute, params?: object, transition?: EmberTransition) => any
    // @TODO: infer the specific controller type?
    setupController?: (this: this & EmberRoute, controller: EmberController, model: any) => void,
    renderTemplate?: (this: this & EmberRoute, controller: EmberController, model: any) => void,



    // allow any property to be defined on Routes
    // downside is that undefined properties will also resolve to 'any'
    // @TODO: can this be inheried from ObjectOptions while keeping it as "fall back" definition
    //        (it seems the fallback can only be the last definition in an interface)
    // @TODO?? investigate this more?
    [key: string]: any
    // [key: string]:
}

interface EmberMixin {

}

// base Ember.Object
// the type parameter is the Type of options passed to Ember.Object.extend()
// this way we can also typecheck the object passed to configure an object
// (or component, controller, etc)
declare interface EmberObject<O extends ObjectOptions> {
    extend(options: O): this & O
    extend(mixin1: EmberMixin, options: O): this & O




    // get<K extends keyof this, V extends this[K], T extends GettableComputedProperty<V>>(propertyName: K): V;

    // tagged phantom types??
    // ObjectField<string, Gettable & Settable> ??
    // T extends ObjectField<V, Gettable> => 
    // get<K extends keyof this, V extends this[K], T extends V, X extends T<Y, Z>>(propertyName: K): T;
    // get<K extends keyof this, V extends IObjectProperty<this[K], IGetter>>(propertyName: K): T;
    // get<K extends keyof this, V extends this[K] & ObjectPropertyReadable<T>, X extends "unWrap", T extends V[X]>(propertyName: K): V;
    // WORKS:
    // get<K extends keyof this, V extends this[K], T extends keyof V>(propertyName: K): V[T];

    // 'get' a wrapped type
    get<
            K extends keyof this, // "fullName" keyof model (constraint)
            V extends this[K], // EmberComputedPropertyReadonly<T> extends fullname (constraint)
            T extends keyof V, // unWrap extends keyof EmberComputedPropertyReadonly
            X extends V[T] // X = unwrap ( => string)
        >(propertyName: K): X;
    get<
            K extends keyof this, // "fullName" keyof model (constraint)
            V extends this[K] // EmberComputedPropertyReadonly<T> extends fullname (constraint)
        >(propertyName: K): V;

    // NOTE: no set() defined for wrapped types, preventing set() on computed properties (not 100% safe but)

    set<
            K extends keyof this, // K = "fullName" <keyof this>
            V extends this[K] // WrappedV = IObjectPropertyReadAndWritable<string>
        >(propertyName: K, value: V): V;




}

// making computedproperties readonly automatically isn't currently possible
// https://github.com/Microsoft/TypeScript/issues/13257


// interface Writable<T> {
//     unWrap: T
// }

// interface getTypeParam<T> {
//     (v: ObjectPropertyReadable<T>): T
// }
// type SettableComputedPropertyTypes<T extends SettablePropertyTypes> = string
// type SettablePropertyTypes = string | boolean | number | Date

declare interface EmberComponent extends EmberObject<ObjectOptions> {
}



declare interface EmberController extends EmberObject<ObjectOptions> {
    // extend: (confObj: T) => T & EmberComponent,
    // extend(options: ObjectOptions<EmberComponent>): typeof EmberComponent
    //  create: (o: object | null) => void
    reset: () => void
}








// declare class EmberRoute extends EmberObject implements ActionHandlerMixin {
interface EmberRoute extends EmberObject<RouteOptions> {
    // extend: (confObj: T) => T & EmberRoute,
    // extend(options: RouteOptions): this
    // static create: (o: object | null) => void
    send?: any,


    // store is injected on all routes by Ember
    // store: EmberDataStore

}

interface EmberRouter extends EmberObject<ObjectOptions> {
    map(routesCallback: () => void): void
}





//
// HACK: we want to allow any type of value, but if value is a function,
//       we want to specify it's "this" context
//
// type boundAny<T> = ((this: T, ...arg: any[]) => any)
//                  | EmberService
//                  | EmberObject<ObjectOptions>
//                  | string
//                  | number
//                  | boolean
//                  | Array<T>
//                  | object



// type ObjectMethod<T> = ((this: T, ...arg: any[]) => any)
interface ServiceOptions extends ObjectOptions {
    // [key: string]: ObjectMethod<this>
    //                | any
}

//
// dependency injection
//
interface EmberService extends EmberObject<ServiceOptions> { }
// declare namespace Ember {


    interface dependencyInjection {
        service: serviceLookup
        // @TODO: create an index of available controllers?
        controller: (name?: string) => EmberController

    }

    type serviceLookup = <K extends keyof _serviceTypeIndex>(serviceName: K) => _serviceTypeIndex[K]

    // interface Service {
    //     test: string
    // }

    // declare var Service : Service
    // class EmberService {}
// }








//
// Ember helpers defined at the root Ember object
// @TODO: move into Ember namespace?
//
type getter = <T, K extends keyof T>(obj: T, propertyName: K) => T[K]
type setter = <T, K extends keyof T, V extends any>(obj: T, propertyName: K, value: V) => V
type guidFor = <T extends object>(obj: T) => string
type isNone = (val: any) => boolean
type assert = (desc: string, obj: any) => void
declare interface EmberComputedProperty extends EmberObject<ObjectOptions> {
}
// T = Type
// G = Getter, Setter, etc
// declare interface IObjectProperty<T, Traits> {
//     unWrap: T
// }
// interface IGetter { }
// interface ISetter { }

// ????????????? `this` context inside computed property?
// via <this> type used inside of the generic type?
// see also computed<>
declare interface EmberComputedPropertyReadonly<T> {
    unWrap: T
}
// declare interface IObjectPropertyReadAndWritable<T> extends EmberComputedPropertyReadonly<T> {

    // inherits unWrap
// }
// interface Gettable<T> {
    
// }

// interface Settable<T> {
    // NOTE:
    // this is more of a hack to distinquish gettable properties with (more "specialized") settable properties
    // more 'specialized' than just a getter?
    // we cant test for property==computed property, but this way we can check if its not a computed prop?
// }

interface EmberLogger extends EmberObject<ObjectOptions> {
    assert(assertion: boolean): void
    debug(msg: any): void
    error(msg: any): void
    info(msg: any): void
    log(msg: any): void
    warn(msg: any): void
}

interface ApplicationOptions {
  modulePrefix: string
  podModulePrefix: string
  Resolver: any
}
interface EmberApplication extends EmberObject<ApplicationOptions> {
    
}


//
// Ember.RSVP.Promise
//

type PromiseResolver = (resolve: any, reject: any) => void
interface EmberRSVPPromise {
    new (resolver: PromiseResolver, label?: string): EmberRSVPPromise
}
interface EmberRSVP {
    Promise: EmberRSVPPromise
}


// interfaces with generic
// declare global {
    // EmberArray: like a JS array but with some additional methods (objectAt, etc)
    interface EmberArray<T> extends Array<T> {
        
    }
// }

interface EmberHTMLBars {
  template: (compiledTemplate: object) => any
}

// string prototype extensions in Ember.String
interface EmberString {

  //camelize
  //capitalize
  classify: (str: string) => string
  //dasherize
  //decamelize
  //fmt
  //htmlSafe
  //isHTMLSafe
  //loc
  //underscore
  //w

}









//
// Ember
//

// @TODO: define as `interface` instead of `namespace`?
// import * as $ from "jquery";
declare namespace Ember {

    // export all pieces of the Ember framework
    let Object    : EmberObject<ObjectOptions>
    let Controller: EmberController
    let Component : EmberComponent
    let Route     : EmberRoute
    let Router    : EmberRouter
    let Service   : EmberService
    let Logger    : EmberLogger
    let Application : EmberApplication
    let RSVP : EmberRSVP
    // TODO: expose generic types
    type Array<T> = EmberArray<T>
    //let HTMLBars  : EmberHTMLBars

    // @TODO:
    let Helper : any
    let String : EmberString

    // getters and setters
    let get       : getter
    let set       : setter

    // services
    let inject    : dependencyInjection

    // helpers
    let guidFor   : guidFor
    let isNone    : isNone
    let assert    : assert

    // computed properties
    // EmberComputedPropertyReadonly<T>: makes it possible to catch accidental set() on a computed property
    function computed<T>(observedProperty1: string, fn: () => T): EmberComputedPropertyReadonly<T>
    function computed<T>(observedProperty1: string, observedProperty2: string, fn: () => T): EmberComputedPropertyReadonly<T>
    function computed<T>(observedProperty1: string, observedProperty2: string, observedProperty3: string, fn: () => T): EmberComputedPropertyReadonly<T>
    // // ...extend number of observed properties as needed



    // re-export jQuery
    // @TODO: do this in index.d.ts?
    let $ : any

    // Using deprecated feature flags should give a compile-time warning too
    let MODEL_FACTORY_INJECTIONS : never
}


// import Em = Ember;


declare module "ember-types" {
// declare module Ember {
    export default Ember
}


// TODO: tie ember and ember-data together via index.d.ts
interface EmberRoute {
    // declare the Ember Data Store injection for all Ember.Routes
    store: EmberDataStore
}
