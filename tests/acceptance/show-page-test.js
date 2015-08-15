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
  assert.expect(4);

  visit('/test1');
  andThen(function() {
    assert.equal(find('iframe').attr('src'), '/test1.html');
    assert.equal(find("iframe").contents().find('span').text(), 'My first test');
  });

  visit('/test2');
  andThen(function() {
    assert.equal(find('iframe').attr('src'), '/test2.html');
    assert.equal(find("iframe").contents().find('span').text(), 'My second test');
  });
});


test('navigates through links', function(assert) {
  assert.expect(4);

  visit('/');
  click('a.link2');
  andThen(function() {
    assert.equal(find('iframe').attr('src'), '/test2.html');
    assert.equal(find("iframe").contents().find('span').text(), 'My second test');
  });

  visit('/');
  click('a.link1');
  andThen(function() {
    assert.equal(find('iframe').attr('src'), '/test1.html');
    assert.equal(find("iframe").contents().find('span').text(), 'My first test');
  });
});
