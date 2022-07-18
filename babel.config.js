module.exports = {
  env: {
    development: {
      plugins: ["@babel/plugin-transform-modules-commonjs"],
    },
    test: {
      plugins: ["@babel/plugin-transform-modules-commonjs"],
    },
  },
};
