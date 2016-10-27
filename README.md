# Assemble
_Component led design patterns with Nunjucks, Grunt &amp; RestCss._

Build a static new website in a component based way with very rapid prototyping. Nunjucks templating for components, RestCss to structure it all together.

##### Features:
* Built for web services such as AmazonS3, Google Cloud Storage.
* Static website scafolding and generator (from JSON). **(Soon)**
* Per Page Javascipt, Per page CSS,  

----


## Installation

I'm assuming you already have node before you start if not then you'll need to [install it](https://nodejs.org/en/) before proceeding.

* `git clone https://github.com/adamleithp/assemble.git`
* `cd assemble` to go to directory
* `npm install` to add all node dependencies found in package.json

### Tasks

Development: Compile code, run server

* `npm run dev`

Production: Compile, minify code

* `npm run prod`

## Todo

* Grunt tasks for specific pages and all of its dependency pages using built dynamically through `data.json`

## Versioning

I'm following this guide to semantic versioning: http://semver.org/.
