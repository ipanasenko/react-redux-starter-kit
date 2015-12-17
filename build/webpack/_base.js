import webpack from 'webpack';
import cssnano from 'cssnano';
import config from '../../config';
import _debug from 'debug';

const paths = config.utils_paths;
const debug = _debug('app:webpack:_base');
debug('Create configuration.');

const CSS_LOADER = !config.compiler_css_modules ? 'css?sourceMap' : [
  'css?modules',
  'sourceMap',
  'importLoaders=1',
  'localIdentName=[name]__[local]___[hash:base64:5]'
].join('&');

const CSS_LOADERS = [
  'style?singleton',
  CSS_LOADER,
  'postcss'
];

const webpackConfig = {
  name: 'client',
  target: 'node',
  entry: paths.base(config.dir_client) + '/app.js',
  output: {
    filename: config.main,
    path: paths.base(config.dir_dist),
    publicPath: config.compiler_public_path,
    libraryTarget: 'commonjs2'
  },
  externals: config.compiler_vendor,
  plugins: [
    new webpack.DefinePlugin(config.globals),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.DedupePlugin()
  ],
  resolve: {
    root: paths.base(config.dir_client),
    extensions: ['', '.js', '.jsx']
  },
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        loader: 'eslint',
        exclude: /node_modules/
      }
    ],
    loaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          cacheDirectory: true,
          plugins: ['transform-runtime', 'add-module-exports'],
          presets: ['es2015', 'react', 'stage-0'],
          env: {
            development: {
              plugins: [
                ['react-transform', {
                  // omit HMR plugin by default and _only_ load in hot mode
                  transforms: [{
                    transform: 'react-transform-catch-errors',
                    imports: ['react', 'redbox-react']
                  }]
                }]
              ]
            }
          }
        }
      },
      {
        test: /\.styl/,
        loaders: [
          ...CSS_LOADERS,
          'stylus'
        ]
      },
      {
        test: /\.css$/,
        loaders: CSS_LOADERS
      },
      /* eslint-disable */
      {
        test: /\.woff(\?.*)?$/,
        loader: 'url?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/font-woff'
      },
      {
        test: /\.woff2(\?.*)?$/,
        loader: 'url?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/font-woff2'
      },
      {
        test: /\.ttf(\?.*)?$/,
        loader: 'url?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/octet-stream'
      },
      { test: /\.eot(\?.*)?$/, loader: 'file?prefix=fonts/&name=[path][name].[ext]' },
      { test: /\.svg(\?.*)?$/, loader: 'url?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=image/svg+xml' },
      { test: /\.(png|jpg)$/, loader: 'url?limit=8192' }
      /* eslint-enable */
    ]
  },
  postcss: [
    cssnano({
      sourcemap: true,
      autoprefixer: {
        add: true,
        remove: true,
        browsers: ['last 2 versions']
      },
      discardComments: {
        removeAll: true
      }
    })
  ],
  eslint: {
    configFile: paths.base('.eslintrc')
  }
};

export default webpackConfig;
