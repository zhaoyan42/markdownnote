
'use strict';

var fs = require('fs');
var path=require('path');

module.exports = function(grunt) {
  grunt.registerMultiTask('convert_ppt', 'convert markdown to online ppt files.', function () {
    var options=this.options();
    var template=grunt.file.read(options.template);
    this.files.forEach(function(file){
      file.src.forEach(function(src){
        var converted_file_name=src.substr(0, src.lastIndexOf('.')) || src ;
        converted_file_name= converted_file_name + '_PPT.html'
        var dest=path.join(file.dest,converted_file_name);
        grunt.file.write(dest, template.replace('<%=Markdown%>',
          grunt.file.read(path.join(file.cwd,src))));
        grunt.log.writeln("convert a file " + src + " to presentation " + dest);
      })
    });

  });
}
