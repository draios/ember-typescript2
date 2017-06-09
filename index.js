/* eslint-env node */
'use strict';

var typescript = require('broccoli-typescript-compiler').typescript;
var Funnel = require('broccoli-funnel');

/**
 * TypescriptPreprocessor
 *
 * TODO: move into separate file
 */
function TypescriptPreprocessor(options) {
  this.name = 'ember-typescript';
  this.options = options || {};
}

TypescriptPreprocessor.prototype.ext = ['.ts', '.js'];

TypescriptPreprocessor.prototype.toTree = function(tree, inputPath, outputPath) {

  // TODO: typechecking on app/tests files?)
  if (tree._annotation === 'ProcessedTestTree') {
    return tree;
  }

  // move compiled back into frontend/
  tree = new Funnel(tree, {
    srcDir: this.options.appName,
    //include: ['**/*.js'],
    // the destDir path will be shown in the Ember console window (by broccoli-typescript-compiler)
    // e.g.
    // /app/helpers/my-helper.js(15,22): Property 'name' does not exist on type User
    destDir: 'app'
  });

  // compile ts (into frontend-ts-compiled, as configured in tsconfig)
  tree = typescript(tree, this.options);

  // move compiled back into frontend/
  tree = new Funnel(tree, {
    srcDir: 'frontend-ts-compiled',
    include: ['**/*.js'],
    destDir: 'frontend'
  });
  return tree;
};

/**
 * End TypescriptPreprocessor
 */



module.exports = {
  name: 'ember-typescript2',

  isDevelopingAddon: function() {
    return true;
  },

  included: function(app, parentAddon) {
    this._super.included.apply(this, arguments);
    var target = (parentAddon || app);

    console.log("Loaded Ember Typescript2 Addon for app: [", app.name , "]");

    // use the provided broccoli-tsconfig
    var tsplugin = new TypescriptPreprocessor({
        tsconfig: __dirname + '/broccoli-tsconfig.json',
        annotation: this.name,
        appName: target.name
    });

    /**************************************************
     * HACK: give ember-typescript2 priority over babel
     *
     *       note that this will probably mess with
     *       other plugins that depend on babel
     *
     * TODO: find out what the proper way is to prioritize
     **************************************************/

    var plugins = target.registry.load('js');
    var babel;
    plugins.forEach(function(plugin) {

      if (plugin.name === 'ember-cli-babel') {
        console.log('[registry] removing ember-cli-babel');
        babel = plugin;
        target.registry.remove('js', plugin);
      }
    });
    console.log('[registry] adding ember-typescript2');
    target.registry.add('js', tsplugin);
    console.log('[registry] adding ember-cli-babel');
    target.registry.add('js', babel);

    return target;
  }

};
