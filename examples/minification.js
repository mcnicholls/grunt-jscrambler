'use strict';

module.exports = function(grunt) {
  grunt.initConfig({
    clean: {
      build: ['build']
    },
    jscrambler: {
      minification: {
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
            literal_duplicates: '%DEFAULT%'
          }
        }
      }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.registerTask('default', ['clean', 'jscrambler']);
};