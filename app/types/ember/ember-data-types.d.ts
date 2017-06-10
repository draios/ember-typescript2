/// <reference path="ember-types.d.ts"/>
/// <reference path="rsvp-types.d.ts"/>



// import DS = EmberData
// import { ServiceTypeIndex, ModelTypeIndex } from "application-extendable-types";
// import Test from "./application-extendable-types";
// import Ember from "./ember-types"



type ModelId = string | number
// import RSVP from "rsvp-types"
interface EmberDataStore extends EmberService {

    // "private"
    find: <K extends keyof _modelTypeIndex>(modelName: K, modelId: ModelId) => RSVP.Promise<_modelTypeIndex[K], any>



    // public
    createRecord: <K extends keyof _modelTypeIndex, V extends _modelTypeIndex[K]>(modelName: K, inputProperties: V) => _modelTypeIndex[K]
    peakRecord: <K extends keyof _modelTypeIndex>(modelName: K, modelId: ModelId) => _modelTypeIndex[K]
    findRecord: <K extends keyof _modelTypeIndex>(modelName: K, modelId: ModelId) => RSVP.Promise<_modelTypeIndex[K], any>
    findAll: <K extends keyof _modelTypeIndex>(modelName: K) => RSVP.Promise<EmberArray<_modelTypeIndex[K]>, any>

    serializerFor: <K extends keyof _modelTypeIndex>(modelName: K) => EmberDataRESTSerializer // @TODO: should be EmberDataSerializer

    unloadAll: <K extends keyof _modelTypeIndex>(modelName?: K) => void // @TODO: should be EmberDataSerializer
}

//
// DS.Model
// - all DS.attr() fields are simple types such as string, number, etc (see EmberDataModelAttributeType)
// - any computed properties are wrapped into EmberComputedPropertyReadonly<T>
// - EmberComputedPropertyReadonly is only accessible by get() and not by set()
//
interface EmberDataModel extends EmberObject<EmberDataModelOptions> {
    // TODO: this is somehow needed for get/set tuypechecking? (the inherited EmberObject is not enough)
    // extend<O extends EmberDataModelOptions>(options: O): this & O,

    // a modelName can only be one of our defined model names
    modelName: keyof _modelTypeIndex
}

interface EmberDataModelOptions extends ObjectOptions {
    // a property defined on a Model can be a
    // - computed property
    // - string,number,boolean,Date, etc
    // - another Ember model (through DS.belongsTo / DS.hasManyb)
    // [key: string]: EmberComputedPropertyReadonly<EmberDataModelAttributeType> | EmberDataModelAttributeType | EmberDataModel | any

}
type EmberDataModelAttributeType = string | number | boolean | Date


interface _modelAttributeTypes {
    "string": string
    "number": number,
    "boolean": boolean,
    "date": Date
    // TODO: attribute types for custom transforms?
}

interface ModelAttribute<EmberDataModelAttibuteType> { }

type JSONString = string
interface EmberDataAttr /* extends EmberComputedProperty */ {
    // no arguments to attr() means we get the plaintext (serialized JSON) string
    // (): JSONString
    (): JSONString

    // TODO: in reality these Model attribiutes are ComputedProperties, though for our usecase of set/get this might not matter at all?
    // @TODO: wrap the types in some sort of ModelAttribute<T> to at least indicate they are not simple object fields?
        <K extends keyof _modelAttributeTypes>(attrType: K): _modelAttributeTypes[K]
}

// <options> for DS.belongsTo(modelName, <options>)
interface EmberDataBelongsToOptions {
    inverse?: boolean
}

// DS.belongsTo
interface EmberDataBelongsTo {
    // @TODO: is this type correct?
    //        it assumes that if we 'get()' a belongsTo field, we get a Model type, however it could also be a promise if async is true?

        <K extends keyof _modelTypeIndex>(modelName: K, options?: EmberDataBelongsToOptions): _modelTypeIndex[K]
}

// <options> for DS.hasMany(modelName, <options>)
interface EmberDataHasManyOptions {
    async?: boolean
    inverse?: boolean
}

// DS.hasMany
interface EmberDataHasMany {
    <K extends keyof _modelTypeIndex>(modelName: K, options?: EmberDataHasManyOptions): _modelTypeIndex[K] | RSVP.Promise<_modelTypeIndex[K], any>
}






interface EmberDataSnapshotObject {
    id: string
    record: EmberDataModel
}
// this interface describes the object in which the user extends the Serializer
interface EmberDataRESTSerializerOptions {

    normalizeResponse?: <M extends EmberDataModel>(store: EmberDataStore, primaryModelClass: M, payload: any, id: string | number, requestType: string) => object
    normalizeArrayResponse?: <M extends EmberDataModel>(store: EmberDataStore, primaryModelClass: M, payload: any, id: string | number, requestType: string) => object

    // TODO: separate type for { key, embedded } object?
    attrs?: {
        [propertyName: string]: string | { key?: 'string', embedded?: boolean | 'always', serialize?: boolean | string, deserialize?: boolean | string }
    }


    primaryKey?: string

}
// this interface describes build-in methods and properties of the serializer
interface EmberDataRESTSerializer extends EmberObject<EmberDataRESTSerializerOptions> {

    serializeIntoHash?: (data: object, type: EmberDataModel, snapshot: EmberDataSnapshotObject, options: { includeId?: boolean } ) => void
}



// this should include our overrides
interface EmberDataRESTAdapterOptions {
    updateRecord?: (store: EmberDataStore, type: EmberDataModel, snapshot: EmberDataSnapshotObject, options: object) => RSVP.Promise<any,any>
    namespace?: string
    pathForType?: () => string
}

// this should include any build-in properties or methods
interface EmberDataRESTAdapter extends EmberObject<EmberDataRESTAdapterOptions> {
    ajax: (url: string, method: string, options: object) => RSVP.Promise<any,any>


    // @TODO: actually part of DS.BuildUrlMixin
    buildUrl: (modelName: keyof _modelTypeIndex, id: string | number | Array<string|number>, snapshot: EmberDataSnapshotObject, requestType: string, query: object ) => string
}

interface EmberDataEmbeddedRecordsMixin extends EmberMixin {}



//
//
//
declare module EmberData {
    let Model : EmberDataModel
    let attr  : EmberDataAttr
    let belongsTo  : EmberDataBelongsTo
    let hasMany  : EmberDataHasMany
    let RESTSerializer  : EmberDataRESTSerializer
    let EmbeddedRecordsMixin  : EmberDataEmbeddedRecordsMixin
    let RESTAdapter : EmberDataRESTAdapter
    let Store : EmberDataStore
}


