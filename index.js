const { parse, stringify } = require("svgson");
const loaderUtils = require("loader-utils");
const fs = require("fs");
const path = require("path");

module.exports = function (source) {
  debugger;
  this.cacheable(true);
  const callback = this.callback;
  const asyncCallback = this.async();
  const config = loaderUtils.getOptions(this) || {};
  const handler = config.handler;

  try {
    const recursive = function (json) {
      handler(json);
      if (json.children.length) {
        json.children.forEach((sub) => recursive(sub));
      }
    };
    if (typeof handler === "function") {
      parse(source)
        .then(
          (json) => {
            recursive(json);
            return json;
          },
          (err) => asyncCallback(err instanceof Error ? err : new Error(err))
        )
        .then((json) => asyncCallback(null, stringify(json)));
    }
  } catch (err) {
    callback(err instanceof Error ? err : new Error(err));
  }
};
