import Vue from 'vue';

export function hasValue(obj) {
    return obj !== undefined && obj !== null;
}

export function getNested(obj, ...args) {
    let base = obj || {};
    args.every((arg) => {
        base = base[arg];
        return hasValue(base);
    });
    return base;
}

export function setNested(obj, ...args) {
    if (!hasValue(obj)) {
        return;
    }

    let base = obj;
    const value = args[args.length - 1];

    args.slice(0, -2).forEach((arg) => {
        if (!hasValue(base[arg])) {
            Vue.set(base, arg, {});
        }
        base = base[arg];
    });

    Vue.set(base, args[args.length - 2], value);
}
