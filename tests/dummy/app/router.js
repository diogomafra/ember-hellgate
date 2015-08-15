import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.hellgate('test1', '/test1.html');
  this.hellgate('test2', '/test2.html');
});

export default Router;
