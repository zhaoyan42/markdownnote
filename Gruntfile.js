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
	to_html:{
	  main:{
	    options: {
		  title: '卓逸天成知识文库',
		  rootDirectory: 'dist',
		  useFileNameAsTitle: true,
		  generatePage: true
		},
		files: {
		  'dist/Index.html': 'dist/**/*.html'
		}
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
  grunt.loadNpmTasks('grunt-directory-to-html');
  
  
  grunt.registerTask('build',['clean:dist','markdown','to_html']);
}