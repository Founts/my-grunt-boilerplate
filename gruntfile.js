module.exports = function(grunt) {

    // 1. All configuration goes here 
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        
        // 2. Package configuration for files goes here.        
        //2-1. Image min would go here if it worked on windows and/or 32bit windows
        sass: {
            dist: {         // Target
                options: {  // Target options
                    style: 'expanded'
                },
                files: {    // Dictionary of files
                    'styles/build/main.css': 'styles/sass/main.scss'    // 'destination': 'source'
                }
            }
        },
        cssmin: {
            options: {
                report: 'min'
            },            
            minify: {
                expand: true,
                src: 'styles/build/main.css',
                dest: '.',
                ext: '.min.css'                
            }
        },
        autoprefixer: {
            options: {
                cascade: 'true'
            },
            dist: {
                src: 'styles/build/main.min.css',
                dest: 'styles/main.min.css'
            }            
        },
        concat: {
            js: {
                src: [
                'js/vendor/jquery.js',
                'js/vendor/list.js',
                'js/vendor/scripts.js'
                ],
                dest: 'js/build/application.js'
            }
        },
        uglify: {
            build: {
            src: 'js/build/application.js',
            dest: 'js/build/application.min.js'
            }
        },
        watch: {
            options: {
                livereload: true,
            },
            css: {
                files: ['styles/sass/main.scss'],
                tasks: ['sass', 'concat', 'cssmin', 'autoprefixer']
            }
        },        
        connect: {
            server: {
                options: {
                    port: 9001,
                    base: '.',
                    livereload: true,
                    // keepalive: true
                }
            }
        }
    });

    // 3. Where we tell Grunt we plan to use this plug-in.
    
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');

    // 4. Where we tell Grunt what to do when we type "grunt" into the terminal.
    grunt.registerTask('default', ['sass', 'concat', 'uglify', 'cssmin', 'autoprefixer']);
    grunt.registerTask('dev', ['connect', 'watch']);
};