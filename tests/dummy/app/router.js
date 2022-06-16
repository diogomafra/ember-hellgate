import EmberRouter from "@ember/routing/router";
import config from "./config/environment";

export default class Router extends EmberRouter {
  location = config.locationType;
}

Router.map(function () {
  this.hellgate("test1", "/test1.html");
  this.hellgate("test2", "/test2.html");
  this.hellgate("escape", "/test-escape.html");
  this.route("nested", function () {
    this.route("regular");
    this.hellgate("page", "/nested-page.html");
  });
});
