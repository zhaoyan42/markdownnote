module.exports = function(grunt){
  grunt.initConfig({
	markdown: {
	  all: {
		files: [
		  {
		    expand: true,
			cwd: 'Src',
			src: '**/*.md',
			dest: 'dist/',
			ext: '.html'
		  }
		]
	  }
	},
	
    clean:{
	  dist: {
	    files:[{
		  dot: true,
		  src: [
		    'dist/*'
		  ]
		}]
      }
	}
  });
  
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-markdown');
  
  
  grunt.registerTask('build',['clean:dist','markdown']);
}