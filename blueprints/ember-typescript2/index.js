/* eslint-env node */
module.exports = {
  description: 'Enable Typescript 2.x compilation with Ember CLI',

  //
  normalizeEntityName: function() {},

  // locals: function(options) {
  //   // Return custom template variables here.
  //   return {
  //     foo: options.entity.options.foo
  //   };
  // }

  // display a help text after installing this addon
  afterInstall: function(options) {
    console.log("");
    console.log("* ember-typescript2 installed");
    console.log("* NOTE: Some manual bookkeeping is currently required for your Models and Services (see app/types/application.d.ts)");
    console.log("* Typechecking is done automatically via `ember serve`. To run the standalone Typescript compiler:");
    console.log("");
    console.log("    $ tsc");
    console.log("");
    console.log("This Addon only adds types for ember and ember-data, more types can be found in @types:");
    console.log("https://basarat.gitbooks.io/typescript/docs/types/@types.html");
  }
};
