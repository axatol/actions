const core = require("@actions/core");
const { increment } = require("./increment");

try {
  const version = core.getInput("version", {
    required: true,
    trimWhitespace: true,
  });

  const field = core.getInput("field", {
    required: true,
    trimWhitespace: true,
  });

  const result = increment(version, field);

  core.setOutput("next-version", result);
  core.info(`incremented version ${field}, ${version} -> ${result}`);
} catch (error) {
  core.setFailed(error);
}
