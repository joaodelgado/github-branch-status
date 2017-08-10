class Store {
    constructor() {
        this.token = new StoredItem({
            key: 'ghbs.token',
            initial: () => prompt("Github token"),
            obfuscate: true
        });
        this.config = new StoredItem({
            key: 'ghbs.config'
        });
    }

    getConfig(...paths) {
        var base = this.config.get();
        for (const path of paths) {
            if (base === undefined || base === null) {
                return;
            }
            base = base[path];
        }

        return base;
    }

}

if (typeof module !== "undefined" && module.exports) {
    module.exports = Store;
}
