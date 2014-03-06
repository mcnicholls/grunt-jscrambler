'use strict';

module.exports = function(grunt) {
    grunt.initConfig({
        clean: {
            test: ['tmp']
        },
        jscrambler: {
            test: {
                options: {
                    keys: grunt.file.readJSON('jscrambler_keys.json'),
                    mode: 'starter'
                },
                files: [
                    { src: ['Gruntfile.js'], dest: 'tmp/out.zip'}
                ]
            }
        }
    });

    grunt.loadTasks('tasks');

    grunt.loadNpmTasks('grunt-contrib-clean');

    grunt.registerTask('default', ['jscrambler']);
};