module.exports = function(config) {
  config.set({
    mutate: [
      'test/**/*.js',
    ],
    mutator: "javascript",
    packageManager: "npm",
    reporters: ["baseline", "html", "clear-text", "progress", "dashboard"],
    testRunner: "mocha",
    transpilers: [],
    testFramework: "mocha",
    coverageAnalysis: "perTest"
  });
};
