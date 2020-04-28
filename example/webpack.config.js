module.exports = {
  mode: "production",
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
              // use function to process json ast
              handler: function (node, playload) {
                let attr = node.attributes;
                // delete all class attribute
                if (attr.class) {
                  delete attr.class;
                }
                // add fill none for all node which have no fill
                if (!attr.fill && !playload.fill && node.name !== 'svg') {
                  attr.fill = "none";
                }
                return playload.fill ? playload : attr.fill ? { fill: attr.fill } : {};
              },
            },
          },
        ],
      },
    ],
  },
};
