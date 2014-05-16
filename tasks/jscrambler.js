/**
 * grunt-jscrambler
 * @author José Magalhães (magalhas@gmail.com)
 * @license MIT <http://opensource.org/licenses/MIT>
 */
'use strict';

var _ = require('lodash');
var jScrambler = require('jscrambler');

module.exports = function (grunt) {
  grunt.registerMultiTask('jscrambler', 'Obfuscate your source files', function () {
    var done = this.async();
    var files = this.files;
    var options = this.options({
      keys: {
        accessKey: '',
        secretKey: ''
      },
      deleteProject: false
    });
    if (!options.params) {
      // By default the params are optimized for Node.js
      options.params = {
        rename_local: '%DEFAULT%',
        whitespace: '%DEFAULT%',
        literal_hooking: '%DEFAULT%',
        dead_code: '%DEFAULT%',
        dot_notation_elimination: '%DEFAULT%',
        dead_code_elimination: '%DEFAULT%',
        constant_folding: '%DEFAULT%',
        literal_duplicates: '%DEFAULT%',
        function_outlining: '%DEFAULT%',
        string_splitting:'%DEFAULT%'
      };
    }
    if (this.data.files.length > 1) {
      grunt.fail.fatal('Grunt jScrambler only supports one set of files.');
    }
    jScrambler
      .process({
        host: options.host,
        port: options.port,
        apiVersion: options.apiVersion,
        keys: options.keys,
        filesSrc: this.filesSrc,
        filesDest: files[0].orig.dest,
        params: options.params
      })
      .then(done)
      .fail(function (err) {
        grunt.fail.fatal(err);
      });
  });
};
