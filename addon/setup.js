import Ember from 'ember';
import HellgateController from './controller';
import template from "ember-hellgate/templates/view";
import getOwner from 'ember-getowner-polyfill';

const {Router, RouterDSL, String, run} = Ember;

const dasherize = String.dasherize;

let gates = [];

function setupHellgate() {
  RouterDSL.prototype.hellgate = function(name, url, options = {}) {
    if (!name || !url) { throw new Error("You must provide at least a name and URL to `hellgate`."); }
    this.route(name, options);
    gates.push([name, url, options]);
  };

  Router.reopen({
    setupRouter() {
      const ret = this._super(...arguments);
      const owner = getOwner(this);

      gates.forEach(([name, url]) => {
        const moduleName = dasherize(name);

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
