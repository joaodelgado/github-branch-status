class Store {
    constructor() {
        this.token = new StoredItem({
            key: 'ghbs.token',
            initial: () => prompt("Github token"),
            obfuscate: true
        });
    }

    getToken() {
        return this.token.get();
    }

}

if (typeof module !== "undefined" && module.exports) {
    module.exports = Store;
}
