/*
 * grunt-batman-template
 * forked from https://github.com/markus.ullmark/grunt-hogan-client
 *
 * Copyright (c) 2012 Florian Traverse
 * Licensed under the MIT license.
 */

module.exports = function(grunt) {

	"use strict";

	grunt.util = grunt.util || grunt.utils;
	
	var _ = grunt.utils._;

	var path = require('path'),
		fs = require('fs'),
		cleaner = /^\s+|\s+$|[\r\n]+/gm;

	// Please see the grunt documentation for more information regarding task and
	// helper creation: https://github.com/gruntjs/grunt/blob/master/docs/toc.md

	// ==========================================================================
	// TASKS
	// ==========================================================================

	grunt.registerMultiTask('batman', 'combines batmans templates into a script to include in your page', function() {
		// grap the filepattern
		var files = grunt.file.expandFiles(this.file.src);
//console.log('batman templates:\n', files.join('\n'))
		// create the hogan include
		var src = grunt.helper('batman', files, this.data.options);
		// write the new file
		grunt.file.write(this.file.dest, src);
		// log our success
		grunt.log.writeln('File "' + this.file.dest + '" created.');
	});

	// ==========================================================================
	// HELPERS
	// ==========================================================================

	grunt.registerHelper('batman', function(files, options) {
		var js = '';

		options = _.defaults(options || {}, {
			key: function(filepath) {
				return path.basename(filepath, path.extname(filepath));
			}
		});

		js += '(function bundleBatmanTemplates() {' + grunt.utils.linefeed;
		
		files.map(function(filepath) {
//console.log('filepath:', filepath)

			var key = options.key(filepath);
			var contents = grunt.file.read(filepath).replace(cleaner, '').replace(/'/g, "\\'");
//console.log('contents:', contents)
			js += '  Batman.View.store.set("' + key + '", \'' + contents + '\' );' + grunt.utils.linefeed;
		});

		js += '}());' + grunt.utils.linefeed;

		return js;
	});

};
