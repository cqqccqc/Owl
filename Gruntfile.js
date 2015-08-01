module.exports = function (grunt) {


    // config
    grunt.initConfig({

        jshint: {
            dev: {
                src: ['src/owl.js']
            }
        }
    });

    // load plugin
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');

    // task
    grunt.registerTask('default', ['jshint:dev']);
}
