import Ember from 'ember';
import HellgateController from './controller';
import template from "ember-hellgate/templates/view";
import getOwner from 'ember-getowner-polyfill';

const {Router, RouterDSL, String, run} = Ember;

const dasherize = String.dasherize;

let gates = [];

function canNest(dsl) {
  return dsl.parent && dsl.parent !== 'application';
}

function getFullName(dsl, name, resetNamespace) {
  if (canNest(dsl) && resetNamespace !== true) {
    return `${dsl.parent}.${name}`;
  } else {
    return name;
  }
}

function setupHellgate() {
  RouterDSL.prototype.hellgate = function(name, url, options = {}) {
    if (!name || !url) { throw new Error("You must provide at least a name and URL to `hellgate`."); }

    this.route(name, options);

    let fullName = getFullName(this, name, options.resetNamespace);
    gates.push([fullName, url]);
  };

  Router.reopen({
    setupRouter() {
      const ret = this._super(...arguments);
      const owner = getOwner(this);

      gates.forEach(([fullName, url]) => {
        let moduleName = dasherize(fullName);
        owner.register(`template:${moduleName}`, template);
        owner.register(`controller:${moduleName}`, HellgateController.extend({url: url}));
      });

      window.escapeHell = (...args) => {
        run(() => {
          this.send(...args);
        });
      };

      return ret;
    }
  });
}

export default setupHellgate;
