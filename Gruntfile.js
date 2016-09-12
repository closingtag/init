'use strict';
module.exports = function(grunt) {
	var mozjpeg  = require('imagemin-mozjpeg');
	var pngquant = require('imagemin-pngquant');
	var pngcrush = require('imagemin-pngcrush');

	require('jit-grunt')(grunt, {
		assemble: 'assemble'
	});

	grunt.initConfig({

		// config
		devDir: '.tmp',
		srcDir: 'src',
		distDir: 'dist',

		// imagemin
		imagemin: {
			options: {
				optimizationLevel: 3,
				pngcrush: [{reduce: true}],
				svgoPlugins: [{ removeViewBox: false }],
				use: [pngquant(), pngcrush(), mozjpeg()]
			},
			dev: {
				files: [{
					expand: true,
					cwd: '<%= devDir %>/img/',
					src: ['**/*.{png,jpg,gif}'],
					dest: '<%= devDir %>/img/'
				}]
			},
			dist: {
				files: [{
					expand: true,
					cwd: '<%= distDir %>/img/',
					src: ['**/*.{png,jpg,gif}'],
					dest: '<%= distDir %>/img/'
				}]
			}
		},


		// Sass
		sass: {
			dev: {
				options: {
					outputStyle: 'expanded',
					sourceMap: true,
					sourceMapContents: true
				},
				files: [{
					expand: true,
					cwd: '<%= srcDir %>/css/',
					src: ['*.scss','!all-old-ie.scss'],
					dest: '<%= devDir %>/css',
					ext: '.css'
				}]
			},
			dist: {
				options: {
					outputStyle: 'compressed',
					sourceMap: false
				},
				files: [{
					expand: true,
					cwd: '<%= srcDir %>/css',
					src: ['*.scss','!all-old-ie.scss'],
					dest: '<%= distDir %>/css',
					ext: '.css'
				}]
			},
		},

		postcss: {
			options: {
				processors: [
					require('autoprefixer')({browsers: ['last 2 versions', 'ie >= 11', 'Android >= 4.4']})
				]
			},
			dev: {
				map: {
					map: true
				},
				src: ['<%= devDir%>/css/*.css','!all-old-ie.css']
			},
			dist: {
				map: {
					map: false
				},
				src: ['<%= distDir %>/css/*.css','!all-old-ie.css']
			}
		},

		// sync
		sync: {
			js: {
				files: [{
					cwd: '<%= srcDir %>/js',
					dest: '<%= devDir %>/js',
					src: ['**/*.js']
				}]
			},
			jsdist: {
				files: [{
					cwd: '<%= srcDir %>/js',
					dest: '<%= distDir %>/js',
					src: ['**/*.js', '!**/_*.js']
				}]
			},
			img: {
				files: [{
					cwd: '<%= srcDir %>/img/',
					dest: '<%= devDir %>/img/',
					src: ['**/*']
				}]
			},
			imgdist: {
				files: [{
					cwd: '<%= srcDir %>/img',
					dest: '<%= distDir %>/img',
					src: ['**/*']
				}]
			},
			fonts: {
				files: [{
					cwd: '<%= srcDir %>/fonts/',
					dest: '<%= devDir %>/fonts/',
					src: ['**/*']
				}]
			},
			fontsdist: {
				files: [{
					cwd: '<%= srcDir %>/fonts',
					dest: '<%= distDir %>/fonts',
					src: ['**/*']
				}]
			}
		},

		// Configuration for deleting files
		clean: {
			dev_js: {
				files: [{
					filter: 'isFile',
					src: ['<%= devDir %>/**/_*.js']
				}]
			},
			dev: {
				files: [{
					filter: 'isFile',
					src: ['<%= devDir %>/**/*', '!<%= devDir %>/**/*.{jpg,png,svg}']
				}]
			},
			dist: {
				files: [{
					filter: 'isFile',
					src: ['<%= distDir %>/**/*', '!<%= distDir %>/**/*.{jpg,png,svg}']
				}]
			},
			distimg: {
				files: [{
					filter: 'isFile',
					src: ['<%= distDir %>/**/*.{jpg,png,svg}']
				}]
			}
		},

		// Modernizr
		modernizr: {
			build: {
				//"classPrefix": "bla-",
				"parseFiles": true,
				"customTests": [],
				"devFile": false,
				"excludeTests": [
					"opacity",
					"hidden",
					"html5printshiv",
					"time",
					"svg"
				],
				"tests": [
					//"flexbox"
					//"pointerevents"
				],
				"enableClasses": true,
				"options": [
					"setClasses"
				],
				"extensibility": [
					"mq",
					"setClasses"
				],
				"uglify": true,
				files: {
					src: ['<%= srcDir %>/**/*.js','<%= srcDir %>/**/*.scss','!<%= srcDir %>/js/vendor/*.js']
				},
				dest: "<%= srcDir %>/js/vendor/_modernizr-custom.js"
			}
		},

		// jshint / validating js-files
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

		// file includes
		includes: {
			options: {
				includeRegexp: /^\/\/\s*import\s+['"]?([^'"]+)['"]?\s*$/,
				duplicates: false,
				flatten: true
			},
			dev: {
				files: [{
					expand: true,
					cwd: '<%= srcDir %>/js',
					src: ['**/*.js','!**/_*.js', '!vendor/**/*.js'],
					dest: '<%= devDir %>/js',
					ext: '.js'
				}]
			},
			dist: {
				files: [{
					expand: true,
					cwd: '<%= srcDir %>/js',
					src: ['**/*.js','!**/_*.js', '!vendor/**/*.js'],
					dest: '<%= distDir %>/js',
					ext: '.js'
				}]
			}
		},

		// watch task
		watch: {
			options: {
				spawn: true
			},
			sync_js: {
				files: ['<%= srcDir %>/js/**/*'],
				tasks: ['modernizr:build','sync:js','includes:dev', 'jshint']
			},
			img: {
				files: ['<%= srcDir %>/img/**/*'],
				tasks: ['sync:img']
			},
			sass: {
				files: ['<%= srcDir %>/css/**/*'],
				tasks: ['sass:dev', 'postcss:dev',]
			},
			assemble: {
				files: ['<%= srcDir %>/templates/**/*.hbs', '<%= srcDir %>/templates/data/*.json', '<%= srcDir %>/templates/data/*.yml'],
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
					ghostMode: false,
					open: "external",
					notify: false,
					reloadDelay: 1000,
					reloadDebounce: 1000,
					directory: true
					// tunnel: true,
					// xip: true
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
				partials: ['<%= srcDir %>/templates/partials/**/*.hbs'],

				// Pattern Lab templates
				// patterns: {
				// 	atoms: ['<%= srcDir %>/templates/patterns/atoms/**/*.hbs'],
				// 	molecules: ['<%= srcDir %>/templates/patterns/molecules/**/*.hbs'],
				// 	organisms: ['<%= srcDir %>/templates/patterns/organisms/**/*.hbs'],
				// 	templates: ['<%= srcDir %>/templates/patterns/templates/**/*.hbs']
				// }
			},
			dev: {
				options: {
					production: false
				},
				files: [{
					cwd: '<%= srcDir %>/templates/pages/',
					dest: '<%= devDir %>',
					expand: true,
					flatten: true,
					src: ['**/*.hbs']
				}]
			},
			dist: {
				options: {
					production: true
				},
				files: [{
					cwd: '<%= srcDir %>/templates/pages/',
					dest: '<%= distDir %>/',
					expand: true,
					flatten: true,
					src: ['**/*.hbs']
				}]
			}
		},

		// uglifying JS
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

		// process html
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

		// SVG store SVG sprites
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
		}

	});


	/////////////
	// TASKS
	/////////////

	grunt.registerTask('js', [
		'modernizr:build',
		'sync:js',
		'includes:dev',
		'jshint'
	]);

	// default / development task
	grunt.registerTask('default', [
		'clean:dev',
		'sass:dev',
		'postcss:dev',
		'svgstore:dev',
		'sync:img',
		'sync:fonts',
		'js',
		'assemble:dev',
		'browserSync',
		'watch'
	]);

	// dist / build task
	grunt.registerTask('dist', [
		'clean:dist',
		'sync:fontsdist',
		'sass:dist',
		'postcss:dist',
		'modernizr:build',
		'sync:jsdist',
		'includes:dist',
		'uglify:dist',
		'assemble:dist',
		'processhtml:dist'
	]);

	// dist image task
	grunt.registerTask('dist-img', [
		//'clean:distimg',
		'newer:imagemin:dist',
		'svgstore:dist'
	]);

};
