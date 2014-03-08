'use strict';

module.exports = function(grunt) {
    grunt.initConfig({
        clean: {
            test: ['.tmp']
        },
        jscrambler: {
            test: {
                options: {
                    keys: grunt.file.readJSON('jscrambler_keys.json'),
                    mode: 'starter'
                },
                files: [
                    { src: ['Gruntfile.js'], dest: '.tmp/'},
                    {
                        expand: true,
                        src: ['tasks/*.js'],
                        dest: '.tmp/',
                        ext: '.min.js'
                    }
                ]
            }
        }
    });

    grunt.loadTasks('tasks');

    grunt.loadNpmTasks('grunt-contrib-clean');

    grunt.registerTask('default', ['jscrambler']);
};