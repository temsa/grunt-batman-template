module.exports = function(grunt) {

  "use strict";

  // Project configuration.
  grunt.initConfig({

    batman: {
      namespaced: {
        src: ['test/templates/**/*.html'],
        dest: 'test/tmp/foo.js'
      },
      global: {
        src: ['test/templates/**/*.html'],
        dest: 'test/tmp/bar.js'
      }
    },

    test: {
      files: ['test/template-client_test.js']
    },

    lint: {
      files: ['grunt.js', 'tasks/**/*.js', 'test/template-client_test.js']
    },

    watch: {
      files: '<config:lint.files>',
      tasks: 'default'
    },

    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        node: true,
        es5: true
      },
      globals: {
        Hogan: true,
        foo: true,
        window: true
      }
    }
  });

  // Load local tasks.
  grunt.loadTasks('tasks');

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-bump');

  // Default task.
  grunt.registerTask('default', 'lint batman test');

};
