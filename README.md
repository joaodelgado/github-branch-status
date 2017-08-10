# github-branch-status

Small chrome plugin to include a branch CI status in the home of a github repo.

This can be useful when your CI server isn't publicly available and aren't able to use the traditional status badges.

This plugin allows to configure what branches to check per repo.
It then uses the GitHub API to check the status of each branch.

On the first check, the plugin prompts for an authentication token. This token must have access to private repositories if you want to use it there.
