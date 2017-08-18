class BadgeBox extends HTMLElement {
    constructor(refs = []) {
        super();
        this._refs = refs;
    }

    static get is() {
        return 'ghbs-badge-box';
    }

    static get observedAttributes() {
        return ['refs'];
    }

    get refs() {
        return this._refs;
    }

    set refs(raw) {
        let v = raw;
        if (typeof v === 'string') {
            v = v.split(',');
        }
        this._refs = v || [];
        this.update();
    }

    attributeChangedCallback(name, oldValue, newValue) {
        // Since this only accepts refs for the attributes,
        // there's no need to switch on the value of `name`
        this.refs = newValue;
    }

    connectedCallback() {
        this.update();
    }

    update() {
        /* eslint-disable indent */
        // FIXME If I set the margin-bottom on `this`, it has no effect. Why?
        this.innerHTML = `
            <div style="margin-bottom: 10px">
                ${this.refs
                    .map(ref => `<ghbs-badge ref="${ref}"></ghbs-badge>`)
                    .join('\n')}
            </div>
        `;
        /* eslint-enable indent */
    }
}

customElements.define(BadgeBox.is, BadgeBox);
if (typeof module !== 'undefined' && module.exports) {
    module.exports = BadgeBox;
}
