(function bundleTemplates() {
  Batman.View.store.set("bar", '<h1 class="title" data-bind="title"></h1><h2 class="value" data-bind="current | prettyNumber | prepend prefix"></h2><p class="more-info" data-bind="moreinfo"></p>' );
  Batman.View.store.set("foo", '<img data-bind-src="image | prepend \'/assets\'" data-bind-width="width"/>' );
}());