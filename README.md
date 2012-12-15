# grunt-batman-template
forked from grunt-template-client package

> Compile any and all templates into a ready to use script include.

## Getting Started
Install this grunt plugin next to your project's [grunt.js gruntfile][getting_started] with: `npm install grunt-batman-template`

Then add this line to your project's `grunt.js` gruntfile:

```javascript
grunt.loadNpmTasks('grunt-batman-template');
```

[grunt]: http://gruntjs.com/
[getting_started]: https://github.com/gruntjs/grunt/blob/master/docs/getting_started.md

## Example
given the following config and template
### config
```javascript
  templateclient: {
    dist: {
		src: ['templates/**/*.html'],
		dest: 'dist/tmpl.js' 
    }
  }
```
### templates
#### templates/clock.html
```html
<h1 data-bind="date"></h1>
<h2 data-bind="time"></h2>
```
#### templates/graph.html
```html
<h1 class="title" data-bind="title"></h1>

<h2 class="value" data-bind="current | prettyNumber | prepend prefix"></h2>

<p class="more-info" data-bind="moreinfo"></p>
```

will output the following script file
#### dist/tmpl.js
```javascript
(function bundleTemplates() {
	 Batman.View.store.set("graph", '<h1 class="title" data-bind="title"></h1><h2 class="value" data-bind="current | prettyNumber | prepend prefix"></h2><p class="more-info" data-bind="moreinfo"></p>' );
	 Batman.View.store.set("clock", '<h1 data-bind="date"></h1><h2 data-bind="time"></h2>' );
}());
```
ready to use/include/concat etc.

## Todo
I guess there will be need to tweek the regex that cleans the template.

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [grunt][grunt].

## Release History
* 0.2.1 - Forked to make it specific to Batman
* 0.2.0 - Forked from https://github.com/ullmark/grunt-hogan-client to make generic.
* 0.1.1 - Initial release

## License
Copyright (c) 2012 Florian Traverse 
Licensed under the MIT license.
