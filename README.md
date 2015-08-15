# Ember-hellgate

[![Build Status](https://travis-ci.org/diogomafra/ember-hellgate.svg?branch=master)](https://travis-ci.org/diogomafra/ember-hellgate)

This addon helps you migrate an old application to Ember. It lets you define routes that load plain html pages inside an Ember app.

Pages loaded in a hellgate are loaded inside an iframe, so, they're totally isolated from the Ember app.

The objective of this addon is to let you create an Ember app that links to pages of the old system and, as you migrate each page to Ember, you replace the "hellgate" with normal routes.

## Install
```bash
ember install ember-hellgate
```


## Defining hellgates

In the router you call `this.hellgate(route, url)` to define the name of the route and the url that should be loaded.

```js
// app/router.js
Router.map(function() {
  this.hellgate('some-page', '/somepage.html');
  this.hellgate('my-search', 'http://google.com.br');
});
```

### Escaping hell

The page loaded inside a "hellgate" can call actions of the route. For that, you should use the function `escapeHell`.

```js
// app/router.js
Router.map(function() {
  this.hellgate('test', '/test.html');
});
```


```js
<!-- test.html (Page loaded inside a hellgate) -->
<html>
  <body>
    <span>Escape hell</span>
    <script type="text/javascript">
      window.parent.escapeHell('showMessage', 'Hello');
    </script>
  </body>
</html>
```

```js
// app/routes/test.js
export default Ember.Route.extend({
  actions: {
    showMessage(message) {
      alert(`Message from hell: ${message}`);
    }
  }
});
```

### Styling the hellgate

The hellgate generates the following HTML:

```html
<div class="hellgate-container">
  <iframe class="hellgate-iframe" src="..."></iframe>
</div>
```

So you can define styles for the container and for the iframe:

```css
.hellgate-container {
  width: 100px;
  height: 400px;
  border: 1px solid red;
}
```
