const path = require('path');
const VirtualModulesPlugin = require('webpack-virtual-modules');

class DemoPlugin {
  apply(compiler) {
    compiler.hooks.invalid.tap('DEMO-PLUGIN', (file) => {
      console.log('DEMO-PLUGIN', { file });
    });
  }
}

/**
 * @type {import('webpack').Configuration} 
 **/
const config = {
  name: 'server',
  mode: 'development',
  entry: './index.js',
  target: 'node',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  plugins: [
    new DemoPlugin(),
    new VirtualModulesPlugin({
      [path.join(process.cwd(), 'node_modules', 'virtual.json')]: '{}'
    }),
  ],
  stats: false,
};

module.exports = [config];
// module.exports = config; // it works 
