# Github Branch Status
![Screenshot](https://raw.githubusercontent.com/joaodelgado/github-branch-status/master/images/screenshot.png)

Small chrome plugin built with [Vue.js](https://vuejs.org/) to include a branch CI status in the home of a github repo.

This can be useful when your CI server isn't publicly available and the traditional status badges aren't an option.

This plugin allows to configure what branches to check per repo.
It then uses the GitHub API to check the status of each branch.

To use on private repositories it is necessary to provide a [personal access token](https://github.com/settings/tokens)

## How to install

Drag and drop `dist/chrome.crx` into `chrome://extensions/`.

## Development

This project uses [yarn](https://yarnpkg.com/en/) to manage dependencies and [Webpack](https://webpack.github.io/) to build the extension.

To install all dependencies run:

    yarn install

To build the extension run:

    webpack --progress --watch

Then add the `build/manifest.json` as a unpacked extension.
