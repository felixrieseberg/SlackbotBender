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
            all: { src: ['core/test/**/*.js'] },
            coverage: { src: ['coverage/instrument/core/test/**/*.js' ] }
        },

        jshint: {
            all: [ '*.js', 'core/**/*.js']
        },

        jsdoc2md: {
            indexed: {
                options: {
                    index: true
                },
                src: ['app.js', 'core/**/*.js'],
                dest: 'doc/README.md'
            }
        },

        env: {
            coverage: {
                DIR_FOR_CODE_COVERAGE: '../../coverage/instrument/'
            }
        },
        clean: {
            coverage: {
                src: [ 'coverage/instrument' ]
            }
        },
        instrument: {
            files: ['app.js', 'core/bot/**/*.js', 'core/integrations/**/*.js', 'core/test/**/*.js' ],
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
    grunt.loadNpmTasks("grunt-jsdoc-to-markdown");
    grunt.loadNpmTasks('grunt-istanbul');

    grunt.registerTask('coverage', ['instrument', 'simplemocha:coverage', 'storeCoverage', 'makeReport']);
    grunt.registerTask('test', ['jshint', 'simplemocha:all']);
    grunt.registerTask('build', ['jshint', 'test']);

    grunt.registerTask('default', ['jshint', 'jsdoc2md', 'coverage']);
};
