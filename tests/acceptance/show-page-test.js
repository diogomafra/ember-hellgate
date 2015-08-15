import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from '../helpers/start-app';

module('Acceptance: show page', {
  beforeEach() {
    this.application = startApp();
  },
  afterEach() {
    Ember.run(this.application, 'destroy');
  }
});

test('displays the correct page', function(assert) {
  visit('/test1');
  andThen(function() {
    iframeHasUrlWithContent(assert, '/test1.html', 'My first test');
  });

  visit('/test2');
  andThen(function() {
    iframeHasUrlWithContent(assert, '/test2.html', 'My second test');
  });
});


test('navigates through links', function(assert) {
  visit('/');
  click('a.link2');
  andThen(function() {
    iframeHasUrlWithContent(assert, '/test2.html', 'My second test');
  });

  visit('/');
  click('a.link1');
  andThen(function() {
    iframeHasUrlWithContent(assert, '/test1.html', 'My first test');
  });
});


test('allows to escape hell', function(assert) {
  visit('/test1');
  andThen(function() {
    Ember.run.later(() => {
      assert.equal(find('#the-message').text(), '');
    }, 100);
  });

  visit('/escape');
  andThen(function() {
    Ember.run.later(() => {
      assert.equal(find('#the-message').text(), 'hello');
    }, 100);
  });
});

function iframeHasUrlWithContent(assert, url, content) {
  // TODO: instead of waiting 200ms, check when the iframe has loaded.
  Ember.run.later(() => {
    assert.equal(find('iframe').attr('src'), url);
    assert.equal(find("iframe").contents().find('span').text(), content);
  }, 100);
}
