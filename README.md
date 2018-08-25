# My-Tutorials

My-Tutorials is a platform where students could seek for tutorials as well as tutors could register tutorials. The website is lightweight, interactive, RESTful, could support reasonable size Database. The front-end and back-end are powered by Vue.JS and Node.JS respectively.

## Features

  - User sign-up and log-in/log-out
  - Different classes of User have different profile page
  - Students browse through tutorials
  - Tutors register new tutorials
  - Students enroll in selected tutorials
  - Students check out payment

Users can also:
  - Edit profile page, update personal information
  - Check tutorial history

## Technologies

My-Tutorials uses a number of open source projects to work properly:

* [Vue.js](https://vuejs.org/) - The Progressive JavaScript Framework
* [Node.js](https://nodejs.org/en/) - Asynchronous event driven JavaScript runtime for the back-end
* [Express](http://expressjs.com/) - Fast Node.js web application framework
* [Webpack](https://webpack.js.org/) - A static module bundler for modern JavaScript applications
* [Babel](https://babeljs.io/) - A JavaScript compiler
* [Element](http://element.eleme.io/#/en-US) - Vue 2.0 based component library 

## Installation Guide (client side)

### Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```
## Installation Guide (server side)

### Project setup
```
npm install npm install gulp-cli -g (if you haven't install gulp)
npm install
```
### Compiles and hot-reloads for development
```
gulp serve
```


## Code Style
### JavaScript
##### File name
File names must be all lowercase and may include underscores (_) or dashes (-), but no additional punctuation. Follow the convention that your project uses. Filenames’ extension must be .js.
##### File encoding: UTF-8
Source files are encoded in UTF-8.
##### Whitespace characters
Aside from the line terminator sequence, the ASCII horizontal space character (0x20) is the only whitespace character that appears anywhere in a source file. This implies that
All other whitespace characters in string literals are escaped, and
Tab characters are not used for indentation
##### Use single quotes
Ordinary string literals are delimited with single quotes ('), rather than double quotes (").
##### Braces are used for all control structures
Braces are required for all control structures (i.e. if, else, for, do, while, as well as any others), even if the body contains only a single statement. The first statement of a non-empty block must begin on its own line.
##### Block comment style
Block comments are indented at the same level as the surrounding code. They may be in /* … */ or //-style. For multi-line /* … */ comments, subsequent lines must start with * aligned with the * on the previous line, to make comments obvious with no extra context. “Parameter name” comments should appear after values whenever the value and method name do not sufficiently convey the meaning.
##### Use const and let
Declare all local variables with either const or let. Use const by default, unless a variable needs to be reassigned. The var keyword must not be used.
One variable per declaration
Every local variable declaration declares only one variable: declarations such as let a = 1, b = 2; are not used.
##### Constructors
Constructors are optional for concrete classes. Subclass constructors must call super() before setting any fields or otherwise accessing this. Interfaces must not define a constructor.
##### Class names
Class, interface, record, and typedef names are written in UpperCamelCase. 
##### Method names
Method names are written in lowerCamelCase. Private methods’ names must end with a trailing underscore.
##### Constant names
Constant names use CONSTANT_CASE: all uppercase letters, with words separated by underscores

### HTML & CSS
##### Document Type
Use HTML5.
HTML5 (HTML syntax) is preferred for all HTML documents: <!DOCTYPE html>.
##### Capitalization
Use only lowercase.
All code has to be lowercase: This applies to HTML element names, attributes, attribute values (unless text/CDATA), CSS selectors, properties, and property values (with the exception of strings).
##### Indentation
Indent by 2 spaces at a time.
Don’t use tabs or mix tabs and spaces for indentation.
##### ID and Class Naming
Use meaningful or generic ID and class names.

## Addition
[Vue.js](https://vuejs.org/) does not support IE8 and below, because it uses ECMAScript 5 features that are un-shimmable in IE8. However it supports all ECMAScript 5 compliant browsers.
