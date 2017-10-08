# Github Branch Status

Small chrome plugin built with [Vue.js](https://vuejs.org/) to include a branch CI status in the home of a github repo.

This can be useful when your CI server isn't publicly available and the traditional status badges aren't an option.

This plugin allows to configure what branches to check per repo.
It then uses the GitHub API to check the status of each branch.

To use on private repositories it is necessary to provide a [personal access token](https://github.com/settings/tokens)
