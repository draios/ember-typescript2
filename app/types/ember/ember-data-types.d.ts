// import DS = EmberData
// import { ServiceTypeIndex, ModelTypeIndex } from "application-extendable-types";
// import Test from "./application-extendable-types";
// import Ember from "ember"

// @TODO: remove type alias?
// type EmberArray<T> = Array<T>

//
//
// ---------------- Ember Data
// @TODO:
//  - move to separate folder
//

type ModelId = string | number
 interface EmberDataStore extends EmberService {
    createRecord: <K extends keyof _modelTypeIndex>(modelName: K) => _modelTypeIndex[K]
    find: <K extends keyof _modelTypeIndex>(modelName: K, modelId: ModelId) => _modelTypeIndex[K]
    findAll: <K extends keyof _modelTypeIndex>(modelName: K) => EmberArray<_modelTypeIndex[K]>
}

//
// DS.Model
// - all DS.attr() fields are simple types such as string, number, etc (see EmberDataModelAttributeType)
// - any computed properties are wrapped into EmberComputedPropertyReadonly<T>
// - EmberComputedPropertyReadonly is only accessible by get() and not by set()
//
interface EmberDataModel extends EmberObject<EmberDataModelOptions> {
    // TODO: this is somehow needed for get/set tuypechecking? (the inherited EmberObject is not enough)
    extend<O extends EmberDataModelOptions>(options: O): this & O,
}

interface EmberDataModelOptions extends ObjectOptions {
    // a property defined on a Model can be a
    // - computed property
    // - string,number,boolean,Date, etc
    // - another Ember model (through DS.belongsTo / DS.hasManyb)
    [key: string]: EmberComputedPropertyReadonly<EmberDataModelAttributeType> | EmberDataModelAttributeType | EmberDataModel | any

}
type EmberDataModelAttributeType = string | number | boolean | Date


interface _modelAttributeTypes {
    "string": string
    "number": number,
    "boolean": boolean,
    "date": Date
    // TODO: more types?
    // TODO: custom attribute types?
}

interface ModelAttribute<EmberDataModelAttibuteType> { }

type JSONString = string
interface EmberDataAttr extends EmberComputedProperty {
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
    (modelName: string, options?: EmberDataHasManyOptions): EmberComputedProperty
}

interface EmberDataRESTSerializerOptions { }
interface EmberDataRESTSerializer extends EmberObject<EmberDataRESTSerializerOptions> {}
interface EmberDataRESTAdapterOptions {}
interface EmberDataRESTAdapter extends EmberObject<EmberDataRESTAdapterOptions> {}
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


