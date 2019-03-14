'use strict';
const sass = require('node-sass');

module.exports = function(grunt) {
	var mozjpeg  = require('imagemin-mozjpeg');
	var pngquant = require('imagemin-pngquant');
	var pngcrush = require('imagemin-pngcrush');

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
					implementation: sass,
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
					implementation: sass,
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
					require('autoprefixer')({grid: true})
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
			},

			lint: {
				options: {
					writeDest: false,
					syntax: require('postcss-scss'),
					processors: [
						require('stylelint')(), // reads the .stylelintrc file where the configuration is kept
						require('postcss-reporter')({clearMessages: true})
					]
				},
				map: {
					map: false
				},
				src: [
					'<%= pkg.folders.srcDir%>/<%= pkg.folders.cssDir %>/**/*.scss',
					'!<%= pkg.folders.srcDir%>/<%= pkg.folders.cssDir %>/vendor/**/*',
					'!<%= pkg.folders.srcDir%>/<%= pkg.folders.cssDir %>/debug/**/*',
					'!<%= pkg.folders.srcDir%>/<%= pkg.folders.cssDir %>/base/mixins/**/*',
					'!<%= pkg.folders.srcDir%>/<%= pkg.folders.cssDir %>/base/_normalize-legacy.scss',
					'!all-old-ie.scss']
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
				tasks: ['sync:js','includes:dev', 'jshint']
			},
			img: {
				files: ['<%= pkg.folders.srcDir %>/<%= pkg.folders.imgDir %>/**/*'],
				tasks: ['sync:img']
			},
			sass: {
				files: ['<%= pkg.folders.srcDir %>/<%= pkg.folders.sassDir %>/**/*'],
				//tasks: ['postcss:lint', 'sass:dev', 'postcss:dev']
				tasks: ['sass:dev', 'postcss:dev']
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
		},

		// concurrent: {
		// 	task1: ['responsive_images:headerimagesdev','sass:dev', 'svgstore:dev', 'js'],
		// 	task2: ['responsive_images:sliderimagesdev','postcss:dev', 'sync:img', 'sync:fonts', 'assemble:dev'],
		// 	task3: ['responsive_images:headerimagesdev', 'responsive_images:sliderimagesdev']
		// }
	});

grunt.loadNpmTasks('grunt-assemble');
grunt.loadNpmTasks('grunt-browser-sync');
grunt.loadNpmTasks('grunt-contrib-clean');
grunt.loadNpmTasks('grunt-contrib-copy');
grunt.loadNpmTasks('grunt-contrib-imagemin');
grunt.loadNpmTasks('grunt-contrib-jshint');
grunt.loadNpmTasks('grunt-contrib-uglify');
grunt.loadNpmTasks('grunt-contrib-watch');
grunt.loadNpmTasks('grunt-includes');
grunt.loadNpmTasks('grunt-newer');
grunt.loadNpmTasks('grunt-postcss');
grunt.loadNpmTasks('grunt-processhtml');
grunt.loadNpmTasks('grunt-sass');
grunt.loadNpmTasks('grunt-svgstore');
grunt.loadNpmTasks('grunt-sync');

/////////////
// TASKS
/////////////

// grunt.registerTask('respimgdist', [
// 	'responsive_images:headerimagesdist',
// 	'responsive_images:sliderimagesdist',
// 	'imagemin:dist',
// 	]
// );

// grunt.registerTask('js', [
// 	//'modernizr:build',
// 	'sync:js',
// 	'includes:dev'
// 	]
// );

// // default / development task
// grunt.registerTask('default', [
// 	'clean:dev',
// 	//'concurrent:task3',
// 	'concurrent:task1',
// 	'concurrent:task2',
// 	'browserSync',
// 	'watch'
// ]);


// default / development task
// grunt.registerTask('default', [
// 	'clean:dev',
// 	//'concurrent:task3',
// 	'concurrent:task1',
// 	'concurrent:task2',
// 	'browserSync',
// 	'watch'
// ]);



	grunt.registerTask('js', [
		//'modernizr:build',
		'sync:js',
		'includes:dev',
		'jshint'
	]);

	// default / development task
	grunt.registerTask('default', [
		'clean:dev',
		//'postcss:lint',
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
		//'postcss:lint',
		'sass:dist',
		'postcss:dist',
		//'modernizr:build',
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

	// deploy task
	grunt.registerTask('deploy', [
		'dist',
		'dist-img'
	]);

};
