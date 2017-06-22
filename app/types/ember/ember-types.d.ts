//
// Ember and EmberData types. based on @types/ember and Typescript 2.x blog posts
//
// import RSVP from "rsvp-types"











//
// actions (taken from @types/ember)
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


// Transitions
interface EmberTransition {

}




// base mixin interface
interface EmberMixin extends EmberObject<ObjectOptions> {

}





// object passed to Ember.Object.extend()
interface ObjectOptions // extends ObjectOptionsBase // <T extends EmberObject>
{
    init?: (this: this) => void,
    willDestroy?: (this: this) => void,


    // @TODO: uncomment this to allow any type of object property inside extend()
    [key: string]: any
}


//
// Ember.Object
//
declare interface EmberObject<Opt extends ObjectOptions> {
    // TODO
    _optionsObjectType: Opt

    // Ember.Object.extend() signature:
    // - properly sets `this`: combination of the base class and the externsion object
    // - also infers types of parameters hooks such as setupController (received a controller and a model)
    extend(): this & ThisType<this>
    extend(options: Opt & ThisType<this & Opt>): this & Opt & ThisType<this & Opt>
    extend(mixin1: EmberMixin, options: Opt & ThisType<this & Opt>): this & Opt & ThisType<this & Opt>
    extend(mixin1: EmberMixin, mixin2: EmberMixin, options: Opt & ThisType<this & Opt>): this & Opt & ThisType<this & Opt>
    extend(mixin1: EmberMixin, mixin2: EmberMixin, mixin3: EmberMixin, options: Opt & ThisType<this & Opt>): this & Opt & ThisType<this & Opt>
    extend(mixin1: EmberMixin, mixin2: EmberMixin, mixin3: EmberMixin, mixin4: EmberMixin, options: Opt & ThisType<this & Opt>): this & Opt & ThisType<this & Opt>
    // extend<E extends Opt>(mixin1: EmberMixin, options: E & ThisType<this & E>): this & E & ThisType<this & E>

    create(options: Opt & ThisType<this & Opt>): this & Opt & ThisType<this & Opt>
    create(mixin1: EmberMixin, options: Opt & ThisType<this & Opt>): this & Opt & ThisType<this & Opt>
    create(mixin1: EmberMixin, mixin2: EmberMixin, options: Opt & ThisType<this & Opt>): this & Opt & ThisType<this & Opt>
    create(mixin1: EmberMixin, mixin2: EmberMixin, mixin3: EmberMixin, options: Opt & ThisType<this & Opt>): this & Opt & ThisType<this & Opt>
    create(mixin1: EmberMixin, mixin2: EmberMixin, mixin3: EmberMixin, mixin4: EmberMixin, options: Opt & ThisType<this & Opt>): this & Opt & ThisType<this & Opt>

    destroy: () => void

    // @TODO: these are not the same (reopen is a class method, reopenClass is an instance method)
    //        we should probably move to a real TS class for Ember.Object, or perhaps let Extend and Create return different interfaces?
    reopen(options: Opt & ThisType<this & Opt>): this & Opt & ThisType<this & Opt>
    reopenClass(options: Opt & ThisType<this & Opt>): this & Opt & ThisType<this & Opt>

    // @TODD: typecheck super()?
    _super?: (...args: any[]) => any

    get<K extends keyof this>(propertyName: K): this[K];
    set<K extends keyof this, V extends this[K]>(propertyName: K, value: V): V;

    setProperties<K extends keyof this, V extends { [K in keyof this]?: this[K] }>(values: V) : V;
}

// Components
declare interface EmberComponent extends EmberObject<ObjectOptions> {
    sendAction: (action: string, params: any & ThisType<this>) => void
}



// Controllers
declare interface EmberController extends EmberObject<ObjectOptions> {
    reset: () => void
    transitionToRoute: (routeName: string) => void
}








// Routes
// @TODO: docblocks for IDE integration?
// object passed to Ember.Route.extend()
interface RouteOptions extends ObjectOptions
{
    // NOTE, whatever model() returns will be the `model` argument to setupController()? (if its a promise it will be resolved first)
    //       (there is currently no way to handle this)
    beforeModel?: (transition?: EmberTransition) => void | RSVP.Promise<any,any> // TODO: type parameter for Promise
    model?: (params?: object, transition?: EmberTransition) => any
    setupController?: (controller: EmberController, model: any) => void,
    renderTemplate?: (controller: EmberController, model: any) => void,

}
/**
 Ember.Route
   */
    
