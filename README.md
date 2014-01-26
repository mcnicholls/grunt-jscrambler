# grunt-jscrambler

> Ofuscate your source files.

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
    options: {
      params: {
        files: [] // files to scramble
        // For other parameters please check JScrambler API documentation
      },
      accessKey: '', // required
      secretKey: '', // required
      out: 'out/out.zip' // default value
    }
  },
});
```

### To Do
* Better error report/output
* Smart paths on files configuration
* Multiple grunt configurations (multitask)
* Other API methods besides uploading/downloading JScrambled files