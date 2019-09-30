module.exports = {
    context: __dirname,
    entry: {
        Customers: "./CustomerIndex.jsx",
        Stores: "./StoreIndex.jsx",
        Products: "./ProductIndex.jsx",
        Sales: "./SaleIndex.jsx",
    },
    output: {
        path: __dirname + "/dist",
        filename: "[name].bundle.js"
    },
    mode: 'development',
    watch: true,
    resolve: {
        extensions: [".jsx", ".js"]
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_models)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react']
                    }
                }
            }

        ]
    }
}
