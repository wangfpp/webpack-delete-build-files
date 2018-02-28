/*
* @Author: wangfpp
* @Date:   2018-02-28 11:11:50
* @Last Modified by:   wangfpp
* @Last Modified time: 2018-02-28 11:25:14
*/
var fs = require("fs");
var path = require("path");

function DeleteBuildFiles(filePath,excludeFiles) {//filePath string 指定要删除的文件目录  excludeFiles  Array 要排除的文件
    this.filePath = filePath;
    this.excludeFiles = excludeFiles;
}; 
DeleteBuildFiles.prototype.apply = function(compile) {
    filePath = this.filePath;
    excludeFiles = this.excludeFiles;
    compile.plugin('done', function (compat) {
        const newlyCreatedAssets = compat.compilation.assets;
        const removeFiles = [];
        fs.readdir(path.resolve(filePath), (err, files) => {
            files.forEach(file => {
                if (!newlyCreatedAssets[file] && excludeFiles.indexOf(file) == -1) {
                    fs.unlink(path.resolve(filePath + file));
                    removeFiles.push(file);
                }
            });
            if (removeFiles.length > 0) {
                console.log('删除文件: ', removeFiles);
            }
        });
    });
};  

module.exports = DeleteBuildFiles;