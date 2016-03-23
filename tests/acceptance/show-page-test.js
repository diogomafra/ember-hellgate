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

test('displays hellgates inside nested routes', function(assert) {
  visit('/nested/page');
  andThen(function() {
    assert.equal(find('.header-title').text(), 'Nested header');
    iframeHasUrlWithContent(assert, '/nested-page.html', 'My nested page');
  });
});

test('displays nested ember pages next to a hellgate', function(assert) {
  visit('/nested');
  andThen(function() {
    assert.equal(find('.header-title').text(), 'Nested header');
    assert.equal(find('span').text(), 'My nested index page');
  });

  visit('/nested/regular');
  andThen(function() {
    assert.equal(find('.header-title').text(), 'Nested header');
    assert.equal(find('span').text(), 'My regular Ember page');
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
