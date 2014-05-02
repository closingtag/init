module.exports = function(grunt) {

  grunt.initConfig({
    devDir: '.tmp',

    // Sass
    sass: {                              // Task
      dist: {                            // Target
        options: {                       // Target options
          style: 'compressed',
          bundleExec: true,
          compass: true,
          sourcemap: false
        },
        files: [{
          expand: true,
          cwd: 'source/css',
          src: ['*.scss'],
          dest: 'dist/css',
          ext: '.css'
        }]
      },
      dev: {                            // Target
        options: {                       // Target options
          style: 'expanded',
          bundleExec: true,
          compass: true,
          sourcemap: true
        },
        files: [{
          expand: true,
          cwd: 'source/css',
          src: ['*.scss'],
          dest: '<%= devDir %>/css',
          ext: '.css'
        }]
      }
    },
    // sync
    sync: {
      js: {
        files: [
          {
            cwd: 'source/js',
            dest: '<%= devDir %>/js',
            src: ['**/*.js', '!**/_*.js']
          }
        ]
      }
    },
    // Configuration for deleting files
    clean: {
      dev_js: {
        files: [
          {
            filter: 'isFile',
            src: ['<%= devDir %>/**/_*.js']
          }
        ]
      }
    },
    // Modernizr configuration
    modernizr: {
      build: {
        devFile: 'remote',
        outputFile: 'source/js/vendor/_modernizr.js',
        uglify: false,
        files: {
          src: ['source/**/*.js','source/**/*.scss','!source/js/vendor/*.js']
        }
      }
    },
    // Configuration for validating js-files
    jshint: {
      options: {
        force: true,
        'asi': false,
        'bitwise': false,
        'boss': true,
        'curly': false,
        'eqeqeq': false,
        'eqnull': true,
        'evil': false,
        'forin': true,
        'immed': false,
        'laxbreak': true,
        'newcap': false,
        'noarg': true,
        'noempty': false,
        'nonew': false,
        'nomen': false,
        'onevar': false,
        'plusplus': false,
        'regexp': false,
        'undef': false,
        'sub': true,
        'strict': false,
        'white': false,
        'indent': 4,
        'maxerr': 50,
        'jquery': true,
        'browser': true
      },
      own: {
        options: {
          '-W015': true
        },
        src: ['source/js/**/*.js', '!source/js/vendor/**/*.js']
      },
      all: {
        options: {
          '-W015': true, '-W089':true
        },
        src: ['source/js/**/*.js', '!source/js/vendor/**/*.js']
      }
    },
    // Configuration for file includes
    includes: {
      options: {
        includeRegexp: /^\/\/\s*import\s+['"]?([^'"]+)['"]?\s*$/,
        duplicates: false,
        flatten: true
      },
      dev: {
        files: [
          {
            expand: true,
            cwd: 'source/js',
            src: ['**/*.js','!**/_*.js', '!vendor/**/*.js'],
            dest: '<%= devDir %>/js',
            ext: '.js'
          }
        ]
      },
      dist: {
        files: [
          {
            expand: true,
            cwd: 'source/js',
            src: ['**/*.js'],
            dest: 'dist/js',
            ext: '.js'
          }
        ]
      }
    },
    watch: {
      options: {
        spawn: true
      },
      sync_js: {
        files: ['source/js/**/*'],
        tasks: ['modernizr:build','sync:js','includes:dev', 'jshint']
      },
      sass: {
        files: ['source/css/**/*'],
        tasks: ['sass:dev']
      },
      assemble: {
        files: ['source/templates/**/*.hbs'],
        tasks: ['assemble:dev']
      }
    },
    // browser-sync
    browserSync: {
      dev: {
        bsFiles: {
          src: ['<%= devDir %>/css/*.css','<%= devDir %>/js/**/*.js','<%= devDir %>/*.html']
        },
        options: {
          watchTask: true,
          server: {
              baseDir: '<%= devDir %>'
          },
          ghostMode: {
            clicks: false,
            scroll: false,
            links: false,
            forms: false
          }
        }
      }
    },
    // Configuration for assemble
    assemble: {
      options: {
        data: 'source/templates/data/**/*.{json,yml}',
        helpers: ['source/templates/helpers/**/*.js','handlebars-helper-partial'],
        layout: ['source/templates/layouts/default.hbs'],
        partials: 'source/templates/partials/**/*.hbs'
      },
      dev: {
        files: [
          {
            cwd: 'source/templates/pages/',
            dest: '<%= devDir %>',
            expand: true,
            flatten: true,
            src: ['**/*.hbs']
          }
        ]
      },
      dist: {
        files: [
          {
            cwd: 'source/templates/pages/',
            dest: 'dist/',
            expand: true,
            flatten: true,
            src: ['**/*.hbs']
          }
        ]
      }
    }
  });

  grunt.loadNpmTasks('grunt-modernizr');
  grunt.loadNpmTasks('grunt-includes');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-sync');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-browser-sync');
  grunt.loadNpmTasks('grunt-assemble');

  grunt.registerTask('js', ['modernizr:build','sync:js','includes:dev','jshint']);
  grunt.registerTask('default', ['sass:dev','assemble:dev','js','browserSync','watch']);
};
