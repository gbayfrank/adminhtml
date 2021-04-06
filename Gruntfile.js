const sass = require('node-sass');
module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // Define Path
        dirs: {
            inputSCSS         : 'development/sass',
            inputJS           : 'development/js',
            inputHTMLElements : 'development/html-elements',
            output            : 'production',
            outputCSS         : 'production/css',
            outputJS          : 'production/js'
        },
        uglify: {
            options: {
                mangle: false
            },
            my_target: {
                files: {
                    'dest/output.min.js': ['src/input.js']
                }
            }
        },
        includes: {
            files: {
                src: ['development/index.html'], // Source files
                dest: 'production/', // Destination directory
                flatten: true,
                cwd: '.',
                options: {
                    silent: true,
                    banner: '<!-- I am a banner <% includes.files.dest %> -->'
                }
            }
        },
        // CSS MIN
        cssmin: {
            options: {
                mergeIntoShorthands: false,
                roundingPrecision: -1
                },
                target: {
                files: {
                    
                }
            }
        },
        // SASS
        sass: {
            options: {
                outputStyle: 'compact',
                implementation: sass,
                sourceMap: false
            },
            dist: {
                files: {
                    '<%= dirs.outputCSS %>/main.css' : '<%= dirs.inputSCSS %>/main.scss'
                }
            }
        },
        // WATCH
        watch: {
            scripts: {
                files: [
                    'development/index.html',
                    '<%= dirs.inputSCSS %>/*.scss',
                    '<%= dirs.inputSCSS %>/*/*.scss',
                    '<%= dirs.inputSCSS %>/*/*/*.scss',
                    '<%= dirs.inputHTMLElements %>/*.html',
                    '<%= dirs.inputHTMLElements %>/*/*.html',
                    '<%= dirs.outputJS %>/*.js',
                ],
                tasks: ['sass', 'includes'],
                options: {
                    spawn: false,
                    livereload: true
                },
            },
        },
        // CONNECT
        connect: {
            server: {
                options: {
                    port: 6969,
                    base: 'production/',
                    hostname: 'localhost',
                    livereload: true          
                }
            }
        },
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-includes');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-sass');
    // Default task(s).
    grunt.registerTask('dev', ['includes', 'sass', 'connect', 'watch']);
    grunt.registerTask('publish', ['cssmin', 'uglify']);

};