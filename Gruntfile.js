module.exports = function(grunt) {
  
  grunt.initConfig({
    // Set some vars
    globalConfig:   {
        css_dir: 'dist/css',
        sass_dir: 'src/sass',
        js_dir_src: 'src/js',
        js_dir_dist: 'dist/js',        
	img_dir: 'dist/images',
        bower_components: 'bower_components'
    },

    sass: {
        src:    {
            files: {
                '<%= globalConfig.css_dir %>/stylesheet.css': '<%= globalConfig.sass_dir %>/stylesheet.scss',
                '<%= globalConfig.css_dir %>/msie.css': '<%= globalConfig.sass_dir %>/msie.scss'
            },
            options : {
                sourceComments: 'normal',
                sourceMap: false
            }
        },
        dist:   {
            files: {
                '<%= globalConfig.css_dir %>/stylesheet.min.css': '<%= globalConfig.sass_dir %>/stylesheet.scss',
                '<%= globalConfig.css_dir %>/msie.min.css': '<%= globalConfig.sass_dir %>/msie.scss'
            },
            options: {
                outputStyle: 'compressed',
                sourceMap: false
            }
        }
    },
    uglify: {
        dist:   {
            files: [{
                expand: true,
                cwd: '<%= globalConfig.js_dir_src %>',
                src: '**/*.js',
                dest: '<%= globalConfig.js_dir_dist %>',
                flatten: true,
                drop_console: true,
                ext: '.min.js',
                extDot: 'last'
            }]
        }
    },
    watch: {
      sass: {
        files: ['<%= globalConfig.sass_dir %>/**/*.scss'],
        tasks: ['sass:dev', 'shell:patternlab'],
        options:    {
            spawn: false,
            livereload: false
        }
      }
    }
  });

  // Define some additional tasks
  grunt.registerTask('default', ['build'], ['watch']);
  grunt.registerTask('build', ['sass', 'uglify']);

  require('time-grunt')(grunt);
  
  // Load all related NPM tasks - takes care of loading each individual task
  require('load-grunt-tasks')(grunt);
  
};