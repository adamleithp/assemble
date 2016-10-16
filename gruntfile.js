var rewriteRulesSnippet = require("grunt-connect-rewrite/lib/utils")
                          .rewriteRequest;

module.exports = function(grunt) {
  grunt.initConfig({
    // Set Vars (move to congif.yml)
		dist: '_site',


    // Register all the themes/variations and loop through them as array
    // var variations = ['base'];


    // Magic
    assemble: {
      dev: {
        options: {
          layout: 'default.hbs',
          layoutdir: '_layouts',
          partials: '_partials/**/*.hbs',
          flatten: true,
          helpers: [
            './helpers/button.js' // Button Helper
          ],
          plugins: ['assemble-contrib-permalinks','assemble-contrib-sitemap'],
          permalinks: {
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


    copy: {
      dev: {
        files: [{
          expand: true,
          cwd: '_images',
          src: '**',
          dest: '<%= dist %>/images/'
        }],
      },
    },


    sass: {
      dev: {
        options: {
          style: 'expanded'
        },
        files: [{
          expand: true,
          cwd: '_css',
          src: '**/*.scss',
          dest: './<%= dist %>/css',
          ext: '.css'
        }]
      },
      prod: {
        options: {
          style: 'compressed'
        },
        files: [{
          expand: true,
          cwd: '_css',
          src: '**/*.scss',
          dest: './<%= dist %>/css',
          ext: '.css'
        }]
      },
    },


    uglify: {
      dev: {
        files: [{
          expand: true,
          cwd: '_js',
          src: '**/*.js',
          dest: './<%= dist %>/js',
        }]
      },
      prod: {
        files: [{
          expand: true,
          cwd: '_js',
          src: '**/*.js',
          dest: './<%= dist %>/js',
        }]
      },
    },


    htmlmin: {
      prod: {
        options: {
          removeComments: true,
          collapseWhitespace: true
        },
        expand: true,
        cwd: '<%= dist %>',
        src: ['**/*.html'],
        dest: '<%= dist %>'
      },
    },


    imagemin: {
      prod: {
        files: [{
          expand: true,
          cwd: '<%= dist %>',
          src: ['**/*.{png,jpg,gif}'],
          dest: '<%= dist %>'
        }]
      }
    },


    connect: {
      options: {
        livereload: true,
        port: 9001,
        base: './<%= dist %>/',
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
        tasks: ['assemble:dev']
      },
      js: {
        files: ['_js/**/*.js'],
        tasks: ['uglify:dev']
      },
      styles: {
        files: ['_css/**/*.scss'],
        tasks: ['sass:dev']
      }
    },


    clean: {
      dev: {
        src: ['<%= dist %>/**/*']
      },
    }

  });

  grunt.loadNpmTasks('assemble');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-connect-rewrite');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');

  grunt.registerTask('build', ['assemble:site', 'sass:all']);

  // Build
  // Rebuild and Watch entire website
  grunt.registerTask('dev', [
    'clean:dev',
    'copy:dev',
    'assemble:dev',
    'uglify:dev',
    'sass:dev',
    'configureRewriteRules',
    'connect:server',
    'watch'
  ]);

  // Build
  // Rebuild and Watch specific-per-page items
  grunt.registerTask('prod', [
    'clean:dev',
    'copy:dev',
    'assemble:dev',
    'uglify:prod',
    'sass:prod',
    'configureRewriteRules',
    'connect:server',
    'htmlmin:prod',
    'imagemin:prod',
    'watch'
  ]);
};


// TODO

  // Theme Specific
  // When your project gets out of control from all the variations or themes, compiling soley the theme you're developing is important and time saving for development.

  // var theme = grunt.option('theme') || 'all';
  //
  // grunt.registerTask('theme', [
  //   'clean:' + theme,
  //   'assemble:' + theme,
  //   'uglify:' + theme,
  //   'sass:' + theme,
  //   'configureRewriteRules',
  //   'connect:server',
  //   'watch'
  // ]);
