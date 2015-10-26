Corballis Gulp Build System
=========

An opinionated Gulp build pipeline for AngularJS apps.

Features:

 * Linting, concatenation, uglification, sourcemaps for all prod files
 * Development and production environments
 * A development server that can serve either environment
 * Watch tasks for both environments
 * Live-reload capability — web page is auto-refreshed on change
 * HTML minifier
 * Sass processing
 * CSS optimizer
 * Auto prepare Bootstrap / Font Awesome fonts for production builds
 * Image minification
 * NgAnnotate integration
 * Auto sort JS files and inject them into the html files
 * Partials can be pre-loaded into the angular template cache
 * Karma unit test runner (with coverage report)
 * Plato static analysis report
 * Protractor end-to-end test runner
 * Task for bumping project version

## Quick Start

Install gulp:

	npm install gulp --save-dev

Install corballis-build:

	npm install corballis-build --save-dev
    
Create a gulpfile.js in your project's root:

```javascript
require('corballis-build');
```
That's it. If you are using Windows, you will need to install Visual Studio in order to compile the required dependencies. Follow the instructions at http://www.browsersync.io/docs/

## Gulp Tasks

### Default

If you just execute gulp in your project's root, it executes a complete build. The complete build executes the following tasks:

* `clean`
* `scripts`
* `styles`
* `partials`
* `fonts`
* `image-revisions`
* `plato`
* `inject`
* `html`
* `other`
* `rev-replace-images`
* `build`
* `test-nodep`

### Code Analysis

- `gulp scripts`

    Performs static code analysis on all javascript files. Runs jshint.

- `gulp plato`

    Performs code analysis using plato on all javascript files. Plato generates a report in the reports folder.

### Testing

- `gulp serve:e2e`

    Starts a node server that can be used to run end-to-end tests. Injects any changes on the fly.

- `gulp serve:e2e-single`

    Same as the previous task, but does not leave the server running. It is only intended to be used for single runs (CI builds).

- `gulp serve:e2e-dist`

    Starts a node server in production mode that can be used to run end-to-end tests.

- `gulp test`

    Runs all unit tests using karma runner.

- `gulp test:auto`

    Runs a watch to run all unit tests.

- `gulp test:nodep`

    Runs all unit tests using karma runner. It is only intended to be used by the build task where we do not want to have a dependency on other tasks.
    
- `gulp webdriver:update`

    Updates the Selenium webdriver to the latest version.  
        
- `gulp webdriver:standalone`

    Starts a standalone Selenium server.
            
- `gulp e2e`

    Single run of the end-to-end tests in the development environment.
   
- `gulp e2e:serve`

    Same as the previous task, but leaves the server running and it updates the webdriver before the server start up.
           
- `gulp e2e:single`

    This is an alias for the e2e task.
               
- `gulp e2e:dist`

    Single run of the end-to-end test in the production environment. It also updates the webdriver before the server start up.

### Cleaning Up

- `gulp clean`

    Remove all files from the build and temp folders.

### Fonts and Images

- `gulp fonts`

    Copy all fonts from the bower libraries to the fonts folder in the dist folder.

- `gulp image-revisions`

    Runs imagemin on all images and copies the revisioned files to the dist folder.
    
- `gulp rev-replace-images`

    Replaces references to images in all files with their revisioned versions.    

### Styles

- `gulp styles`

    Import all scss files into the index sass file, compile sass files to CSS, add vendor prefixes, create source maps.
    
### HTMLs and Injection

- `gulp html`
	
    Invokes the `inject` and `partials` tasks and performs some additional optimization on the files: ngAnnotate, uglifying, minification, CSSO, revisioning, preparing fonts from Bootstrap and Font Awesome.
    
- `gulp inject`
	
    Looks up all bower components' main files and JavaScript source code, then adds them to the root html files. This includes CSS and Javascript files from bower components and the application Javascript sources. It can optionally inject the Angular template cache module if it is enabled. This task also prepares a karma configuration file that can be used for unit testing.
     
- `gulp partials`
	
    Creates an Angular module that adds all HTML templates to Angular's $templateCache. This pre-fetches all HTML templates saving XHR calls for the HTML.   
    
### Server

- `gulp serve`

    Serves the development code and launches it in a browser. The goal of building for development is to do it as fast as possible, to keep development moving efficiently. This task serves all code from the source folders and compiles sass to css in a temp folder. Reloads the browser on the fly if changes are detected.

- `gulp serve:dist`

    Serve the optimized code from the build folder and launch it in a browser.
    
### Building Production Code

- `gulp build`

    Optimize all javascript and styles, move to a build folder, and inject them into the new index.html. Copies all fonts and images to build the production code to the build folder.

- `gulp other`

    Copies all remaining files that have not been processed by other tasks to the dist folder.    
    
### Version Management

- `gulp bump`

	Bump the version
 	* --type=pre will bump the prerelease version *.*.*-x
 	* --type=patch or no flag will bump the patch version *.*.x
 	* --type=minor will bump the minor version *.x.*
 	* --type=major will bump the major version x.*.*
 	* --version=1.2.3 will bump to a specific version and ignore other flags    