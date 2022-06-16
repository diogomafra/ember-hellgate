import { start } from "ember-qunit";
import resolver from "./helpers/resolver";
import { setResolver } from "@ember/test-helpers";

setResolver(resolver);
start();
