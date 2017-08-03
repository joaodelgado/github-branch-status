class GitHub {

    constructor() {
        this.store = new Store();
    }

    owner() {
        const match = this._repoHomePath();
        if (match) {
            return match[1];
        } else {
            return null;
        }
    }

    repo() {
        const match = this._repoHomePath();
        if (match) {
            return match[2];
        } else {
            return null;
        }
    }

    ref() {
        const match = this._repoHomePath();
        if (match) {
            return match[4];
        } else {
            return null;
        }
    }

    inRepoHome() {
        return !!this._repoHomePath();
    }

    _repoHomePath() {
        return window.location.pathname.match(/^\/([\w-]+)\/([\w-]+)(\/tree\/([\w-]+))?\/?$/);
    }
}

if (typeof module !== "undefined" && module.exports) {
    module.exports = GitHub;
}
