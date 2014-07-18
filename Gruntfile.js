module.exports = function(grunt) {

  //require('time-grunt')(grunt);
  require('jit-grunt')(grunt);

  grunt.initConfig({

    devDir: '.tmp',
    srcDir: 'source',
    distDir: 'dist',

    penthouse: {
      extract : {
          outfile : '<%= distDir %>/css/critical.css',
          css : '<%= distDir %>/css/style.css',
          url : 'http://localhost:3000',
          width : 1024,
          height : 768
      },
    },

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
          cwd: '<%= srcDir %>/css',
          src: ['*.scss'],
          dest: '<%= distDir %>/css',
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
          cwd: '<%= srcDir %>/css',
          src: ['*.scss'],
          dest: '<%= devDir %>/css',
          ext: '.css'
        }]
      }
    },
    // Configuration for autoprefixer
    autoprefixer: {
      options: {
        browsers: ['last 2 version', 'ie 9', 'Android 4', 'Android 2.3']
      },
      dev: {
        options: {
          map: true
        },
        src: '<%= devDir%>/css/style.css'
      },
      dist: {
        src: '<%= distDir %>/css/style.css'
      }
    },

    // sync
    sync: {
      js: {
        files: [
          {
            cwd: '<%= srcDir %>/js',
            dest: '<%= devDir %>/js',
            src: ['**/*.js']
          }
        ]
      },
      jsdist: {
        files: [
          {
            cwd: '<%= srcDir %>/js',
            dest: '<%= distDir %>/js',
            src: ['**/*.js', '!**/_*.js']
          }
        ]
      },
      img: {
        files: [
          {
            cwd: '<%= srcDir %>/img/',
            dest: '<%= devDir %>/img/',
            src: ['**/*']
          }
        ]
      },
      imgdist: {
        files: [
          {
            cwd: '<%= srcDir %>/img',
            dest: '<%= distDir %>/img',
            src: ['**/*']
          }
        ]
      },
      fonts: {
        files: [
          {
            cwd: '<%= srcDir %>/fonts/',
            dest: '<%= devDir %>/fonts/',
            src: ['**/*']
          }
        ]
      },
      fontsdist: {
        files: [
          {
            cwd: '<%= srcDir %>/fonts',
            dest: '<%= distDir %>/fonts',
            src: ['**/*']
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
      },
      dev: {
        files: [
          {
            filter: 'isFile',
            src: ['<%= devDir %>/**/*']
          }
        ]
      },
      dist: {
        files: [
          {
            filter: 'isFile',
            src: ['<%= distDir %>/**/*']
          }
        ]
      },
    },
    // Modernizr configuration
    modernizr: {
      build: {
        devFile: 'remote',
        outputFile: '<%= srcDir %>/js/vendor/_modernizr.js',
        uglify: false,
        files: {
          src: ['<%= srcDir %>/**/*.js','<%= srcDir %>/**/*.scss','!<%= srcDir %>/js/vendor/*.js']
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
        src: ['<%= srcDir %>/js/**/*.js', '!<%= srcDir %>/js/vendor/**/*.js']
      },
      all: {
        options: {
          '-W015': true, '-W089':true
        },
        src: ['<%= srcDir %>/js/**/*.js', '!<%= srcDir %>/js/vendor/**/*.js']
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
            cwd: '<%= srcDir %>/js',
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
            cwd: '<%= srcDir %>/js',
            src: ['**/*.js','!**/_*.js', '!vendor/**/*.js'],
            dest: '<%= distDir %>/js',
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
        files: ['<%= srcDir %>/js/**/*'],
        tasks: ['modernizr:build','sync:js','includes:dev', 'jshint']
      },
      svg: {
        files: ['<%= srcDir %>/img/**/*.svg'],
        tasks: ['newer:svg2png:dev']
      },
      img: {
        files: ['<%= srcDir %>/img/**/*', '!<%= srcDir %>/img/**/*.svg'],
        tasks: ['sync:img']
      },
      sass: {
        files: ['<%= srcDir %>/css/**/*'],
        tasks: ['sass:dev', 'autoprefixer:dev',]
      },
      assemble: {
        files: ['<%= srcDir %>/templates/**/*.hbs'],
        tasks: ['assemble:dev']
      },
      svgstore: {
        files: ['<%= srcDir %>/img/icons/*.svg'],
        tasks: ['svgstore:dev']
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
              baseDir: '<%= devDir %>',
              index: 'overview.html'
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
        data: '<%= srcDir %>/templates/data/**/*.{json,yml}',
        helpers: ['<%= srcDir %>/templates/helpers/**/*.js'],
        layout: 'default.hbs',
        layoutdir: '<%= srcDir %>/templates/layouts',
        partials: '<%= srcDir %>/templates/partials/**/*.hbs'
      },
      dev: {
        files: [
          {
            cwd: '<%= srcDir %>/templates/pages/',
            dest: '<%= devDir %>',
            expand: true,
            flatten: true,
            src: ['**/*.hbs']
          }
        ],
        options: {
          production: false
        }
      },
      dist: {
        files: [
          {
            cwd: '<%= srcDir %>/templates/pages/',
            dest: '<%= distDir %>/',
            expand: true,
            flatten: true,
            src: ['**/*.hbs']
          }
        ],
        options: {
          production: true
        }
      }
    },
    // Configuration for uglifying JS
    uglify: {
      dist: {
        options: {
          compress: {
            drop_console: true
          }
        },
        files: [{
          expand: true,
          cwd: '<%= distDir %>/js',
          src: ['**/*.js', '!**/_*.js'],
          dest: '<%= distDir %>/js'
        }]
      }
    },
    processhtml: {
      options: {},
      dist: {
        files: [{
          expand: true,
          cwd: '<%= distDir %>/',
          src: ['**/*.html'],
          dest: '<%= distDir %>/'
        }]
      }
    },
    svg2png: {
      dev: {
        files: [{
            cwd: '<%= srcDir %>/img/',
            src: ['**/*.svg'],
            dest: '<%= distDir %>/img/png/',
            ext: '*.png',
            expand: false
          }]
      },
      dist: {
        files: [{
            cwd: '<%= srcDir %>/img/',
            src: ['**/*.svg'],
            dest: '<%= distDir %>/img/png/',
            ext: '*.png',
            expand: false
          }]
      }
    },
    // Configuration for optimizing SVG-files
    svgmin: {
      options: {
         plugins: [
          { cleanupAttrs: true },
          { cleanupEnableBackground: true },
          { cleanupIDs: false },
          { cleanupNumericValues: true },
          { collapseGroups: true },
          { convertColors: true },
          { convertPathData: true },
          { convertShapeToPath: true },
          { convertStyleToAttrs: true },
          { convertTransform: true },
          { mergePaths: true },
          { moveElemsAttrsToGroup: true },
          { moveGroupAttrsToElems: true },
          { removeComments: true },
          { removeDoctype: true },
          { removeEditorsNSData: true },
          { removeEmptyAttrs: true },
          { removeEmptyContainers: true },
          { removeEmptyText: true },
          { removeHiddenElems: true },
          { removeMetadata: true },
          { removeNonInheritableGroupAttrs: true },
          { removeRasterImages: true },
          { removeTitle: false },
          { removeUnknownsAndDefaults: true },
          { removeUnusedNS: true },
          { removeUselessStrokeAndFill: false }, // Enabling this may cause small details to be removed
          { removeViewBox: false }, // Keep the viewBox because that's where illustrator hides the SVG dimensions
          { removeXMLProcInst: false }, // Enabling this breaks grunticon because it removes the XML header
          { sortAttrs: true },
          { transformsWithOnePath: false } // Enabling this breaks Illustrator SVGs with complex text
        ]
      },
      all: {
        files: [
          {
            cwd: '<%= distDir %>/img/',
            dest: '<%= distDir %>/img/',
            expand: true,
            ext: '.svg',
            src: ['*.svg']
          }
        ]
      }
    },
    imageoptim: {
      pngs: {
        options: {
          jpegMini: false,
          imageAlpha: true,
          quitAfter: true
        },
        src: ['<%= distDir %>/img']
      }
    },
    svgstore: {
      options: {},
      dev: {
        options: {
          includedemo: true
        },
        files: {
          '<%= devDir %>/img/all.svg': ['<%= srcDir %>/img/icons/*.svg']
        }
      },
      dist: {
        files: {
        '<%= distDir %>/img/all.svg': ['<%= srcDir %>/img/icons/*.svg']
        }
      }
    },
    phantomas: {
      all : {
        options : {
          indexPath: '<%= devDir %>/phantomas/',
          numberOfRuns: 10,
          url: 'http://0.0.0.0:3002/'
        }
      }
    },
  });

  grunt.registerTask('js', ['modernizr:build','sync:js','includes:dev','jshint']);
  grunt.registerTask('default', ['clean:dev','sass:dev','autoprefixer:dev','svgstore:dev','svg2png:dev','sync:img','sync:fonts','js','assemble:dev','browserSync','watch']);
  grunt.registerTask('dist', ['clean:dist', 'svg2png:dist', 'sync:imgdist','sync:fontsdist','svgstore:dist', 'svgmin:all','sass:dist', 'autoprefixer:dist', 'penthouse', 'modernizr:build', 'sync:jsdist', 'includes:dist', 'uglify:dist','assemble:dist', 'processhtml:dist']);
};
