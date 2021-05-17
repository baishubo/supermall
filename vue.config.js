const path = require('path');//引入path模块,为配置别名做准备
function resolve(dir){   
	return path.join(__dirname,dir)//path.join(__dirname)设置绝对路径
}

module.exports = {    
	chainWebpack: (config) => {        
			config.resolve.alias        		
			.set('@',resolve('./src'))        		
			.set('assets',resolve('./src/assets')) // set第一个参数：设置的别名，第二个参数：设置的路径    
			.set('common',resolve('./src/common')) // set第一个参数：设置的别名，第二个参数：设置的路径    
			.set('components',resolve('./src/components')) // set第一个参数：设置的别名，第二个参数：设置的路径    
			.set('network',resolve('./src/network')) // set第一个参数：设置的别名，第二个参数：设置的路径    
			.set('views',resolve('./src/views')) // set第一个参数：设置的别名，第二个参数：设置的路径    
		}
	}





// module.exports = {
//   configureWebpack: {
//     resolve: {
//       alias: {
//         'assets': 'src/assets',
//         'common': 'src/common',
//         'components': 'src/components',
//         'network': 'src/network',
//         'views': 'src/views',
//       }
//     }
//   }
// }