/**
 * Gruntfile for Elf Project
 */
'use strict';
module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        meta: {
            banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
                '<%= grunt.template.today("yyyy-mm-dd") %> */'
        },
        jshint: {
            options: {
                bitwise: true,
                camelcase: true,
                curly: true,
                eqeqeq: true,
                forin: true,
                immed: true,
                indent: 4,
                latedef: true,
                newcap: true,
                noarg: true,
                noempty: true,
                nonew: true,
                quotmark: 'single',
                undef: true,
                unused: true,
                strict: true,
                trailing: true,
                eqnull: true,
                devel: true,
                white: false
            },
            client: {
                options: {
                    browser: true,
                    predef: ['seajs', 'define']
                },
                src: ['public/js/**/*.js']
            },
            server: {
                options: {
                    node: true
                },
                src: [
                    'lib/**/*.js',
                    'middleware/**/*.js',
                    '*.js'
                ]
            }
        },
        watch: {
            stylus: {
                files: ['public/stylus/*.styl'],
                tasks: ['stylus']
            }
        },
        stylus: {
            options: {
                paths: ['public/stylus/'],
                compress: false
            },
            css: {
                files: [{
                    cwd: 'public/stylus/',
                    src: ['app.styl'],
                    dest: 'public/css/',
                    expand: true,
                    ext: '.css'
                }]
            }
        },
        concat: {
            js: {
                src: ['public/js/app.js'],
                dest: 'dist/public/js/app.js'
            }
        },
        cssmin: {
            css: {
                options: {
                    banner: '<%= meta.banner %>'
                },
                files: [{
                    expand: true,
                    cwd: 'dist/public/css/',
                    src: ['**/*.css'],
                    dest: 'dist/public/css/',
                    ext: '.css'
                }]
            }
        },
        uglify: {
            js: {
                options: {
                    banner: '<%= meta.banner %>\n'
                },
                files: [{
                    expand: true,
                    cwd: 'dist/public/js/',
                    src: ['**/*.js'],
                    dest: 'dist/public/js/',
                    ext: '.js'
                }]
            }
        },
        imagemin: {
            img: {
                files: [{
                    expand: true,
                    cwd: 'public/img/',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: 'dist/public/img/'
                }]
            }
        },
        copy: {
            cjs: {
                files: [
                    {
                        src: 'public/css/**/*.css',
                        dest: 'dist/',
                        filter: 'isFile'
                    }
                ]
            },
            dist: {
                files: [
                    {src: [
                        'conf/**/*.json',
                        'lib/**/*.js',
                        'private/data/*.js',
                        'views/**/*.jade',
                        '*',
                        '!*.release',
                        '!cluster.js',
                        '!Gruntfile.js',
                        '!*.md'
                    ], dest: 'dist/', filter: 'isFile'},
                    {src: ['views/index.jade.release'], dest: 'dist/views/index.jade'},
                    {src: ['config.js.release'], dest: 'dist/config.js'}
                ]
            }
        },
        clean: {
            dist: ['dist/']
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-stylus');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');

    // public tasks
    grunt.registerTask('test', ['jshint']);
    grunt.registerTask('cssbuild', [ 'stylus']);
    grunt.registerTask('build', ['cssbuild', 'copy:cjs', 'concat:js', 'cssmin', 'uglify', 'imagemin', 'copy:dist']);
    grunt.registerTask('default', ['clean:dist', 'build']);
};