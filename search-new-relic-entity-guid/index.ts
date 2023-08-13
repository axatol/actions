import * as core from "@actions/core";
import fetch from "node-fetch";

const query = `
query ($name: String, $type: EntitySearchQueryBuilderType, $domain: EntitySearchQueryBuilderDomain) {
  actor {
    entitySearch(queryBuilder: {name: $name, domain: $domain, type: $type}) {
      results {
        entities {
          guid
          name
        }
      }
    }
  }
}
`;

interface Response {
  errors?: {
    message: string;
  }[];
  data?: {
    actor?: {
      entitySearch?: {
        results?: {
          entities: {
            guid: string;
            name: string;
          }[];
        };
      };
    };
  };
}

(async () => {
  const apiKey = core.getInput("api-key", { required: true });
  const entityName = core.getInput("name", { required: true });
  const entityDomain = core.getInput("domain");
  const entityType = core.getInput("type");

  const response = await fetch("https://api.newrelic.com/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Api-Key": apiKey,
    },
    body: JSON.stringify({
      query: query.replace(/\n\s*/g, " ").trim(),
      variables: JSON.stringify({
        name: entityName,
        domain: entityDomain,
        type: entityType,
      }),
    }),
  });

  const data = (await response.json()) as Response;
  console.log(JSON.stringify({ status: response.status, data }));

  if (data.errors) {
    data.errors.forEach((error) => core.error(error.message));
    core.setFailed("Request failed");
    return;
  }

  const entities = data?.data?.actor?.entitySearch?.results?.entities ?? [];

  // first guid
  core.setOutput("count", entities.length);
  if (entities.length > 0) {
    core.setOutput("guid", entities[0].guid);
  }

  if (entities.length > 1) {
    core.warning("More than one matching entity was found");
  }
})();
