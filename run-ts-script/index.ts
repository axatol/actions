import * as fs from "fs/promises";
import * as core from "@actions/core";
import * as esbuild from "esbuild";
import * as exec from "@actions/exec";
import * as github from "@actions/github";
import * as io from "@actions/io";

const AsyncFunction = Object.getPrototypeOf(async () => null).constructor;

const handleError = (err: any): void => {
  console.error(err);
  core.setFailed(`Unhandled error: ${err}`);
};

const callFunction = (props: Record<string, any>, body: string) => {
  const params = Object.keys(props);
  const args = Object.values(props);
  const fn = new AsyncFunction(...params, body);
  return fn(...args);
};

const opts: esbuild.TransformOptions = {
  platform: "node",
  sourcemap: "inline",
  loader: "ts",
};

const main = async () => {
  const input = {
    scriptFilename: core.getInput("script-filename"),
    script: core.getInput("script"),
  };

  core.debug(`input script filename: ${input.scriptFilename}`);
  core.debug(`input script: ${input.script}`);

  if (!input.scriptFilename && !input.script) {
    core.setFailed("Must specify one of script or script-filename");
    process.exit(1);
  }

  let raw = input.script;

  if (input.scriptFilename) {
    const exists = await fs.stat(input.scriptFilename);
    if (!exists.isFile()) {
      core.setFailed("script-filename must target a file");
      process.exit(1);
    }

    const buffer = await fs.readFile(input.scriptFilename);
    raw = buffer.toString();
  }

  core.debug(`script raw: ${raw}`);

  if (!raw) {
    core.setFailed("No script body to transform");
    process.exit(1);
  }

  const script = await esbuild.transform(raw, opts);
  core.debug(`transformed code: ${script.code}`);

  await callFunction({ core, exec, github, io }, script.code);
};

process.on("unhandledRejection", handleError);
main().catch(handleError);
