import * as core from "@actions/core";
import { increment } from "./increment";

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
} catch (error: any) {
  core.setFailed(error);
}
