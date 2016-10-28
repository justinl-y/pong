const join = require('path').join;
const resolve = require('path').resolve;
const webpack = require('webpack');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');

const PATHS = {
	src: join(__dirname, 'src'),
	fonts: join(__dirname, 'fonts'),
	build: join(__dirname, 'build')
};

module.exports = {
   entry: "./src/index.js",
   devServer: {
     inline: true,
     host: '0.0.0.0',
     port: '3000',
     watchOptions: {
         aggregateTimeout: 300,
         poll: true
     }
   },
   output: {
       path: __dirname,
       filename: "./build/bundle.js"
   },
   module: {
       loaders: [
           {
             test: /\.css$/,
             loader: "style!css"
           },
           {
             test: /\.scss$/,
             loaders: ['style', 'css', 'sass?sourceMap']
           },  
           {
             test: /\.js$/,
             exclude: /node_modules/,
             loader: 'babel-loader',
             query: {
               presets: ['es2015']
             }
           },
           {
           test: /\.(eot|svg|ttf|woff|woff2)$/,
           loader: 'file?name=public/fonts/[name].[ext]'
           }
       ]
   },
   plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new OpenBrowserPlugin({ url: 'http://localhost:3000'}),
	]
};

/*module.exports = {
	entry: {
		src: join(PATHS.src, 'index.js')
	},
	resolve: {
		extensions: ['', '.js']
	},
	output: {
		path: PATHS.build,
		publicPath: '/pong/',
		filename: 'bundle.js'
	},
	module: {
		loaders: [{
			test: /\.css$/,
			loaders: ['style', 'css'],
			include: PATHS.src
		}, {
			test: /\.js$/,
			loader: 'babel',
			include: PATHS.src,
			exclude: /node_modules/
		}, {
			test: /\.(eot|svg|ttf|woff|woff2)$/,
			include : PATHS.fonts,
			loader: `file?name=/fonts/[name].[ext]`
		}]
	},
	devtool: 'eval-source-map',
	devServer: {
		contentBase: process.cwd(),

		historyApiFallback: true,
		hot: true,
		inline: true,
		progress: true,

		// display only errors to reduce the amount of output
		stats: 'errors-only',

		// parse host and port from env so this is easy
		// to customize
		host: process.env.HOST,
		port: process.env.PORT
	},
	devServer: {
        inline: true,
        host: '0.0.0.0',
        port: '3000',
        watchOptions: {
            aggregateTimeout: 300,
            poll: true
        },
    },
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new OpenBrowserPlugin({ url: 'http://localhost:8080/webpack-dev-server/bundle'}),
		new OpenBrowserPlugin({ url: 'http://localhost:3000'}),
	]
};*/


