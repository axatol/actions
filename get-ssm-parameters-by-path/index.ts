import * as core from "@actions/core";
import { paginateGetParametersByPath, SSMClient } from "@aws-sdk/client-ssm";

(async () => {
  const inputs = {
    region: core.getInput("region"),
    path: core.getInput("path"),
    prefix: core.getInput("prefix"),
  };

  const client = new SSMClient({ region: inputs.region });

  try {
    const paginator = paginateGetParametersByPath(
      { client },
      { Path: inputs.path, WithDecryption: true },
    );

    const parameters: { name: string; path: string; value: string }[] = [];

    core.startGroup("Reading parameters");

    for await (const page of paginator) {
      for (const parameter of page.Parameters ?? [])
        if (parameter.Name && parameter.Value) {
          core.setSecret(parameter.Value);

          const name =
            inputs.prefix +
            parameter.Name.replace(inputs.path, "")
              .replace(/^\//, "")
              .replace(/\//g, "_")
              .toUpperCase();

          core.info(`Exporting parameter: ${parameter.Name} -> ${name}`);
          core.exportVariable(name, parameter.Value);

          parameters.push({
            name,
            path: parameter.Name,
            value: parameter.Value,
          });
        }
    }

    core.endGroup();

    core.setOutput("parameters", parameters);
  } catch (error) {
    core.setFailed("failed to fetch parameters");
    core.error(error as Error);
  }
})();
