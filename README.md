# 1.插件说明
	1.删除webpack预打包时产生的带有hash值的js文件
	2.带有文件排除功能
# 2.使用说明
	1.安装插件
		npm install webpack-delete-build-files --save-dev
	2.配置方法(修改webpack.dll.conf.js)<br/>
		const removeFiles = require('webpack-delete-build-files');//引入插件
		const perBuildDir = './static/js/';//要删除的文件目录(根据实际情况配置)
		const excludeFiles = ['html2canvas.js','jsPdf.debug.min.js'];//要排除的文件 避免误删
		//如果 没有需要排除的文件 这个参数就不需要传了  
		......
		module.exports = {
			......
			......
			plugins : [
				......
					new removeFiles(perBuildDir,excludeFiles)//有排除文件的写法
					new removeFiles(perBuildDir)//无排除文件的写法
			]
		}

# 3.其他说明
[npm地址](https://www.npmjs.com/package/webpack-delete-build-files)
[GitHub地址](https://github.com/wangfpp/webpack-delete-build-files)
