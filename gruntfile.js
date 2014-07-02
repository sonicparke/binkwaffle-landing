module.exports = function(grunt) {

  // Configuration goes here
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    useminPrepare: {

      html:'public/index.html',
      options: {
        dest: 'build'
      }

    },

    ngAnnotate: {
      options: {
        singleQuotes: true,
      },
      all: {
        files: {
          '.tmp/concat/js/app.js': ['.tmp/concat/js/app.js']
        }
      }
    },

    usemin:{
      html: ['build/index.html']
    },

    copy:{
      main: {
        expand: true,
        cwd: 'public',
        src: ['*','images/*', 'css/*', 'includes/*'],
        dest: 'build/',
        filter: 'isFile'
      },
      deploy_dev: {
          expand: true,
          cwd: 'build',
          src: '**',
          dest: 'c:\\inetpub\\wwwroot\\binkwaffle'
      } ,
      deploy: {
          expand: true,
          cwd: 'build',
          src: '**',
          dest: 'D:\\www'
      }
    }

  });

  // Load plugins here
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-ng-annotate');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-usemin');

  // Define your tasks here

  grunt.registerTask('dev', ['copy:main', 'copy:nonConcatLibs', 'useminPrepare', 'concat', 'usemin']);
  grunt.registerTask('build-no-min', ['copy:main', 'copy:nonConcatLibs', 'copy:buildNoMin', 'useminPrepare', 'concat', 'usemin']);
  // grunt.registerTask('build', ['copy:main', 'copy:nonConcatLibs', 'useminPrepare', 'concat', 'ngAnnotate', 'cssmin', 'uglify', 'usemin']);

  grunt.registerTask('build', ['copy:main', 'useminPrepare', 'concat', 'cssmin', 'uglify', 'usemin']);
  grunt.registerTask('build-deploy-dev', ['copy:main', 'useminPrepare', 'concat', 'cssmin', 'uglify', 'usemin', 'copy:deploy_dev']);
  grunt.registerTask('deploy', ['copy:deploy']);
  grunt.registerTask('deploy-dev', ['copy:deploy_dev']);
};