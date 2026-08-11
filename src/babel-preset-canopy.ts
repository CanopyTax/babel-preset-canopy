import type * as BabelCore from "@babel/core";

module.exports = (api: BabelCore.ConfigAPI): BabelCore.TransformOptions => {
  api.assertVersion("^7.0.0");

  // Referenced by absolute path, not by name: Babel resolves bare preset and
  // plugin names relative to the consuming project's babel config, not to this
  // package. Yarn may nest these under this package rather than hoisting them —
  // which of the two happens depends on the consumer's whole dependency graph —
  // and a bare name is unresolvable when it nests, forcing consumers to
  // redeclare these just to get a top-level copy. Resolving here anchors the
  // lookup to this package instead.
  const presets: BabelCore.PluginItem[] = [
    [require.resolve("@babel/preset-typescript")],
    [
      require.resolve("@babel/preset-react"),
      {
        runtime: "automatic",
        development: process.env.NODE_ENV === "development",
      },
    ],
    [
      require.resolve("@babel/preset-env"),
      {
        bugfixes: true, // limit transforms to known bugfixes (based on browserslist targets)
        modules: false, // this option is misleadingly named; setting to false preserves ES modules
        shippedProposals: false, // only stable features
      },
    ],
  ];

  const plugins: BabelCore.PluginItem[] = [
    [
      require.resolve("@babel/plugin-transform-runtime"),
      {
        helpers: true,
        regenerator: true,
        useESModules: true,
      },
    ],
    [
      require.resolve("babel-plugin-webpack-import-ignore"),
      { pattern: "^@canopytax/" },
    ],
  ];

  return { presets, plugins };
};
