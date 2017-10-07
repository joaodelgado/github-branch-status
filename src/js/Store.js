class StoredItem {
    constructor({ key, obfuscate = false }) {
        this.key = key;
        this.obfuscate = obfuscate;
    }

    get() {
        let value = window.localStorage.getItem(this.key);
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
}

class Store {
    constructor() {
        this.token = new StoredItem({
            key: 'ghbs.token',
            obfuscate: true,
        });
    }
}

export default Store;

