import Ember from 'ember';
import HellgateController from './controller';
import HellgateView from './view';

let dasherize = Ember.String.dasherize;

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
      let container = this.container;

      gates.forEach(tuple => {
        let name = tuple[0];
        let url = tuple[1];
        let moduleName = dasherize(name);

        container.register(`view:${moduleName}`, HellgateView.extend({}));
        container.register(`controller:${moduleName}`, HellgateController.extend({url: url}));
      });

      return ret;
    }
  });
}

export default setupHellgate;
