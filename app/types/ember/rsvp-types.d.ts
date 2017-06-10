// RSVP taken from
// https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/ember/index.d.ts

// Get an alias to the global Array type to use in inner scope below.
type GlobalArray<T> = T[];
declare module RSVP {
    type PromiseResolve<T> = (value?: T) => void;
    type PromiseReject<U> = (reason?: U) => void;
    type PromiseResolverFunction<T, U> = (resolve: PromiseResolve<T>, reject: PromiseReject<U>) => void;

    interface Thenable<T, U> {
        then<V, X>(onFulfilled?: (value: T) => V | Thenable<V, X>, onRejected?: (error: any) => X | Thenable<V, X>): Thenable<V, X>;
        then<V, X>(onFulfilled?: (value: T) => V | Thenable<V, X>, onRejected?: (error: any) => void): Thenable<V, void>;
    }

    class Promise<T, U> implements Thenable<T, U> {
        /**
            Promise objects represent the eventual result of an asynchronous operation. The
            primary way of interacting with a promise is through its `then` method, which
            registers callbacks to receive either a promise's eventual value or the reason
            why the promise cannot be fulfilled.
            @class RSVP.Promise
            @param {function} resolver
            @param {String} label optional string for labeling the promise.
            Useful for tooling.
            @constructor
        */
        constructor(resolver: PromiseResolverFunction<T, U>, label?: string);

        /**
            The primary way of interacting with a promise is through its `then` method,
            which registers callbacks to receive either a promise's eventual value or the
            reason why the promise cannot be fulfilled.
            @method then
            @param {Function} onFulfilled
            @param {Function} onRejected
            @param {String} label optional string for labeling the promise.
            Useful for tooling.
            @return {Promise}
        */
        then<V, X>(onFulfilled?: (value: T) => V | Thenable<V, X>, onRejected?: (error: any) => X | Thenable<V, X>): Promise<V, X>;
        // tslint:disable-next-line
        then<V, X>(onFulfilled?: (value: T) => V | Thenable<V, X>, onRejected?: (error: any) => void): Promise<V, X>;
        /**
        `catch` is simply sugar for `then(undefined, onRejection)` which makes it the same
        as the catch block of a try/catch statement.
        @method catch
        @param {Function} onRejection
        @param {String} label optional string for labeling the promise.
        Useful for tooling.
        @return {Promise}
        */
        catch<V>(onRejection: (a: any) => U, label?: string): Promise<T, V>;

        /**
        `finally` will be invoked regardless of the promise's fate just as native
        try/catch/finally behaves
        @method finally
        @param {Function} callback
        @param {String} label optional string for labeling the promise.
        Useful for tooling.
        @return {Promise}
        */
        finally<V>(callback: (a: T) => V, label?: string): Promise<V, U>;

        static all<Q, R>(promises: GlobalArray<(Q | Thenable<Q, R>)>): Promise<Q[], R>;
        static race<Q, R>(promises: GlobalArray<Promise<Q, R>>): Promise<Q, R>;

        /**
            @method resolve
            @param {Any} value value that the returned promise will be resolved with
            @param {String} label optional string for identifying the returned promise.
            Useful for tooling.
            @return {Promise} a promise that will become fulfilled with the given
            `value`
            */
        static resolve<Q, R>(object?: Q | Thenable<Q, R>): Promise<Q, R>;

        /**
            @method cast (Deprecated in favor of resolve
            @param {Any} value value that the returned promise will be resolved with
            @param {String} label optional string for identifying the returned promise.
            Useful for tooling.
            @return {Promise} a promise that will become fulfilled with the given
            `value`
            */
        static cast<Q, R>(object: Q | Thenable<Q, R>, label?: string): Promise<Q, R>;

        /**
            `RSVP.Promise.reject` returns a promise rejected with the passed `reason`.
            */
        static reject(reason?: any): Promise<any, any>;
    }

    function all(promises: GlobalArray<Promise<any, any>>): Promise<any, any>;
}

// export default RSVP
declare module "rsvp-types" {
    export default RSVP
}
