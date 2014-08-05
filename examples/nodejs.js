'use strict';

module.exports = function(grunt) {
  grunt.initConfig({
    clean: {
      build: ['build']
    },
    jscrambler: {
      nodejs: {
        files: [{
          expand: true,
          src: ['lib/*.js'],
          dest: 'build/',
          ext: '.min.js'
        }],
        options: {
          keys: {
            accessKey: '',
            secretKey: ''
          },
          params: {
            rename_local: '%DEFAULT%',
            whitespace: '%DEFAULT%',
            literal_hooking: '%DEFAULT%',
            dead_code: '%DEFAULT%',
            dot_notation_elimination: '%DEFAULT%',
            literal_duplicates: '%DEFAULT%',
            function_outlining: '%DEFAULT%',
            string_splitting:'%DEFAULT%'
          }
        }
      }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-jscrambler');
  grunt.registerTask('default', ['clean', 'jscrambler']);
};
