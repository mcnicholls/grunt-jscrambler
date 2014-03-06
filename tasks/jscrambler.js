/*
 * grunt-jscrambler
 * @author José Magalhães (magalhas@gmail.com)
 * @license MIT <http://opensource.org/licenses/MIT>
 */
'use strict';
var _ = require('lodash');
var fs = require('fs-extra');
var jScrambler = require('jscrambler');
module.exports = function (grunt) {
  grunt.registerMultiTask('jscrambler', 'Obfuscate your source files', function() {
    var done = this.async();
    var options = this.options({
      keys: {
        accessKey: '',
        secretKey: ''
      },
      files: [],
      out: './out/out.zip',
      mode: 'mobile',
      whitespace: '%DEFAULT%',
      rename_local: '%DEFAULT%',
      literal_duplicates: '%DEFAULT%',
      function_reorder: '%DEFAULT%',
      //domain_lock: '%DEFAULT%',
      expiration_date: '%DEFAULT%',
      literal_hooking: '%DEFAULT%',
      dot_notation_elimination: '%DEFAULT%',
      function_outlining: '%DEFAULT%',
      dictionary_compression: '%DEFAULT%'
    });
    var projectId;
    var client = new jScrambler.Client({
      accessKey: options.keys.accessKey,
      secretKey: options.keys.secretKey
    });
    var writeFile = function (res) {
      fs.outputFileSync(options.out, res);
      done();
    };
    var onError = function (err) {
      console.error('There was an error executing the task: %s HTTP Code', err.statusCode);
      throw new Error(err);
    };
    var requestInfo = function () {
      var projectFinished = false;
      // Get projects info to check for status
      jScrambler
        .getInfo(client)
        .then(function (res) {
          for (var i = 0, l = res.length; i < l; i++) {
            // Find projectId inside the response
            if (res[i].id === projectId) {
              // Did it finish?
              if (res[i].finished_at) {
                // Download the project zip file
                jScrambler
                  .downloadCode(client, projectId)
                  .then(writeFile)
                  .fail(onError);
                projectFinished = true;
              }
              break;
            }
          }
          // Try again later...
          if (!projectFinished) setTimeout(requestInfo, 1000);
        });
    };
    jScrambler
      .uploadCode(client, _.omit(options, 'keys', 'out'))
      .then(function (res) {
        projectId = res.id;
        requestInfo();
      })
      .fail(onError);
  });
};
