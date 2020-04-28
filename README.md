svg-modify-loader is a loader of webpack

## install

```
$ npm install svgson svg-modify-loader --save-dev
```

## usage

svg-modify-loader use [svgson](https://github.com/elrumordelaluz/svgson) library to transform svg files to json，then developer can modify the json and convert json ast back to svg

```javascript
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
            // example here is delete all class attribute
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
}
```
