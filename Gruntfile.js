module.exports = function(grunt) {

  grunt.initConfig({
    browserify: {
      js: {
          src: ['./js/main.js'],
          dest: 'dist/app.js'
      }
    },
    jshint: {
      options: {
        predef: [ "document", "console", "firebase" ],
        esnext: true,
        globalstrict: true,
        globals: {},
        browserify: true,
        jquery: true
      },
      files: ['./js/**/*.js']
    },
    sass: {
      dist: {
        files: {
          'styles/main.css': 'sass/main.scss'
        }
      }
    },
    watch: {
      options: {
        livereload: true,
      },
      javascripts: {
        files: ['./js/**/*.js'],
        tasks: ['jshint', 'browserify']
      },
      sass: {
        files: ['./sass/**/*.sass'],
        tasks: ['sass']
      }
    }
  });

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.registerTask('default', ['jshint', 'sass', 'browserify', 'watch']);
};
