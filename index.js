/* jshint node: true */
"use strict";

module.exports = {
  name: "ember-hellgate",

  included(app, parentAddon) {
    let target = parentAddon || app;
    target.options = target.options || {};
    target.options.babel = target.options.babel || { includePolyfill: true };
    target.import("vendor/ember-hellgate.css");
    return this._super.included.apply(this, arguments);
  },
};
