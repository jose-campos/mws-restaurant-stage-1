module.exports = function(grunt) {
	grunt.initConfig({
		sass: {
			dev: {
				options: {
					sourcemap: 'auto',
					style: 'expanded'
				},
				files: {
					'build/css/styles.css': 'src/sass/main.scss'
				}
			},
			build: {
				options: {
					sourcemap: 'none',
					style: 'compressed'
				},
				files: {
					'build/css/styles.css': 'src/sass/main.scss'
				}
			}
		},

		watch: {
			styles: {
				files: ['src/sass/*.scss'],
				tasks: ['sass:dev']
			},
			js: {
				files: ['src/js/**/*'],
				tasks: ['jshint', 'copy:js']
			}
		},

		jshint: {
			all: ['Gruntfile.js', 'src/**/*.js'],
			options: {
				esversion: 6,
				asi: true
			}
		},

		clean: ['./build'],

		copy: {
			build: {
				expand: true,
				cwd: 'src',
				src: ['**', '!**/sass/**'],
				dest: 'build/'
			},
			js: {
				expand: true,
				cwd: 'src',
				src: 'js/**',
				dest: 'build/'
			}
		},

		'http-server': {
			dev: {
				root: 'build/' ,
				port: 8282,
				host: "localhost",
				showDir: true,
				autoIndex: true,
				ext: "html",
				runInBackground: true,
				logFn: function(req, res, error) { },
				openBrowser: true
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-http-server');

	grunt.registerTask('build', ['clean', 'jshint', 'sass:build', 'copy:build']);
	grunt.registerTask('dev', ['clean', 'jshint', 'sass:dev', 'copy:build', 'http-server:dev', 'watch']);
	grunt.registerTask('default', ['watch']);
};
