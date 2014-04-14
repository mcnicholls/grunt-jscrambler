/**
 * grunt-jscrambler
 * @author José Magalhães (magalhas@gmail.com)
 * @license MIT <http://opensource.org/licenses/MIT>
 */
'use strict';

var _ = require('lodash');
var fs = require('fs-extra');
var jScrambler = require('jscrambler');
var JSZip = require('jszip');
var path = require('path');

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
    var projectId;
    var client = new jScrambler.Client({
      accessKey: options.keys.accessKey,
      secretKey: options.keys.secretKey
    });
    if (this.data.files.length > 1) {
      grunt.fail.fatal('Grunt jScrambler only supports one set of files.');
    }
    var params = _.extend(_.omit(options, 'keys', 'params'), options.params);
    params.files = this.filesSrc;
    jScrambler
      .uploadCode(client, params)
      .then(function (res) {
        projectId = res.id;
        return jScrambler.downloadCode(client, res.id);
      })
      .then(function (res) {
        return jScrambler.unzipProject(res, files[0].orig.dest);
      })
      .then(function () {
        if (options.deleteProject) {
          return jScrambler.deleteCode(client, projectId);
        }
      })
      .then(done)
      .fail(function (err) {
        grunt.fail.fatal(err);
      });
  });
};
