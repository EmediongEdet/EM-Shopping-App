module.exports = {
  plugins: [
    // ['@snowpack/plugin-sass' ],
  ],
  mount: {
    src: "/",
  },
  buildOptions: {
    out: "build",
    baseUrl: "/",
    clean: true,
    htmlFragments: true,
  },
    optimize: {
      // 'bundle': true,
      minify: true,
      target: "esnext",
    },
};
