'use strict';
module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt)
    grunt.initConfig({
        config: grunt.file.readJSON("bower.json"),
        clean: {
            build: ["lib/","dist/", "build/"],
            postbuild: ["build/"]
        },
        bower: {
            install: {
                options: {
                    layout: function(type, component, source) {
                        var renamedType = type;
                        if (source.indexOf("bundle") == -1 &&
                            type == 'coffee' &&
                            Object.getOwnPropertyNames(grunt.file.readJSON("bower.json").dependencies).indexOf(component) != -1)
                            return "add";
                        else
                            return "remove";
                    }
                }
            }
        },
        version: {
            project: {
                src: ['bower.json', 'package.json']
            }
        },
        uglify: {
            build: {
                files: {
                    'dist/<%= config.name %>.min.js': 'dist/<%= config.name %>.js'
                }
            },
            bundle: {
                files: {
                    'dist/<%= config.name %>.bundle.min.js': 'dist/<%= config.name %>.bundle.js'
                }
            }
        },
        coffeescript_concat: {
            bundle: {

                files: {
                    'coffee/<%= config.name %>.bundle.coffee': ['lib/add/*.coffee', 'coffee/*.coffee', '!coffee/*.bundle.coffee']
                },

            }
        },
        coffee: {
            build: {
                option: {
                    join: true,
                    extDot: 'last'
                },
                files: {
                    'dist/<%= config.name %>.js': 'coffee/<%= config.name %>.coffee'
                },

            },
            bundle: {
                option: {
                    join: true,
                    extDot: 'last'
                },
                files: {
                    'dist/<%= config.name %>.bundle.js': 'coffee/<%= config.name %>.bundle.coffee'
                },

            }
        },
        gitcommit: {
            build: {
                files: {
                    src: ["dist/*.js", "coffee/*.coffee"]
                }
            },
            bower: {
                options: {
                    force: true
                },
                files: {
                    src: ["bower.json"]
                }
            },
            all: {
                options: {
                    force: true
                },
                files: {
                    src: ["Gruntfile.js", "package.json", "dist/*.js", "coffee/*.coffee", "bower.json"]
                }
            }
        },
        gitpush: {
            firstTimer: {
                options: {
                    force: true
                },
                files: {
                    src: ["Gruntfile.js", "package.json", "dist/*.js", "coffee/*.coffee", "bower.json", ".bowerrc"]
                }
            },
            build: {
                options: {
                    force: true
                },
                files: {
                    src: ["dist/*.js", "coffee/*.coffee"]
                }
            }
        },
        gitadd: {
            firstTimer: {
                option: {
                    force: true
                },
                files: {
                    src: ["Gruntfile.js", "package.json", "dist/*.js", "coffee/*.coffee", "bower.json", ".bowerrc"]
                }
            }
        },
        gitpull: {
            build: {
                options: {
                    force: true
                },
                files: {
                    src: ["dist/*.js", "coffee/*.coffee"]
                }
            },
            all: {
                options: {
                    force: true
                },
                files: {
                    src: ["Gruntfile.js", "package.json", "dist/*.js", "coffee/*.coffee", "bower.json", ".bowerrc"]
                }
            }
        }
    })
    grunt.registerTask('pull', ['gitpull:all']);
    grunt.registerTask('build', ['clean:build', 'coffee:build', 'uglify:build', 'clean:postbuild']);
    grunt.registerTask('bundle', ['clean:build', 'bower', 'coffeescript_concat', 'coffee', 'uglify', 'clean:postbuild']);
    grunt.registerTask('commit', ['gitpull:build', 'gitcommit:build', 'gitpush:build']);
    grunt.registerTask('firstTimer', ['gitadd', 'gitcommit:all', 'gitpush:firstTimer']);
    grunt.registerTask('release-git', ['version:project:patch', 'gitcommit:bower', 'release']);
};