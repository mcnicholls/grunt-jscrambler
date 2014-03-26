# grunt-jscrambler

> Obfuscate your source files.

## Getting Started
This plugin requires Grunt `~0.4.2`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-jscrambler --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-jscrambler');
```

## The "jscrambler" task

### Overview
In your project's Gruntfile, add a section named `jscrambler` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  jscrambler: {
    main: {
      options: {
        keys: {
          accessKey: '',
          secretKey: ''
        }
      },
      files: [
        {src: ['foo.js', 'bar.js'], dest: 'output/'},
      ]
    }
  },
});
```
### Options

#### Task Options

##### options.keys.accessKey
Type: `String`

A string value that is used to provide the JScrambler API with the access key.

##### options.keys.secretKey
Type: `String`

A string value that is used to sign requests to the JScrambler API.

##### options.deleteProject
Type: `Boolean`

If this is set to `true` then the project will be delete from JScrambler after it has been downloaded.

##### options.params
Type: `Object`

You can find a list of all the possible parameters in [here](https://github.com/auditmark/node-jscrambler#jscrambler-options).

### Usage Example

Usage examples are given in the examples directory.

### To Do
* Better error report/output
* Other API methods besides uploading/downloading JScrambled files
