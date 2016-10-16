# Assemble

Build highly functional static websites with minimal effort.

Per page assets compiled and rendered in the folder structure you choose.

Built with [Assemble](https://github.com/assemble/assemble/) and [HandleBars](https://github.com/wycats/handlebars.js/) with [Grunt.js](https://github.com/gruntjs/grunt) powering it all. With [Markdown](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet), [Sass](http://sass-lang.com/), ([Babel.js](https://github.com/babel/babel) coming soon),


---

### Static is the future
With hosting your static files on AWS + CloudFront Geo Distribution + RESTful API's, you have a recipe to have one of the fastest reactive websites on the planet.

---

**Motto: Rapid protyping with reusable content with a static html output.**

---

## Get Started

* `npm install -g grunt-cli`
* `npm install`

**Developement**
* `grunt dev`

**Production environment**
Production ready static files, assets compression including image compression.
* `grunt prod`

---

### Add a page?
create a folder in pages, configure handlebars options inside file, that's it.

Want per page assets (css, js, etc?)
Create a folder with the same name as the folder name for your page inside the asset folder type you'd like to have.

---
#### TODO

* Documentation: Write proper style guides and design patterns
* Grunt: Break down grunt tasks into more faster respective builds (clean etc)
* Development: Test API calls from forms
* The world.
