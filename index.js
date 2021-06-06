const core = require("@actions/core");
const fetch = require("node-fetch");

const query = `
query getPackage($owner: String!, $repo: String! $packageNames: [String!]) {
  repository(owner: $owner, name: $repo) {
    id
    packages(first: 1, names: $packageNames) {
      nodes {
        id
        name
        packageType
        versions(first: 1) {
          nodes {
            id
            version
          }
        }
      }
    }
  }
}`;

try {
  // `who-to-greet` input defined in action metadata file
  // This should be a token with access to your repository scoped in as a secret.
  // The YML workflow will need to set myToken with the GitHub Secret Token
  // myToken: ${{ secrets.GITHUB_TOKEN }}
  // https://help.github.com/en/actions/automating-your-workflow-with-github-actions/authenticating-with-the-github_token#about-the-github_token-secret
  const accessToken = core.getInput("accessToken");
  const owner = core.getInput("owner");
  const name = core.getInput("name");
  const repo = core.getInput("repo");
  const debug = core.getInput("debug");

  const variables = {
    owner,
    repo,
    packageNames: [name],
  };
  debug && console.log("Inputs: ", variables);
  fetch("https://api.github.com/graphql", {
    method: "POST",
    body: JSON.stringify({ query, variables }),
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
    .then((res) => res.text())
    .then((body) => {
      debug && console.log(body);
      const json = JSON.parse(body);
      const version = json.data.repository.packages.nodes[0].versions.nodes[0];
      core.setOutput("version", version);
    })
    .catch((error) => core.setFailed(error));
} catch (error) {
  core.setFailed(error.message);
}
