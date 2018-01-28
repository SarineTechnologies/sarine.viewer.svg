'use strict';
module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt)
    var target = grunt.option('target') || "";
    var config = {};
	config.dist = decideDist();
    config.coreFiles = getCoreFiles();
    
    grunt.initConfig({
        config: grunt.file.readJSON(target + "package.json"),
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
                src: [config.coreFiles , target + 'coffee/<%= config.name %>.bundle.coffee'],
                dest: target + 'coffee/<%= config.name %>.bundle.coffee',
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
        },
        copy: {
            bundle: {
                dest: target + 'dist/<%= config.name %>.config',
                src: [target + '<%= config.name %>.config']
            },
            dist_root_files: {
                files: [{
                        cwd: 'dist/',
                        src: '**',
                        dest: config.dist.root,
                        expand: true
                    }]
            }
        }
    })
    grunt.registerTask('build', [
        'clean:build',
        'clean:bundlecoffee',
        'coffeescript_concat',
        'commentsCoffee:coffeeBundle',
        'concat:coffeebundle',
        'coffee:bundle',
        'commentsCoffee:coffee',
        'concat:coffee',
        'coffee:build',
        'uglify',
        'clean:postbuild',
        'copyVersion',
        'copy:bundle',
        'copy:dist_root_files'
    ]);
    grunt.registerMultiTask('commentsCoffee', 'Remove comments from production code', function() {
        this.files[0].src.forEach(function(file) {
            var contents = grunt.file.read(file);
            if (contents.match(/###!([\s\S]*?)###[\s\S]*?/gm))
                contents = contents.replace(/###!([\s\S]*?)###[\s\S]*?/gm, "");
            else {

                contents = contents;
            }
            grunt.file.write(file, contents);
        });
    });
       grunt.registerTask('copyVersion' , 'copy version from package.json to sarine.viewer.clarity.config' , function (){
        var packageFile = grunt.file.readJSON(target + 'package.json');
        var configFileName = target + packageFile.name + '.config';
        var copyFile = null;
        if (grunt.file.exists(configFileName))
            copyFile = grunt.file.readJSON(configFileName);
        
        if (copyFile == null)
            copyFile = {};

        copyFile.version = packageFile.version;
        grunt.file.write(configFileName , JSON.stringify(copyFile));
    });

    function decideDist()
    {
        if(process.env.buildFor == 'deploy')
        {
            grunt.log.writeln("dist is github folder");

            return {
                root: 'app/dist/'
            }
        }
        else
        {
            grunt.log.writeln("dist is local");

            return {
                root: '../../../dist/content/viewers/atomic/v1/js/'
            }
        }
    }

    function getCoreFiles()
    {
        var core;

        if(process.env.buildFor == 'deploy')
        {
            core = 
            [
                'node_modules/sarine.viewer/coffee/sarine.viewer.bundle.coffee'
            ]

            grunt.log.writeln("taking core files from node_modules");
        }
        else
        {
            core = 
            [
                '../../core/sarine.viewer/coffee/sarine.viewer.bundle.coffee'
            ]

            grunt.log.writeln("taking core files from parent folder");
        }

        return core;
    }
};
