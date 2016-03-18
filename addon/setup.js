import Ember from 'ember';
import HellgateController from './controller';
import template from "ember-hellgate/templates/view";
import getOwner from 'ember-getowner-polyfill';

const dasherize = Ember.String.dasherize;

let gates = [];

function setupHellgate() {
  Ember.RouterDSL.prototype.hellgate = function(name, url, options = {}) {
    if (!name || !url) { throw new Error("You must provide at least a name and URL to `hellgate`."); }
    this.route(name, options);
    gates.push([name, url, options]);
  };

  Ember.Router.reopen({
    setupRouter() {
      let ret = this._super(...arguments);
      let owner = getOwner(this)

      gates.forEach(tuple => {
        let name = tuple[0];
        let url = tuple[1];
        let moduleName = dasherize(name);

        owner.register(`template:${moduleName}`, template);
        owner.register(`controller:${moduleName}`, HellgateController.extend({url: url}));
      });

      window.escapeHell = (...args) => {
        Ember.run(() => {
          this.send(...args);
        });
      };

      return ret;
    }
  });
}

export default setupHellgate;
