
module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        concat: {
            dist: {
                src: [// 'js/*.js', // Все JS в папке libs
                    'public_html/assets/js/jquery-1.11.1.min.js',
                    'public_html/assets/bootstrap/js/bootstrap.min.js',
                    'public_html/assets/js/jquery.backstretch.min.js',
                    'public_html/assets/js/retina-1.1.0.min.js',
                    'public_html/assets/js/scripts.js',
                    'public_html/assets/js/jquery.maskedinput.min.js',
                    'public_html/assets/js/bootstrap-datepicker.min.js',
                    'public_html/assets/js/jquery.form.min.js'
                    
                ],
                dest: 'tmp/app.js',
                
            }
        },
        uglify: {
            build: {
                src: 'tmp/app.js',
                dest: 'public_html/assets/js/app.js'
            }
        },
        cssmin: {
            options: {
                keepSpecialComments: 0,
                shorthandCompacting: false,
                roundingPrecision: -1
            },
            target: {
                files: {
                    "public_html/assets/css/app.css": ['public_html/assets/bootstrap/css/bootstrap.min.css',
                        'public_html/assets/css/form-elements.css',
                        'public_html/assets/css/style.css',
                        'public_html/assets/css/bootstrap-datepicker3.min.css']
                }
            }
        }

    });
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    grunt.registerTask('default',
            ['concat', "cssmin", "uglify"]);

};
