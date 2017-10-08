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
        if (match) {
            return match[4];
        }
        return null;
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
        let config;

        if (hasValue(token)) {
            config = {
                headers: {
                    Authorization: `token ${token}`,
                },
            };
        }
        return axios.get(
            `${GITHUB_API_BASE}/repos/${this.owner()}/${this.repo()}`,
            config
        );
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