declare interface EmberRoute extends EmberObject<RouteOptions> {
    send?: any,

    transitionTo: (routeName: string) => void
}


//
// Ember.Router
//
type EmberRouterRouteCallback<T> = (this: T) => void
type EmberRouterRouteConfig = { resetNamespace?: boolean, path?: string }

interface EmberRouter extends EmberObject<ObjectOptions> {
    route(this: this, path: string): void & ThisType<this>
    route(this: this, path: string, routeCfgOrCallback: EmberRouterRouteConfig | EmberRouterRouteCallback<this>): void & ThisType<this>
    route(this: this, path: string, routeCfg: EmberRouterRouteConfig, routeCallback: EmberRouterRouteCallback<this>): void & ThisType<this>
    map(this: this, routesCallback: (this: this) => void): void & ThisType<this>
}





// type ObjectMethod<T> = ((this: T, ...arg: any[]) => any)
interface ServiceOptions extends ObjectOptions {
}

//
// dependency injection
//
interface EmberService extends EmberObject<ServiceOptions> {
    // extend(): this & ThisType<this>
    // extend<E>(options: E & ThisType<this & E>): this & E & ThisType<this & E>
    // extend<E extends ServiceOptions>(mixin1: EmberMixin, options: E & ThisType<this & E>): this & E & ThisType<this & E>
    // extend<E extends ServiceOptions>(mixin1: EmberMixin, mixin2: EmberMixin, options: E & ThisType<this & E>): this & E & ThisType<this & E>
    // extend<E extends ServiceOptions>(mixin1: EmberMixin, mixin2: EmberMixin, mixin3: EmberMixin, options: E & ThisType<this & E>): this & E & ThisType<this & E>
    // extend<E extends ServiceOptions>(mixin1: EmberMixin, mixin2: EmberMixin, mixin3: EmberMixin, mixin4: EmberMixin, options: E & ThisType<this & E>): this & E & ThisType<this & E>

    // extend<E extends ObjectOptions>(options: E & ThisType<this & E>): this & E & ThisType<this & E>

}

interface DependencyInjection {
    service: serviceLookup
    // @TODO: create an index of available controllers?
    controller: (name?: string) => EmberController

}

type serviceLookup = <K extends keyof _serviceTypeIndex>(serviceName: K) => _serviceTypeIndex[K]








//
// Ember helpers defined at the root Ember object
// @TODO: move into Ember namespace?
//
type getter = <T, K extends keyof T>(obj: T, propertyName: K) => T[K]
type setter = <T, K extends keyof T, V extends any>(obj: T, propertyName: K, value: V) => V
type setterProperties = <T, K extends keyof T, V extends { [K in keyof T]?: T[K] }>(obj: T, values: V) => V
type guidFor = <T extends object>(obj: T) => string
type isNone = (val: any) => boolean
type isArray = (val: any) => boolean
type assert = (desc: string, obj: any) => void

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

// TODO: type parameter
// T = type of data returned on success
// E = type of error returned on failure
// type PromiseResolverSuccess<T> = (this: void, result: T) => void
// type PromiseResolverFail<E> = (this: void, error: E) => void
// type PromiseResolver<T,E> = (resolve: PromiseResolverSuccess<T>, reject: PromiseResolverFail<E>) => void
// interface EmberRSVPPromise<T,E> {
//     new (resolver: PromiseResolver<T,E>, label?: string): EmberRSVPPromise<T,E>
// }

// declare module EmberRSVP {
//     type Promise<T,E> = EmberRSVPPromise<T,E>
// }


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


// Ember String.prototype extensions
interface String {
    fmt: (...args: Array<string>) => string
}


interface EmberRun {
    later: (target: object, method: Function|string, args: any, wait?: number) => object
    next: (target: object, method: Function|string, args: any) => object
    cancel: (timer: any) => boolean
}







//
// Ember
//

// @TODO: define as `interface` instead of `namespace`?
// import * as $ from "jquery";
type RSVPType = typeof RSVP
declare module Ember {

    // export all pieces of the Ember framework
    let Object    : EmberObject<ObjectOptions>
    let Controller: EmberController
    let Component : EmberComponent
    let Route     : EmberRoute
    let Router    : EmberRouter
    let Mixin     : EmberMixin
    let Service   : EmberService
    let Logger    : EmberLogger
    let Application : EmberApplication
    let RSVP      : RSVPType



