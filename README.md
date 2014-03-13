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

A string value that is used to provide the jscrambler api with the access key.

##### options.keys.secretKey
Type: `String`

A string value that is used to sign requests to the jscrambler api.

#### JScrambler Parameters

The following options are passed to the jscrambler API. More information about them can be found at https://jscrambler.com/en/help/webapi/documentation

##### options.params.asserts_elimination
Type: `String`

`name1;name2;...` - assert function names

Remove function definitions and function calls with a given name.

##### options.params.constant_folding
Type: `String`

`%DEFAULT%` - enable constant folding

Simplifies constant expressions at compile-time to make your code faster at run-time.

##### options.params.dead_code
Type: `String`

`%DEFAULT%` - enable dead code

Randomly injects dead code into the source code.

##### options.params.dead_code_elimination
Type: `String`

`%DEFAULT%` - enable dead code elimination

Removes dead code and void code from your JavaScript.

##### options.params.debugging_code_elimination
Type: `String`

`name1;name2;...` - debugging code names

Removes statements and public variable declarations used to control the output of debugging messages that help you debug your code.

##### options.params.dictionary_compression
Type: `String`

`%DEFAULT%` - enable dictionary compression

Dictionary compression to shrink even more your source code.

##### options.params.domain_lock
Type: `String`

`domain1;domain2;...` - your domains

Locks your project to a list of domains you specify.

##### options.params.dot_notation_elimination
Type: `String`

`%DEFAULT%` - enable dot notation elimination

Transforms dot notation to subscript notation.

##### options.params.exceptions_list
Type: `String`

`name;name1;name2;...` - list of exceptions that will never be replaced or used to create new declarations

There are some names that should never be replaced or reused to create new declarations e.g. document, toUpperCase. Public declarations existing in more than one source file should not be replaced if you submit only a part of the project where they appear. Therefore a list of irreplaceable names and the logic to make distinction between public and local names already exists on JScrambler to avoid touching those names. Use this parameter to add your own exceptions.

##### options.params.expiration_date:
Type: `String`

`date` - date format YYYY/MM/DD

Sets your JavaScript to expire after a date of your choosing.

##### options.params.function_outlining
Type: `String`

`%DEFAULT%` - enable function outlining

Turns statements into new function declarations.

##### options.params.function_reorder
Type: `String`

`%DEFAULT%` - enable function reordering

Randomly reorders your source code's function declarations.

##### options.params.ignore_files
Type: `String`

`filename;filename1` - List of files (relative paths) to be ignored

Define a list of files (relative paths) that JScrambler must ignore.

##### options.params.literal_hooking
Type: `String`

`min;max[;percentage]` - min and max predicates in ternary operator and percentage chance of replacement

Replaces literals by a randomly sized chain of ternary operators. You may configure the minimum and maximum number of predicates per literal, as the occurrence probability of the transformation. This allows you to control how big the obfuscated JavaScript grows and the potency of the transformation.

##### options.params.literal_duplicates
Type: `String`

`%DEFAULT%` - enable literal duplicates

Replaces literal duplicates by a symbol.

##### options.params.member_enumeration
Type: `String`

`%DEFAULT%` - enable member enumeration

Replaces Browser and HTML DOM objects by a member enumeration.

##### options.params.mode
Type: `String`

`starter` - Standard protection and optimization behavior. Enough for most JavaScript applications
`mobile` - Transformations are applied having into account the limitations and needs of mobile devices
`html5` - Protects your HTML5 and Web Gaming applications by targeting the new HTML5 features

##### options.params.name_prefix
Type: `String`

Set a prefix to be appended to the new names generated by JScrambler.

##### options.params.rename_local
Type: `String`

`%DEFAULT%` - enable rename local

Renames local names only. The best way to replace names without worrying about name dependencies.

##### options.params.string_splitting:
Type: `String`

`occurrences[;concatenation]`

occurrences - Percentage of occurrences. Accepted values between 0.01 and 1.
concatenation - Percentage of concatenation occurrences. Accepted values between 0 and 1 (0 means chunks of a single character and 1 the whole string).

##### options.params.whitespace
Type: `String`

`%DEFAULT%` - enable whitespace

Shrink the size of your JavaScript removing unnecessary whitespaces and newlines from the source code.

### Usage Example

Usage examples are given in the examples directory.

### To Do
* Better error report/output
* Other API methods besides uploading/downloading JScrambled files