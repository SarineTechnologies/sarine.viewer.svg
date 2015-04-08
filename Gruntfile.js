'use strict';
module.exports = function(grunt) {
    var path = require("path");
    var dirname = __dirname.split(path.sep)
    dirname.pop();
    dirname = dirname.pop();
    var branch = "dev"
    require('load-grunt-tasks')(grunt)
    var files = ["Gruntfile.js", "copyright.txt", "GruntfileBundle.js", "package.json", "dist/*.js", "coffee/*.coffee", "bower.json", "release.cmd", "commit.cmd"]
    var message = "commit"
    grunt.initConfig({
        config: grunt.file.readJSON("bower.json"),
        version: {
            project: {
                src: ['bower.json', 'package.json']
            }
        },
        gitcheckout: {
            task: {
                options: {
                    branch: "<%= branch %>",
                    overwrite: true
                }
            }
        },
        gitcommit: {
            all: {
                options: {
                    message: "<%= config.message %>",
                    force: true
                },
                files: {
                    src: files
                }
            },
            bower: {
                options: {
                    message: "release : <%= config.version %>",
                    force: true
                },
                files: {
                    src: ["bower.json", "package.json"]
                }
            }
        },
        gitpush: {
            all: {
                options: {
                    branch: "<%= branch %>",
                    force: true
                },
                files: {
                    src: files
                }
            }
        },
        gitadd: {
            firstTimer: {
                option: {
                    force: true
                },
                files: {
                    src: files
                }
            }
        },
        gitpull: {
            build: {
                options: {
                    force: true
                },
                files: {
                    src: files
                }
            }
        },
        prompt: {
            all: {
                options: {
                    questions: [{
                        config: 'config.customBranch',
                        type: 'confirm',
                        message: 'create new branch base on the folder name - ' + dirname
                    }, {
                        config: 'config.message',
                        type: 'input',
                        message: 'comment:\n',
                        default: 'commit'
                    }],
                    then: function(results, done) {
                        grunt.log.writeln(results["config.customBranch"])
                        grunt.config.set('branch', 'dev')
                        if (results["config.customBranch"]) {
                            grunt.config.set('branch', dirname);
                            grunt.task.run('gitcheckout:task');
                        }
                        done();
                        return true;
                    }
                }
            }
        }
    })
    grunt.registerTask('commit', ['prompt', 'gitadd', 'gitcommit:all', 'gitpush']);
    grunt.registerTask('release-git', ['release:' + grunt.file.readJSON("bower.json")["version"]]);
};