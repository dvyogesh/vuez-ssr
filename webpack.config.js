var path = require("path");
var webpack = require("webpack");
var UglifyJsPlugin = require('uglifyjs-webpack-plugin');
module.exports = {
  entry: "./src/entry-client.js",
  output: {
    path: path.resolve(__dirname, "./dist"),
    publicPath: "/dist/",
    filename: "build.js"
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["vue-style-loader", "css-loader"]
      },
      {
        test: /\.scss$/,
        use: ["vue-style-loader", "css-loader", "sass-loader"]
      },
      {
        test: /\.sass$/,
        use: ["vue-style-loader", "css-loader", "sass-loader?indentedSyntax"]
      },
      {
        test: /\.vue$/,
        loader: "vue-loader",
        options: {
          loaders: {
            // Since sass-loader (weirdly) has SCSS as its default parse mode, we map
            // the "scss" and "sass" values for the lang attribute to the right configs here.
            // other preprocessors should work out of the box, no loader config like this necessary.
            scss: ["vue-style-loader", "css-loader", "sass-loader"],
            sass: [
              "vue-style-loader",
              "css-loader",
              "sass-loader?indentedSyntax"
            ]
          }
          // other vue-loader options go here
        }
      },
      {
        test: /\.js$/,
        loader: "babel-loader",
        options: {
            presets: ['es2015', "stage-2"],
            plugins: [ 'transform-object-rest-spread' ]
        },
        exclude: /node_modules/,
        
        
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: "file-loader",
        options: {
          name: "[name].[ext]?[hash]"
        }
      },
      {
        enforce: "pre",
        test: /\.(js|vue)$/,
        exclude: /node_modules/,
        loader: "eslint-loader",
        options: {
          formatter: require("eslint-friendly-formatter")
        }
      }
    ]
  },
  resolve: {
    alias: {
      vue$: "vue/dist/vue.esm.js",
      'src': path.resolve(__dirname, './src')
    },
    extensions: ["*", ".js", ".vue", ".json"]
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true,
    overlay: true,
    watchOptions: {
      poll: true
    }
  },
  performance: {
    hints: false
  },
  node: {
    net: 'empty',
    fs: 'empty'
  },
  devtool: "#eval-source-map"
};

if (process.env.NODE_ENV === "production") {
  module.exports.devtool = "#source-map";
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: '"production"'
      }
    }),
     new UglifyJsPlugin({
        //test: /\.js($|\?)/i,
        sourceMap: true,
        uglifyOptions: {
          mangle: {
            keep_fnames: true,
          },
          compress: {
            warnings: false,
          },
          output: {
            beautify: false,
          },
        },
      }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ]);
}
