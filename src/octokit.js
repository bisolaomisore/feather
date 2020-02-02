const config = require("./config");
const Octokit = require("@octokit/rest");
const octokit = new Octokit({
  auth: config.PERSONAL_ACCESS_TOKEN
});

export default octokit;