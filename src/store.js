class Store {
    constructor() {
        this.token = new StoredItem({
            key: 'ghbs.token',
            initial: () => prompt('Github token'),
            obfuscate: true,
        });
        this.config = new StoredItem({
            key: 'ghbs.config',
        });
    }

    getConfig(...paths) {
        let base = this.config.get();
        paths.every((path) => {
            base = base[path];
            return base !== undefined && base !== null;
        });
        return base;
    }
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = Store;
}
