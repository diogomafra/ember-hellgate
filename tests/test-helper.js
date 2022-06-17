import Application from "../app";
import config from "../config/environment";
import { start } from "ember-qunit";
import { setApplication } from "@ember/test-helpers";
import * as QUnit from "qunit";
import { setup } from "qunit-dom";

setup(QUnit.assert);
setApplication(Application.create(config.APP));
start();
