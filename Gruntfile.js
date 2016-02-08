'use strict';
module.exports = function(grunt) {

	require('jit-grunt')(grunt, {
		assemble: 'assemble'
	});

	grunt.initConfig({

		// config
		devDir: '.tmp',
		srcDir: 'src',
		distDir: 'dist',
		autopref: ['last 2 version', 'ie >= 9', 'Android >= 2.3'],


		// Sass
		sass: {
			options: {
				//bundleExec: true,
				//includePaths: ['/Users/svenwolfermann/.gem/ruby/2.0.0/gems/singularitygs-1.4.0/stylesheets','/Users/svenwolfermann/.gem/ruby/2.0.0/gems/breakpoint-2.5.0/stylesheets']
			},
			dev: {
				options: {
					outputStyle: 'expanded',
					//includePaths: ['~/.gem/ruby/2.0.0/gems/singularitygs-1.4.0/stylesheets','~/.gem/ruby/2.0.0/gems/breakpoint-2.5.0/stylesheets']
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
					outputStyle: 'compressed'
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
				map: {
					inline: false,
					annotation: '<%= devDir %>/css/maps/'
				},

				processors: [
					require('autoprefixer')({browsers: ['last 2 version', 'ie >= 9', 'Android >= 2.3']}),
					require('postcss-assets')({ loadPaths: ['src/img/'], relativeTo: 'css'}),
					require('postcss-svg')({paths: ['.']}),
					//require('postcss-flexbugs-fixes'),
					// require('doiuse')({
					// 	browsers: ['last 2 version', 'ie >= 9', 'Android >= 2.3'],
					// 	ignore: ['rem', 'css-boxshadow', 'css-transitions']
					// })
				]
			},
			dev: {
				src: ['<%= devDir%>/css/*.css','!all-old-ie.css']
			},
			dist: {
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
					src: ['<%= devDir %>/**/*']
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
			svg: {
				files: ['<%= srcDir %>/img/**/*.svg'],
				tasks: ['svg2png:dev']
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
					// tunnel: true,
					// xip: true
				}
			}
		},

		// Configuration for assemble
		assemble: {
			options: {
				data: '<%= srcDir %>/templates/data/**/*.{json,yml}',
				helpers: ['handlebars-helper-repeat','<%= srcDir %>/templates/helpers/**/*.js'],
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
		},

		// Optimizing SVG-files
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
				files: [{
					cwd: '<%= distDir %>/img/',
					dest: '<%= distDir %>/img/',
					expand: true,
					ext: '.svg',
					src: ['*.svg']
				}]
			}
		},

		// imageoptim
		imageoptim: {
			options: {
				jpegMini: false,
				imageAlpha: true,
				quitAfter: true
			},
			pngs: {
				src: ['<%= distDir %>/img']
			}
		},

		// critical
		critical: {
			test: {
				options: {
					base: './',
					css: ['<%= devDir %>/css/style.css'],
					width : 1024,
					height : 768,
					minify: true
				},
				src: '<%= devDir %>/index.html',
				dest: '<%= devDir %>/critical.html'
			}
		},

		// perfbudget
		perfbudget: {
			default: {
				options: {
					url: 'http://localhost:3000',
					key: 'A.5049c22c24f4c81f408a62711c938f78',
					location: 'ec2-eu-central-1:Chrome',
					timeout: 600,
					budget: {
						visualComplete: '3000',
						SpeedIndex: '1000'
					}
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
		'jshint']
	);

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
		'critical',
		'modernizr:build',
		'sync:jsdist',
		'includes:dist',
		'uglify:dist',
		'assemble:dist',
		'processhtml:dist'
	]);

	// dist image task
	grunt.registerTask('dist-img', [
		'clean:distimg',
		'svg2png',
		'sync:imgdist',
		'svgstore:dist',
		'svgmin:all',
		'imageoptim'
	]);

	// performance task
	grunt.registerTask('perf', [], function () {
			grunt.task.run(
				'critical',
				'perfbudget'
			);
	});

};
