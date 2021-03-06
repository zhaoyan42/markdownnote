﻿module.exports = function(grunt){
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
					  src: ['**/*.css','**/*.js','**/*.png','**/*.jpg','**/*.gif','**/*.svg'],
					  dest: 'dist'
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
				  title: '笔记',
				  rootDirectory: 'dist',
				  useFileNameAsTitle: true,
				  generatePage: true,
				  stylesheet: 'Style.css'
			  },
			  files: {
				  'dist/index.html': 'dist/**/*.html',
			  }
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

  grunt.registerTask('build',['clean:dist','markdown','generate_index','copy']);
  grunt.registerTask('default',['build']);
}