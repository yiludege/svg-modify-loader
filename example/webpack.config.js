module.exports = {
  context: __dirname,
  entry: "./main",
  output: {
    path: __dirname + "/dist",
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.svg$/,
        use: [
          { loader: "file-loader" },
          {
            loader: "../index.js",
            options: {
              handler: function (node) {
                if (node.attributes.class) {
                  delete node.attributes.class;
                }
              },
            },
          },
        ],
      },
    ],
  },
};
