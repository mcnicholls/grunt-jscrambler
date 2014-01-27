# Never used Node.js and Grunt before
Please install [Node.js](http://nodejs.org/download/)

On the root of your project create package.json:
```js
{
  "dependencies": {
    "grunt": "*",
    "grunt-jscrambler": "*"
  }
}
```
Also create Gruntfile.js (edit options as needed):
```js
exports = module.exports = function (grunt) {
  'use strict';
  grunt.initConfig({
    jscrambler: {
      main: {
        params: {
          files: ['file1.js', 'file2.js']
        },
        accessKey: '',
        secretKey: '',
        out: './out/out.zip' // default value
      }
    }
  });
  grunt.loadNpmTasks('grunt-jscrambler');
};
```
Through the shell, on the root of your project run:
```shell
npm install -g grunt-cli
npm install
```
Now run your task:
```shell
grunt jscrambler
```