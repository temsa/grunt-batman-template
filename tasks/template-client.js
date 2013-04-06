/*
 * grunt-batman-template
 * forked from https://github.com/markus.ullmark/grunt-hogan-client
 *
 * Copyright (c) 2012-2013 Florian Traverse
 * Licensed under the MIT license.
 */

module.exports = function(grunt) {

	"use strict";

	grunt.util = grunt.util || grunt.utils;
	
	var _ = grunt.util._;

	var path = require('path'),
		fs = require('fs'),
		cleaner = /^\s+|\s+$|[\r\n]+/gm;

	// Please see the grunt documentation for more information regarding task and
	// helper creation: https://github.com/gruntjs/grunt/blob/master/docs/toc.md

	// ==========================================================================
	// TASKS
	// ==========================================================================

	var templateClient = function(files, options, grunt) {

		"use strict";

		var cleaner = /^\s+|\s+$|[\r\n]+/gm;
		var js = '';

		js += '(function bundleBatmanTemplates() {' + grunt.util.linefeed;
		
		files.map(function(filepath) {
//console.log('filepath:', filepath)

			var key = options.key(filepath);
			var contents = grunt.file.read(filepath).replace(cleaner, '').replace(/'/g, "\\'");
//console.log('contents:', contents)
			js += '  Batman.View.store.set("' + key + '", \'' + contents + '\' );' + grunt.util.linefeed;
		});

		js += '}());' + grunt.util.linefeed;

		return js;
	};

	grunt.registerMultiTask('batman', 'combines batmans templates into a script to include in your page', function() {
		var options = this.options({
			key: function(filepath) {
				return path.basename(filepath, path.extname(filepath));
			}
		});
		this.files.forEach(function(f) {
			// create the hogan include
			var src = templateClient(f.src, options, grunt);

			// write the new file
			grunt.file.write(f.dest, src);

			// log our success
			grunt.log.writeln('File "' + f.dest + '" created.');
		});
	});

};

