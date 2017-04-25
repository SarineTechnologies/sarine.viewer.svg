'use strict'
module.exports = function(grunt) {

    require('load-grunt-tasks')(grunt)
    
    function decideBaseViewer()
    {
        if(process.env.buildFor == 'deploy')
        {
            grunt.log.writeln("base viewer is in node_modules");

            return 'node_modules/sarine.viewer/';
        }
        else
        {
            grunt.log.writeln("base viewer is locally relative to development environment");

            return '../sarine.viewer/';
        }
    }

    grunt.initConfig({
        config: grunt.file.readJSON("package.json"),
        clean: {
            build: ["dist/"]
        },
        coffee: {
            bundle: {
                options: {
                    sourceMap: true,
                },
                files: {
                    'dist/<%= config.name %>.bundle.js' : [decideBaseViewer() + 'coffee/*.coffee', 'coffee/*.coffee'] // concat then compile into single file
                }
            }
        },
        uglify: {
            options: {
                banner: '/*\n<%= config.name %> - v<%= config.version %> - ' +
                        ' <%= grunt.template.today("dddd, mmmm dS, yyyy, h:MM:ss TT") %> ' + '\n ' + grunt.file.read("copyright.txt") + '\n*/',
                preserveComments: false,
                sourceMap : true,
                sourceMapIn: "dist/<%= config.name %>.bundle.js.map"
            },
            build: {
                src: 'dist/<%= config.name %>.bundle.js',
                dest: 'dist/<%= config.name %>.bundle.min.js'
            }
        }
    });
    
    grunt.registerTask('bundle', [
        'clean:build',
        'coffee',// Compile CoffeeScript files to JavaScript + concat + map
        'uglify',//min + banner + remove comments + map    
    ]);
};
