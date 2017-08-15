class StoredItem {
    constructor({ key, initial, obfuscate = false }) {
        this.key = key;
        this.initial = initial;
        this.obfuscate = obfuscate;
    }

    get() {
        let value = window.localStorage.getItem(this.key);
        if (value === null) {
            value = this._getInitial();
        }

        if (value === undefined || value === null) {
            return null;
        }

        if (this.obfuscate) {
            value = atob(value);
        }

        return JSON.parse(value);
    }

    set(param) {
        let value = param;
        if (value !== undefined && value !== null) {
            value = JSON.stringify(value);
            if (this.obfuscate) {
                value = btoa(value);
            }
        } else {
            value = null;
        }

        window.localStorage.setItem(this.key, value);
        return value;
    }

    _getInitial() {
        let value = this.initial;
        if (typeof this.initial === 'function') {
            value = this.initial();
        }

        return this.set(value);
    }
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = StoredItem;
}
