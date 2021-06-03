const core = require("@actions/core");
const github = require("@actions/github");
const fetch = require("node-fetch");

const query = `
query getPackage($owner: String!, $repo: String! $packageNames: [String!]) {
  repository(owner: $owner, name: $repo) {
    id
    packages(first: 10, names: $packageNames) {
      nodes {
        id
        name
        packageType
        versions(first: 10) {
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
  // const repoName = core.getInput("name");
  console.log(`github context: ${github.context}`);
  const repo = github.context.repo;

  console.log(`Checking package ${name}!`);
  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify(github.context.payload, undefined, 2);
  console.log(`The event payload: ${payload}`);
  const variables = {
    owner,
    repo,
    packageNames: [name],
  };
  fetch("https://api.github.com/graphql", {
    method: "POST",
    body: JSON.stringify({ query, variables }),
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
    .then((res) => res.text())
    .then((body) => console.log(body))
    .catch((error) => core.setFailed(error));
} catch (error) {
  core.setFailed(error.message);
}
