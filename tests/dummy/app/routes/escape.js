import Ember from 'ember';

export default Ember.Route.extend({

  actions: {
    setMessage(message) {
      var applicationController = this.controllerFor('application');
      applicationController.set('message', message);
    }
  }
});
