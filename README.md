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
}
```

### handler(node, playload)

- handler is a function
- parameter node is currently svg node
- parameter playload is context returned by parent node handler return, if no return, the value will inherit the chained node handler return until {}
