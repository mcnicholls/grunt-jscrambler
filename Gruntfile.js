'use strict';

module.exports = function (grunt) {
  grunt.initConfig({
    clean: {
      test: ['.tmp']
    },
    jscrambler: {
      test: {
        options: {
          keys: grunt.file.readJSON('jscrambler_keys.json'),
          deleteProject: true
        },
        files: [
          {
            expand: true,
            src: ['tasks/**/*.js'],
            flatten: true,
            dest: '.tmp'
          }
        ]
      }
    }
  });
  grunt.loadTasks('tasks');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.registerTask('default', ['clean', 'jscrambler']);
};
