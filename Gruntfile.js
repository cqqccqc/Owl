module.exports = function (grunt) {

    // config
    grunt.initConfig({

        jshint: {
            dev: {
                src: ['src/*.js', 'test/*.js']
            }
        },
        jasmine: {
            dev: {
                src: ['src/*.js'],
                options: {
                    specs : 'test/OwlTest.js',
                    keepRunner: true
                }
            }
        },

        watch: {
            dev: {
                files: ['src/*.js', 'test/*.js'],
                tasks: ['jshint:dev', 'jasmine:dev']
            }
        }
    });

    // load plugin
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jasmine');

    // dev task
    grunt.registerTask('dev', ['watch:dev']);
}
