var rewriteRulesSnippet = require("grunt-connect-rewrite/lib/utils")
                          .rewriteRequest;

module.exports = function(grunt) {

  grunt.initConfig({
		dist: '_site',


    assemble: {
      site: {
        options: {
          layout: 'default.hbs',
          layoutdir: '_layouts',
          partials: '_partials/*.hbs',
          flatten: true,
          plugins: ['assemble-contrib-permalinks','assemble-contrib-sitemap'],

          permalinks: {
            // filename: true,
            structure: '/:slug/:filename',
          },
          files: {
            './': ['./_pages/html/**/*.hbs']
          }
        },
        pages: {
          files: {
            '<%= dist %>/': ['<%= dist %>/_pages/**/*.hbs']
          }
        },
        src: ['_pages/**/*.hbs'],
        dest: '<%= dist %>/html/'
      }
    },


    sass: {
      dist: {
        files: [{
          expand: true,
          cwd: '_css',
          src: '**/*.scss',
          dest: './<%= dist %>/css',
          ext: '.css'
        }]
      }
    },


    uglify: {
      dist: {
        files: [{
          expand: true,
          cwd: '_js',
          src: '**/*.js',
          dest: './<%= dist %>/js',
        }]
      }
    },


    connect: {
      options: {
        livereload: true,
        port: 9001,
        base: './<%= dist %>/', //
      },
      rules: [{
        from: '(^((?!css|html|js|img|fonts|\/$).)*$)',
        to: "$1.html"
      }],
      server: {
        options: {
          middleware: function(connect, options) {
            return [
              rewriteRulesSnippet,
              connect["static"](require("path").resolve(options.base[0]))
            ];
          }
        }
      },
    },


    watch: {
      pages: {
        files: [
          '_layouts/**/*.hbs',
          '_pages/**/*.hbs',
          '_partials/**/*.hbs'
        ],
        tasks: ['assemble:site']
      },
      js: {
        files: ['_js/**/*.js'],
        tasks: ['uglify:dist']
      },
      styles: {
        files: ['_css/**/*.scss'],
        tasks: ['sass:dist']
      }
    },


    clean: ['<%= dist %>/**/*']
  });

  grunt.loadNpmTasks('assemble');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-connect-rewrite');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('build', ['assemble:site', 'sass:dist']);
  grunt.registerTask('serve', [
    'clean',
    'assemble:site',
    'uglify:dist',
    'sass:dist',
    'configureRewriteRules',
    'connect:server',
    'watch'
  ]);

};
