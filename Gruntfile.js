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
			  ],
			  options: {
				  template: 'Templates/Article.html'
			  },
			  markdownOptions: {
				  highlight: 'manual'
			  }
		  }
	  },
	  copy: {
		  style: {
			  files: [
				  {
					  expand: true,
					  cwd: 'Templates/',
					  src: ['**/*.css'],
					  dest: 'dist/kb'
				  },
				  {
					  expand: true,
					  cwd: 'Templates/',
					  src: ['**/*.css'],
					  dest: 'dist/icewine'
				  }
			  ]
		  },
		  picture: {
			  files: [
				  {
					  expand: true,
					  cwd: 'Src/',
					  src: ['**/*.png', '**/*.jpg', '**/*.gif'],
					  dest: 'dist/'
				  }
			  ]
		  }
	  },
	  generate_index: {
		  main: {
			  options: {
				  title: '卓逸天成知识文库',
				  rootDirectory: 'dist',
				  useFileNameAsTitle: true,
				  generatePage: true,
				  stylesheet: 'Style.css'
			  },
			  files: {
				  'dist/kb/Index.html': 'dist/kb/**/*.html',
				  'dist/icewine/Index.html': 'dist/icewine/**/*.html'
			  }
		  }
	  },
	  convert_ppt: {
		  all: {
			  options: {
				  template: 'Templates/Presentation/Skight/index.html'
			  },
			  files: [
				  {
					  cwd: 'Src/',
					  src: ['**/*.md'],
					  dest: 'dist/'
				  }
			  ]
		  }
	  },
	  clean: {
		  dist: {
			  files: [{
				  dot: true,
				  src: [
					  'dist/*'
				  ]
			  }]
		  }
	  }
  });
  grunt.loadTasks('tasks');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-markdown');

  grunt.registerTask('build',['clean:dist','markdown','convert_ppt','generate_index','copy']);
  grunt.registerTask('default',['build']);
}