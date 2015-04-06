'use strict';
module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt)
    var target = grunt.option('target') || "";
    grunt
    grunt.initConfig({
        config: grunt.file.readJSON(target + "bower.json"),
        clean: {
            build: [target + "lib/", target + "dist/", target + "build/"],
            bundlecoffee: [target + "coffee/*.bundle.coffee"],
            postbuild: [target + "build/"]
        },
        commentsCoffee: {
            coffee: {
                src: [target + 'coffee/<%= config.name %>.coffee'],
                dest: target + 'coffee/<%= config.name %>.coffee',
            },
            coffeeBundle: {
                src: [target + 'coffee/<%= config.name %>.bundle.coffee'],
                dest: target + 'coffee/<%= config.name %>.bundle.coffee',
            },
        },
        concat: {
            coffee: {
                options: {
                    stripBanners: true,
                    banner: '###!\n<%= config.name %> - v<%= config.version %> - ' +
                        ' <%= grunt.template.today("dddd, mmmm dS, yyyy, h:MM:ss TT") %> ' + '\n ' + grunt.file.read("copyright.txt") + '\n###',
                },
                src: [target + 'coffee/<%= config.name %>.coffee'],
                dest: target + 'coffee/<%= config.name %>.coffee',
            },
            coffeebundle: {
                options: {
                    stripBanners: true,
                    banner: '###!\n<%= config.name %> - v<%= config.version %> - ' +
                        ' <%= grunt.template.today("dddd, mmmm dS, yyyy, h:MM:ss TT") %> ' + '\n ' + grunt.file.read("copyright.txt") + '\n###\n',
                },
                src: [target + 'coffee/<%= config.name %>.bundle.coffee'],
                dest: target + 'coffee/<%= config.name %>.bundle.coffee',
            }
        },
        bower: {
            install: {
                verbose : true,
                bowerOptions: {
                    forceLatest: true
                },
                options: {
                    targetDir: target + "lib",
                    layout: function(type, component, source) {
                        var renamedType = type;
                        if (source.indexOf("bundle") == -1 &&
                            type == 'coffee' &&
                            grunt.file.readJSON(target + "bower.json").dependencies &&
                            Object.getOwnPropertyNames(grunt.file.readJSON(target + "bower.json").dependencies).indexOf(component) != -1)
                            return "add";
                        else
                            return "remove";
                    }
                }
            }
        },
        uglify: {
            options: {
                preserveComments: 'some'
            },
            build: {
                src: target + 'dist/<%= config.name %>.js',
                dest: target + 'dist/<%= config.name %>.min.js'
            },
            bundle: {
                src: target + 'dist/<%= config.name %>.bundle.js',
                dest: target + 'dist/<%= config.name %>.bundle.min.js'
            }
        },
        coffeescript_concat: {
            bundle: {
                src: [target + 'lib/add/*.coffee', target + 'coffee/*.coffee', target + '!coffee/*.bundle.coffee'],
                dest: target + 'coffee/<%= config.name %>.bundle.coffee'

            }
        },
        coffee: {
            build: {
                option: {
                    join: true,
                    extDot: 'last'
                },
                dest: target + 'dist/<%= config.name %>.js',
                src: [target + 'coffee/<%= config.name %>.coffee']

            },
            bundle: {
                option: {
                    join: true,
                    extDot: 'last'
                },
                dest: target + 'dist/<%= config.name %>.bundle.js',
                src: [target + 'coffee/<%= config.name %>.bundle.coffee']

            }
        }
    })
    grunt.registerTask('bundle', [
        'clean:build',
        'clean:bundlecoffee',
        'bower',
        'coffeescript_concat',
        'commentsCoffee:coffeeBundle',
        'concat:coffeebundle',
        'coffee:bundle',
        'commentsCoffee:coffee',
        'concat:coffee',
        'coffee:build',
        'uglify',
        'clean:postbuild'
    ]);
    grunt.registerMultiTask('commentsCoffee', 'Remove comments from production code', function() {
        this.files[0].src.forEach(function(file) {
            var contents = grunt.file.read(file);
            if (contents.match(/###!([\s\S]*?)###[\s\S]*?/gm))
                contents = contents.replace(/###!([\s\S]*?)###[\s\S]*?/gm, "");
            else {

                contents = contents
            }
            grunt.file.write(file, contents);
        });
    });
};
