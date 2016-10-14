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
      site: {
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


    sass: {
      all: {
        files: [{
          expand: true,
          cwd: '_css',
          src: '**/*.scss',
          dest: './<%= dist %>/css',
          ext: '.css'
        }]
      },
      global: {
        files: [{
          expand: true,
          cwd: '_css/global/',
          src: '**/*.scss',
          dest: './<%= dist %>/css',
          ext: '.css'
        }]
      },
      specific: {
        files: [{
          expand: true,
          cwd: ['_css/', '!_css/global/'],
          src: '**/*.scss',
          dest: './<%= dist %>/css',
          ext: '.css'
        }]
      },
    },


    uglify: {
      all: {
        files: [{
          expand: true,
          cwd: '_js',
          src: '**/*.js',
          dest: './<%= dist %>/js',
        }]
      },
      global: {
        files: [{
          expand: true,
          cwd: '_js/global/',
          src: '**/*.js',
          dest: './<%= dist %>/js',
        }]
      },
      specific: {
        files: [{
          expand: true,
          cwd: ['_js/global/', '!_css/global/'],
          src: '**/*.js',
          dest: './<%= dist %>/js',
        }]
      }
    },


    htmlmin: {
      all: {
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
        tasks: ['assemble:site']
      },
      js: {
        files: ['_js/**/*.js'],
        tasks: ['uglify:all']
      },
      styles: {
        files: ['_css/**/*.scss'],
        tasks: ['sass:all']
      }
    },


    clean: {
      all: {
        src: ['<%= dist %>/**/*']
      },
      global: {
        src: [
          '<%= dist %>/css/global/',
          '<%= dist %>/js/global/'
        ]
      },
      specific: {
        src: [
          '<%= dist %>/css/global/',
          '<%= dist %>/js/global/',
        ]
      },
      base: {
        src: [
          '<%= dist %>/css/global/base.css',
          '<%= dist %>/js/global/base.css',
        ]
      },
    }

  });

  grunt.loadNpmTasks('assemble');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-connect-rewrite');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('build', ['assemble:site', 'sass:all']);

  // Build
  // Rebuild and Watch entire website
  grunt.registerTask('serve', [
    'clean:all',
    'assemble:site',
    'uglify:all',
    'sass:all',
    'configureRewriteRules',
    'connect:server',
    'watch'
  ]);

  // Build
  // Rebuild and Watch global items
  grunt.registerTask('global', [
    'clean:global',
    'uglify:global',
    'sass:global',
    'configureRewriteRules',
    'connect:server',
    'watch'
  ]);

  // Build
  // Rebuild and Watch specific-per-page items
  grunt.registerTask('specific', [
    'clean:all',
    'assemble:site',
    'uglify:specific',
    'sass:specific',
    'configureRewriteRules',
    'connect:server',
    'watch'
  ]);

  // Theme Specific
  // Register task.
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

  // Build
  // Rebuild and Watch specific-per-page items
  grunt.registerTask('prod', [
    'clean:all',
    'assemble:site',
    'uglify:specific',
    'sass:specific',
    'configureRewriteRules',
    'connect:server',
    'htmlmin:all',
    'watch'
  ]);
};
