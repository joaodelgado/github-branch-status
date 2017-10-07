class GitHub {
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

    inRepoHome() {
        return !!document.querySelector(this.readmeSelector());
    }

    readmeSelector() {
        return '#readme article';
    }

    _repoHomePath() {
        return window.location.pathname.match(/^\/([\w-]+)\/([\w-]+)(\/tree\/([\w-]+))?\/?$/);
    }
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = GitHub;
}

