function getFromStorage(key, obfuscate) {
    let value = window.localStorage.getItem(key);
    if (value === undefined || value === null) {
        return null;
    }

    if (obfuscate) {
        value = atob(value);
    }

    return JSON.parse(value);
}

function generateSetter(key, obfuscate) {
    return (newValue) => {
        let value = newValue;
        if (value !== undefined && value !== null) {
            value = JSON.stringify(value);
            if (obfuscate) {
                value = btoa(value);
            }
        } else {
            value = null;
        }

        window.localStorage.setItem(key, value);
        return value;
    };
}

export default {
    install(Vue) {
        const data = {
            store: {
                token: getFromStorage('ghbs.token', true),
                config: getFromStorage('ghbs.config', false),
            },
        };

        const watchers = {
            'store.token': {
                deep: true,
                handler: generateSetter('ghbs.token', true),
            },
            'store.config': {
                deep: true,
                handler: generateSetter('ghbs.config', false),
            },
        };

        Vue.mixin({
            data() {
                return data;
            },
            watch: watchers,
        });
    },
};