    // export types so that other interfaces can extend from Ember.***
    type Array<T> = EmberArray<T>
    type Object<ObjectOptions>    = EmberObject<ObjectOptions>
    type Controller= EmberController
    type Component = EmberComponent
    type Route     = EmberRoute
    type Router    = EmberRouter
    type Mixin     = EmberMixin
    type Service   = EmberService
    type Logger    = EmberLogger
    type Application = EmberApplication
    type RSVP      = RSVPType

    // @TODO:
    let run : EmberRun
    let Helper : any
    let String : EmberString

    // getters and setters
    let get       : getter
    let set       : setter

    // services
    let inject    : DependencyInjection

    // helpers
    let guidFor   : guidFor
    let isNone    : isNone
    let isArray   : isArray
    let assert    : assert

    // computed properties
    // wrapping the computed properties in a type such as "EmberComputedPropertyReadonly<T>" would
    // make it possible to catch accidental set() on a computed property (though it seems this
    // can lead to issues if we assign properties like `store` to type EmberDataStore, and then attempt to `this.get('store')`)

    // @TODO:
    // - guard computed properties against overwriting through `.set()`
    // - set the proper `this` context (either with a `this parameter` or a `ThisType<T>` annotation)
    type ComputedPropertyFunc<T> = () => T

    interface EmberComputedPropertyReadonly<T> {

    }
    interface EmberComputedProperty<T> {
        readOnly: () => EmberComputedPropertyReadonly<T> | T
    }
    namespace computed {
        type oneWay = <T>(observedProperty1: string) => T | EmberComputedProperty<T>
        let oneWay : oneWay
    }

    function computed<T>(fn: ComputedPropertyFunc<T>): T
    function computed<T>(observedProperty1: string, fn: ComputedPropertyFunc<T>): T
    function computed<T>(observedProperty1: string, observedProperty2: string, fn: ComputedPropertyFunc<T>): T
    function computed<T>(observedProperty1: string, observedProperty2: string, observedProperty3: string, fn: ComputedPropertyFunc<T>): T
    function computed<T>(observedProperty1: string, observedProperty2: string, observedProperty3: string, observedProperty4: string, fn: ComputedPropertyFunc<T>): T
    function computed<T>(observedProperty1: string, observedProperty2: string, observedProperty3: string, observedProperty4: string, observedProperty5: string, fn: ComputedPropertyFunc<T>): T
    function computed<T>(observedProperty1: string, observedProperty2: string, observedProperty3: string, observedProperty4: string, observedProperty5: string, observedProperty6: string, fn: ComputedPropertyFunc<T>): T
    // ...extend number of observed properties as needed

    type ObserverFunc<T> = () => T
    function observer<T, F extends ObserverFunc<T>>(fn: F): F
    function observer<T, F extends ObserverFunc<T>>(observedProperty1: string, fn: F): F
    function observer<T, F extends ObserverFunc<T>>(observedProperty1: string, observedProperty2: string, fn: F): F
    function observer<T, F extends ObserverFunc<T>>(observedProperty1: string, observedProperty2: string, observedProperty3: string, fn: F): F
    function observer<T, F extends ObserverFunc<T>>(observedProperty1: string, observedProperty2: string, observedProperty3: string, observedProperty4: string, fn: F): F
    function observer<T, F extends ObserverFunc<T>>(observedProperty1: string, observedProperty2: string, observedProperty3: string, observedProperty4: string, observedProperty5: string, fn: F): F
    function observer<T, F extends ObserverFunc<T>>(observedProperty1: string, observedProperty2: string, observedProperty3: string, observedProperty4: string, observedProperty5: string, observedProperty6: string, fn: F): F



    // re-export jQuery
    // @TODO: do this in index.d.ts?
    let $ : any

    // Using deprecated feature flags should give a compile-time warning too
    let MODEL_FACTORY_INJECTIONS : never
}


// allow import Ember from "./ember-types" (relative path)
// export default Ember


// allow import Ember from "ember-types"
declare module "ember-types" {
// declare module Ember {
    export default Ember
}

// TODO: tie ember and ember-data together via index.d.ts?
interface EmberRoute {
    // declare the Ember Data Store injection for all Ember.Routes
    store: EmberDataStore
}
