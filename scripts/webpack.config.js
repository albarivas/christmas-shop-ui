const webpack = require('webpack');
module.exports = {
    plugins: [new webpack.EnvironmentPlugin(['API_URL'])]
};
