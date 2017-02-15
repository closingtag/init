'use strict';
module.exports = function(grunt) {
	var mozjpeg  = require('imagemin-mozjpeg');
	var pngquant = require('imagemin-pngquant');
	var pngcrush = require('imagemin-pngcrush');

	require('jit-grunt')(grunt, {
		assemble: 'assemble'
	});

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

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
					cwd: '<%= pkg.folders.devDir %>/<%= pkg.folders.imgDir %>/',
					src: ['**/*.{png,jpg,gif}'],
					dest: '<%= pkg.folders.devDir %>/<%= pkg.folders.imgDir %>/'
				}]
			},
			dist: {
				files: [{
					expand: true,
					cwd: '<%= pkg.folders.distDir %>/<%= pkg.folders.imgDir %>/',
					src: ['**/*.{png,jpg,gif}'],
					dest: '<%= pkg.folders.distDir %>/<%= pkg.folders.imgDir %>/'
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
					cwd: '<%= pkg.folders.srcDir %>/<%= pkg.folders.sassDir %>/',
					src: ['*.scss','!all-old-ie.scss'],
					dest: '<%= pkg.folders.devDir %>/<%= pkg.folders.cssDir %>',
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
					cwd: '<%= pkg.folders.srcDir %>/<%= pkg.folders.sassDir %>',
					src: ['*.scss','!all-old-ie.scss'],
					dest: '<%= pkg.folders.distDir %>/<%= pkg.folders.cssDir %>',
					ext: '.css'
				}]
			},
		},

		postcss: {
			options: {
				processors: [
					require('autoprefixer')
				]
			},
			dev: {
				map: {
					map: true
				},
				src: ['<%= pkg.folders.devDir%>/<%= pkg.folders.cssDir %>/*.css','!all-old-ie.css']
			},
			dist: {
				map: {
					map: false
				},
				src: ['<%= pkg.folders.distDir %>/<%= pkg.folders.cssDir %>/*.css','!all-old-ie.css']
			}
		},

		// sync
		sync: {
			js: {
				files: [{
					cwd: '<%= pkg.folders.srcDir %>/<%= pkg.folders.jsDir %>',
					dest: '<%= pkg.folders.devDir %>/<%= pkg.folders.jsDir %>',
					src: ['**/*.js']
				}]
			},
			jsdist: {
				files: [{
					cwd: '<%= pkg.folders.srcDir %>/<%= pkg.folders.jsDir %>',
					dest: '<%= pkg.folders.distDir %>/<%= pkg.folders.jsDir %>',
					src: ['**/*.js', '!**/_*.js']
				}]
			},
			img: {
				files: [{
					cwd: '<%= pkg.folders.srcDir %>/<%= pkg.folders.imgDir %>/',
					dest: '<%= pkg.folders.devDir %>/<%= pkg.folders.imgDir %>/',
					src: ['**/*']
				}]
			},
			imgdist: {
				files: [{
					cwd: '<%= pkg.folders.srcDir %>/<%= pkg.folders.imgDir %>',
					dest: '<%= pkg.folders.distDir %>/<%= pkg.folders.imgDir %>',
					src: ['**/*']
				}]
			},
			fonts: {
				files: [{
					cwd: '<%= pkg.folders.srcDir %>/<%= pkg.folders.fontsDir %>/',
					dest: '<%= pkg.folders.devDir %>/<%= pkg.folders.fontsDir %>/',
					src: ['**/*']
				}]
			},
			fontsdist: {
				files: [{
					cwd: '<%= pkg.folders.srcDir %>/<%= pkg.folders.fontsDir %>',
					dest: '<%= pkg.folders.distDir %>/<%= pkg.folders.fontsDir %>',
					src: ['**/*']
				}]
			}
		},

		// Configuration for deleting files
		clean: {
			dev_js: {
				files: [{
					filter: 'isFile',
					src: ['<%= pkg.folders.devDir %>/**/_*.js']
				}]
			},
			dev: {
				files: [{
					filter: 'isFile',
					src: ['<%= pkg.folders.devDir %>/**/*', '!<%= pkg.folders.devDir %>/**/*.{jpg,png,svg}']
				}]
			},
			dist: {
				files: [{
					filter: 'isFile',
					src: ['<%= pkg.folders.distDir %>/**/*', '!<%= pkg.folders.distDir %>/**/*.{jpg,png,svg}']
				}]
			},
			distimg: {
				files: [{
					filter: 'isFile',
					src: ['<%= pkg.folders.distDir %>/**/*.{jpg,png,svg}']
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
					src: ['<%= pkg.folders.srcDir %>/**/*.js','<%= pkg.folders.srcDir %>/**/*.scss','!<%= pkg.folders.srcDir %>/<%= pkg.folders.jsDir %>/vendor/*.js']
				},
				dest: "<%= pkg.folders.srcDir %>/<%= pkg.folders.jsDir %>/vendor/_modernizr-custom.js"
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
				src: ['<%= pkg.folders.srcDir %>/<%= pkg.folders.jsDir %>/**/*.js', '!<%= pkg.folders.srcDir %>/<%= pkg.folders.jsDir %>/vendor/**/*.js']
			},
			all: {
				options: {
					'-W015': true, '-W089':true
				},
				src: ['<%= pkg.folders.srcDir %>/<%= pkg.folders.jsDir %>/**/*.js', '!<%= pkg.folders.srcDir %>/<%= pkg.folders.jsDir %>/vendor/**/*.js']
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
					cwd: '<%= pkg.folders.srcDir %>/<%= pkg.folders.jsDir %>',
					src: ['**/*.js','!**/_*.js', '!vendor/**/*.js'],
					dest: '<%= pkg.folders.devDir %>/<%= pkg.folders.jsDir %>',
					ext: '.js'
				}]
			},
			dist: {
				files: [{
					expand: true,
					cwd: '<%= pkg.folders.srcDir %>/<%= pkg.folders.jsDir %>',
					src: ['**/*.js','!**/_*.js', '!vendor/**/*.js'],
					dest: '<%= pkg.folders.distDir %>/js',
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
				files: ['<%= pkg.folders.srcDir %>/<%= pkg.folders.jsDir %>/**/*'],
				tasks: ['modernizr:build','sync:js','includes:dev', 'jshint']
			},
			img: {
				files: ['<%= pkg.folders.srcDir %>/<%= pkg.folders.imgDir %>/**/*'],
				tasks: ['sync:img']
			},
			sass: {
				files: ['<%= pkg.folders.srcDir %>/<%= pkg.folders.sassDir %>/**/*'],
				tasks: ['sass:dev', 'postcss:dev',]
			},
			assemble: {
				files: ['<%= pkg.folders.srcDir %>/<%= pkg.folders.templateDir %>/**/*.hbs', '<%= pkg.folders.srcDir %>/<%= pkg.folders.templateDir %>/data/*.json', '<%= pkg.folders.srcDir %>/<%= pkg.folders.templateDir %>/data/*.yml'],
				tasks: ['assemble:dev']
			},
			svgstore: {
				files: ['<%= pkg.folders.srcDir %>/<%= pkg.folders.imgDir %>/icons/*.svg'],
				tasks: ['svgstore:dev']
			}
		},

		// browser-sync
		browserSync: {
			dev: {
				bsFiles: {
					src: ['<%= pkg.folders.devDir %>/<%= pkg.folders.cssDir %>/*.css','<%= pkg.folders.devDir %>/<%= pkg.folders.jsDir %>/**/*.js','<%= pkg.folders.devDir %>/*.html']
				},
				options: {
					watchTask: true,
					server: {
						baseDir: '<%= pkg.folders.devDir %>',
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
				data: '<%= pkg.folders.srcDir %>/<%= pkg.folders.templateDir %>/data/**/*.{json,yml}',
				helpers: ['<%= pkg.folders.srcDir %>/<%= pkg.folders.templateDir %>/helpers/**/*.js'],
				layout: 'default.hbs',
				layoutdir: '<%= pkg.folders.srcDir %>/<%= pkg.folders.templateDir %>/layouts',
				partials: ['<%= pkg.folders.srcDir %>/<%= pkg.folders.templateDir %>/partials/**/*.hbs'],

				// Pattern Lab templates
				// patterns: {
				// 	atoms: ['<%= pkg.folders.srcDir %>/<%= pkg.folders.templateDir %>/patterns/atoms/**/*.hbs'],
				// 	molecules: ['<%= pkg.folders.srcDir %>/<%= pkg.folders.templateDir %>/patterns/molecules/**/*.hbs'],
				// 	organisms: ['<%= pkg.folders.srcDir %>/<%= pkg.folders.templateDir %>/patterns/organisms/**/*.hbs'],
				// 	templates: ['<%= pkg.folders.srcDir %>/<%= pkg.folders.templateDir %>/patterns/templates/**/*.hbs']
				// }
			},
			dev: {
				options: {
					production: false
				},
				files: [{
					cwd: '<%= pkg.folders.srcDir %>/<%= pkg.folders.templateDir %>/pages/',
					dest: '<%= pkg.folders.devDir %>',
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
					cwd: '<%= pkg.folders.srcDir %>/<%= pkg.folders.templateDir %>/pages/',
					dest: '<%= pkg.folders.distDir %>/',
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
					cwd: '<%= pkg.folders.distDir %>/<%= pkg.folders.jsDir %>',
					src: ['**/*.js', '!**/_*.js'],
					dest: '<%= pkg.folders.distDir %>/<%= pkg.folders.jsDir %>'
				}]
			}
		},

		// process html
		processhtml: {
			options: {},
			dist: {
				files: [{
					expand: true,
					cwd: '<%= pkg.folders.distDir %>/',
					src: ['**/*.html'],
					dest: '<%= pkg.folders.distDir %>/'
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
					'<%= pkg.folders.devDir %>/<%= pkg.folders.imgDir %>/all.svg': ['<%= pkg.folders.srcDir %>/<%= pkg.folders.imgDir %>/icons/*.svg']
				}
			},
			dist: {
				files: {
					'<%= pkg.folders.distDir %>/<%= pkg.folders.imgDir %>/all.svg': ['<%= pkg.folders.srcDir %>/<%= pkg.folders.imgDir %>/icons/*.svg']
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
