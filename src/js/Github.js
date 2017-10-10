import axios from 'axios';

import { hasValue } from './Utils';

const GITHUB_API_BASE = 'https://api.github.com';

export default class GitHub {
    owner() {
        const match = this._repoHomePath();
        if (match) {
            return match[1];
        }
        return null;
    }

    repo() {
        const match = this._repoHomePath();
        if (match) {
            return match[2];
        }
        return null;
    }

    ref() {
        const match = this._repoHomePath();
        if (match && match[4]) {
            return match[4];
        }

        // If we can't find the current branch from the path
        // Try to inspect the page to get it.
        const branchSelector = document.querySelector('.branch-select-menu .select-menu-item.selected');
        return branchSelector.attributes['data-name'].value;
    }

    fetchStatus(token, branch) {
        let config;

        if (hasValue(token)) {
            config = {
                headers: {
                    Authorization: `token ${token}`,
                },
            };
        }

        return axios.get(
            `${GITHUB_API_BASE}/repos/${this.owner()}/${this.repo()}/commits/${branch}/status`,
            config
        );
    }

    checkAuthorization(token) {
        return this.fetchStatus(token, this.ref());
    }

    inRepoHome() {
        return !!document.querySelector(this.readmeSelector());
    }

    readmeSelector() {
        return '#readme article';
    }

    _repoHomePath() {
        return window.location.pathname.match(/^\/([\w-.]+)\/([\w-.]+)(\/tree\/([\w-.]+))?\/?$/);
    }
}
