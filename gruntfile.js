module.exports = function(grunt) {
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        data: grunt.file.readJSON('data.json'),
        src: 'src',
        dist: '_site',

        // Clean Directory (**)
        // Destroy all files in these directories.
        // Run before other tasks.
        clean: {
            html: {
                src: ['<%= dist %>/html/**/*']
            },
            dev: {
                src: ['<%= dist %>/**/*']
            },
        },


        // Nunjucks (.html)
        // compiles and copies files
        nunjucks: {
            options: {
                data: grunt.file.readJSON('data.json'),
                paths: '<%= src %>/html',
                components: '_components',
                layouts: '_layouts',
                partials: '_partials',
                marcros: '_marcros'
            },
            dev: {
                files: [{
                    expand: true,
                    cwd: '<%= src %>/html',
                    src: ['**/*.html'],
                    dest: './<%= dist %>/html/',
                    ext: '.html'
                }],
            }
        },

        // Sass (.scss / .sass)
        // compiles and copies files.
        sass: {
            dev: {
                options: {
                    style: 'expanded',
                    sourceMapContents: true,
                    sourceMap: true
                },
                files: [{
                    expand: true,
                    cwd: '<%= src %>/css',
                    src: '**/*.scss',
                    dest: '<%= dist %>/css',
                    ext: '.css'
                }]
            },
            prod: {
                options: {
                    style: 'compressed'
                },
                files: [{
                    expand: true,
                    cwd: '<%= src %>/css',
                    src: '**/*.scss',
                    dest: '<%= dist %>/css',
                    ext: '.css'
                }]
            },
        },

        // Babel.js (.js)
        // Compiles and copies files.
        babel: {
            options: {
                'sourceMap': true
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= src %>/js',
                    src: '**/*.js',
                    dest: '<%= dist %>/js'
                }]
            }
        },


        // Javascript Parser and compressor
        // Run after other tasks
        uglify: {
            prod: {
                option: {
                    beautify: true,
                    mangle: true,
                    compress: true
                },
                files: [{
                    expand: true,
                    cwd: '<%= dist %>/js',
                    src: '**/*.js',
                    dest: '<%= dist %>/js',
                }]
            }
        },

        // Html Minification (.html) (production only)
        // Run after other tasks.
        htmlmin: {
            prod: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                expand: true,
                cwd: '<%= dist %>/html',
                src: ['**/*.html'],
                dest: '<%= dist %>/html'
            },
        },


        // Image Minification (.png, .jpg, .gif) (production only)
        // Run after other tasks.
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

        // Watch Files
        // Run after all other tasks
        watch: {
            js: {
                files: ['<%= src %>/js/**/*.js'],
                tasks: ['babel'],
                options: {
                    spawn: false,
                    livereload: true
                }
            },
            styles: {
                files: ['<%= src %>/css/**/*.scss'],
                tasks: ['sass:dev'],
                options: {
                    spawn: false,
                    livereload: true
                }
            },
            html: {
                files: ['<%= src %>/**/*.html', '<%= src %>/**/*.njk'],
                tasks: ['clean:html', 'nunjucks'],
                options: {
                    spawn: false,
                    livereload: true
                }
            },
            gruntfile: {
                files: 'gruntfile.js',
                options: {
                    spawn: false,
                    livereload: true,
                    reload: true
                }
            }
        },

        // Copy Files
        // Used for copying images into dist folder.
        // Run after other tasks.
        copy: {
            dev: {
                files: [{
                    expand: true,
                    cwd: '<%= src %>/images',
                    src: '**',
                    dest: '<%= dist %>/images'
                }],
            },
        },
    });

    // Load the plugins to run your tasks
    require('load-grunt-tasks')(grunt, {
        scope: 'devDependencies'
    });
    require('time-grunt')(grunt);


    grunt.registerTask('dev', [
        'clean:dev',
        'copy:dev',
        'nunjucks',
        'babel',
        'sass:dev',
        'watch'
    ]);

    grunt.registerTask('prod', [
        'clean:dev',
        'copy:dev',
        'nunjucks',
        'babel',
        'sass:prod',
        'uglify:prod',
        'htmlmin:prod',
        'imagemin:prod',
    ]);
};
