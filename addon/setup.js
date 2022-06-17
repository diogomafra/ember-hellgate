import Ember from "ember";
import EmberRouter from "@ember/routing/router";
import { getOwner } from "@ember/application";
import { dasherize } from "@ember/string";
import { run } from "@ember/runloop";
import HellgateController from "./controller";
import template from "ember-hellgate/templates/view";

const { RouterDSL } = Ember;

const gates = [];

function canNest(dsl) {
  return dsl.parent && dsl.parent !== "application";
}

function getFullName(dsl, name, resetNamespace) {
  if (canNest(dsl) && resetNamespace !== true) {
    return `${dsl.parent}.${name}`;
  } else {
    return name;
  }
}

const setupHellgate = () => {
  RouterDSL.prototype.hellgate = function (name, url, options = {}) {
    if (!name || !url) {
      throw new Error(
        "You must provide at least a name and URL to `hellgate`."
      );
    }

    this.route(name, options);

    const fullName = getFullName(this, name, options.resetNamespace);
    gates.push([fullName, url]);
  };

  EmberRouter.reopen({
    setupRouter() {
      const ret = this._super(...arguments);
      const owner = getOwner(this);

      gates.forEach(([fullName, url]) => {
        const moduleName = dasherize(fullName);
        const gateAlreadyExists = owner.lookup(`template:${moduleName}`);

        if (gateAlreadyExists) {
          return;
        }

        const Controller = class extends HellgateController {
          url = url;
        };
        owner.register(`template:${moduleName}`, template);
        owner.register(`controller:${moduleName}`, Controller);
      });

      window.escapeHell = (...args) => {
        run(() => {
          this.send(...args);
        });
      };

      return ret;
    },
  });
};

export default setupHellgate;
