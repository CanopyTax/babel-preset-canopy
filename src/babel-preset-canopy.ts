import type * as BabelCore from "@babel/core";

module.exports = (api: BabelCore.ConfigAPI): BabelCore.TransformOptions => {
  api.assertVersion("^7.0.0");

  const presets: BabelCore.PluginItem[] = [
    ["@babel/preset-typescript"],
    [
      "@babel/preset-react",
      {
        runtime: "automatic",
        development: process.env.NODE_ENV === "development",
      },
    ],
    [
      "@babel/preset-env",
      {
        bugfixes: true, // limit transforms to known bugfixes (based on browserslist targets)
        modules: false, // this option is misleadingly named; setting to false preserves ES modules
        shippedProposals: false, // only stable features
      },
    ],
  ];

  const plugins: BabelCore.PluginItem[] = [
    [
      "@babel/plugin-transform-runtime",
      {
        helpers: true,
        regenerator: true,
        useESModules: true,
      },
    ],
    ["babel-plugin-webpack-import-ignore", { pattern: "^@canopytax/" }],
  ];

  return { presets, plugins };
};
