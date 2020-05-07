/*
* @Author: wangfpp
* @Date:   2018-02-28 11:11:50
 * @Last Modified by: wangfpp
 * @Last Modified time: 2020-05-07 11:35:37
*/
var fs = require("fs");
var path = require("path");

/**
 * 
 * @param {String} filePath 指定要删除的文件目录 
 * @param {Array} excludeFiles  要排除的文件
 */
function DeleteBuildFiles(filePath,excludeFiles) {
    this.filePath = filePath;
    this.excludeFiles = (excludeFiles && Array.isArray(excludeFiles)) ? excludeFiles : [];
}; 
DeleteBuildFiles.prototype.apply = function(compile) {
    let { filePath, excludeFiles } = this;
    compile.plugin('done', function (compat) {
        const newlyCreatedAssets = compat.compilation.assets;
        const removeFiles = [];
        fs.readdir(path.resolve(filePath), (err, files) => {
            if(excludeFiles.length > 0){
                files.forEach(file => {
                    if (!newlyCreatedAssets[file] && excludeFiles.indexOf(file) == -1) {
                        fs.unlink(path.resolve(filePath + file));
                        removeFiles.push(file);
                    }
                });
                if (removeFiles.length > 0) {
                    console.log('删除文件: ', removeFiles);
                }
            }else{
               files.forEach(file => {
                    if (!newlyCreatedAssets[file]) {
                        fs.unlink(path.resolve(filePath + file));
                        removeFiles.push(file);
                    }
                });
                if (removeFiles.length > 0) {
                    console.log('删除文件: ', removeFiles);
                } 
            }
        });
    });
};  

module.exports = DeleteBuildFiles;