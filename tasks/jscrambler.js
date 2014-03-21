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
      }
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
    var writeFiles = function (res) {
      if (zipOutput) {
        fs.outputFileSync(files[0].dest, res);
      }
      else {
        unzipFiles(res);
      }
      done();
    };
    var onError = function (err) {
      grunt.fail.fatal(err);
    };
    var unzipFiles = function (zipFile) {
      var zip = new JSZip(zipFile),
        file,
        dest,
        buffer;

      for (file in zip.files) {
        dest = filePaths[file];
        buffer = zip.file(file).asNodeBuffer();
        if (/\/$/.test(dest)) {
          grunt.file.mkdir(dest);
          dest = path.join(dest, file);
        } else {
          grunt.file.mkdir(path.dirname(dest));
        }
        fs.writeFileSync(dest, buffer);
      }
    };
    var filePaths = {};
    var zipOutput = false;
    this.files.forEach(function (f) {
      if (path.extname(f.dest) === '.zip') {
        if (this.files.length > 1) {
          grunt.fail.fatal('Only one set of files is supported when outputing a zip');
        }
        zipOutput = true;
      }
      f.src.forEach(function (s) {
        filePaths[path.basename(s)] = f.dest;
      });
    }, this);
    var params = _.extend(_.omit(options, 'keys', 'params'), options.params);
    params.files = this.filesSrc;
    jScrambler
      .uploadCode(client, params)
      .then(function (res) {
        return jScrambler.downloadCode(client, res.id);
      })
      .then(writeFiles)
      .fail(onError);
  });
};
