import { module, test } from "qunit";
import { setupApplicationTest } from "ember-qunit";
import { visit, waitFor, waitUntil, find, click } from "@ember/test-helpers";

module("Acceptance: show page", function (hooks) {
  setupApplicationTest(hooks);

  test("displays the correct page", async function (assert) {
    await visit("/test1");
    await iframeHasUrlWithContent(assert, "/test1.html", "My first test");

    await visit("/test2");
    await iframeHasUrlWithContent(assert, "/test2.html", "My second test");
  });

  test("displays hellgates inside nested routes", async function (assert) {
    await visit("/nested/page");
    assert.dom(".header-title").hasText("Nested header");
    await iframeHasUrlWithContent(
      assert,
      "/nested-page.html",
      "My nested page"
    );
  });

  test("displays nested ember pages next to a hellgate", async function (assert) {
    await visit("/nested");
    assert.dom(".header-title").hasText("Nested header");
    assert.dom("span").hasText("My nested index page");

    await visit("/nested/regular");
    assert.dom(".header-title").hasText("Nested header");
    assert.dom("span").hasText("My regular Ember page");
  });

  test("navigates through links", async function (assert) {
    await visit("/");
    await click("a.link2");
    await iframeHasUrlWithContent(assert, "/test2.html", "My second test");

    await visit("/");
    await click("a.link1");
    await iframeHasUrlWithContent(assert, "/test1.html", "My first test");
  });

  test("allows to escape hell", async function (assert) {
    await visit("/test1");
    assert.dom("#the-message").hasNoText();

    await visit("/escape");
    await waitUntil(() => find("#the-message").textContent);
    assert.dom("#the-message").hasText("hello");
  });

  async function iframeHasUrlWithContent(assert, url, content) {
    await waitFor("iframe");
    assert.dom("iframe").hasAttribute("src", url);

    const nestedSpanElement = await waitUntil(function () {
      return find("iframe").contentDocument.querySelector("span");
    });

    assert.equal(nestedSpanElement.textContent, content);
  }
});
