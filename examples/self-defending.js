'use strict';

module.exports = function(grunt) {
  grunt.initConfig({
    clean: {
      build: ['build']
    },
    jscrambler: {
      selfdefending: {
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
            string_splitting: '%DEFAULT%',
            function_reorder: '%DEFAULT%',
            function_outlining: '%DEFAULT%',
            dot_notation_elimination: '%DEFAULT%',
            expiration_date: '2199-01-01',
            rename_local: '%DEFAULT%',
            whitespace: '%DEFAULT%',
            literal_duplicates: '%DEFAULT%',
            self_defending: '%DEFAULT%'
          }
        }
      }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-jscrambler');
  grunt.registerTask('default', ['clean', 'jscrambler']);
};