module.exports = function(grunt) {
    grunt.initConfig({
        simplemocha: {
            options: {
                globals: ['should'],
                timeout: 3000,
                ignoreLeaks: false,
                ui: 'bdd',
                reporter: 'list'
            },
            all: { src: ['test/**/*.js'] },
            coverage: { src: ['coverage/instrument/test/**/*.js' ] }
        },

        jshint: {
            all: [ 'Gruntfile.js', 'bot/**/*.js', 'integrations/**/*.js', 'test/**/*.js']
        },

        jsdoc: {
            all: {
                src: ['*.js', 'test/**/*.js'],
                dest: 'doc'
            }
        },

        env: {
            coverage: {
                DIR_FOR_CODE_COVERAGE: '../coverage/instrument/'
            }
        },
        clean: {
            coverage: {
                src: [ 'coverage/instrument' ]
            }
        },
        instrument: {
            files: ['app.js', 'bot/**/*.js', 'integrations/**/*.js', 'test/**/*.js' ],
            options: {
                lazy: true,
                basePath: 'coverage/instrument/'
            }
        },
        storeCoverage: {
            options: {
                dir: 'coverage/reports'
            }
        },
        makeReport: {
            src: 'coverage/reports/**/*.json',
            options: {
                type: 'html',
                dir: 'coverage/reports',
                print: 'detail'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-simple-mocha');
    grunt.loadNpmTasks('grunt-jsdoc');
    grunt.loadNpmTasks('grunt-istanbul');

    grunt.registerTask('coverage', ['clean:coverage', 'instrument', 'simplemocha:coverage', 'storeCoverage', 'makeReport']);
    grunt.registerTask('test', ['jshint', 'simplemocha:all']);
    grunt.registerTask('build', ['jshint', 'test']);

    grunt.registerTask('default', ['jshint', 'coverage']);
};
