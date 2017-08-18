class Badge extends HTMLElement {
    constructor(ref) {
        super();

        // Inner state attributes
        this.store = new Store();
        this.github = new GitHub();
        this._ref = ref || 'master';
        this.status = 'loading';
        this.url = undefined;

        // Elem attributes
        this.id = `ghbs-badge-${this.ref}`;
        this.style.marginRight = '4px';
    }

    static get is() {
        return 'ghbs-badge';
    }

    static get observedAttributes() {
        return ['ref'];
    }

    get ref() {
        return this._ref;
    }

    set ref(v) {
        this._ref = v;
        this.update();
    }

    attributeChangedCallback(name, oldValue, newValue) {
        // Since this only accepts ref for the attributes,
        // there's no need to switch on the value of `name`
        this.ref = newValue;
    }

    connectedCallback() {
        this.update();
    }

    update() {
        this.status = 'loading';
        this.render();
        $.ajax({
            type: 'GET',
            url: `${Config.GITHUB_API_BASE}/repos/${this.github.owner()}/${this.github.repo()}/commits/${this.ref}/status`,
            headers: {
                Authorization: `token ${this.store.token.get()}`,
            },
            error: () => {
                this.status = 'error';
                this.render();
            },
            success: (data) => {
                this.status = data.state;
                if (data.statuses && data.statuses.length > 0) {
                    this.url = data.statuses[0].target_url;
                }
                this.render();
            },
            context: this,
        });
    }

    render() {
        this.innerHTML = `
            <strong>${this.ref}</strong>
            <span class="commit-indicator">
                <div class="commit-build-statuses">
                    ${this[this.status]()}
                </div>
            </span>
        `;
    }

    loading() {
        return '<span>Loading<span>';
    }

    error() {
        return '<span>Error<span>';
    }

    success() {
        const href = this.url ? `href="${this.url}"` : '';
        return `
            <a class="text-green tooltipped tooltipped-s" aria-label="Success: This commit looks good" ${href}>
                <svg aria-hidden="true" class="octicon octicon-check" height="16" version="1.1" viewBox="0 0 12 16" width="12">
                    <path fill-rule="evenodd" d="M12 5l-8 8-4-4 1.5-1.5L4 10l6.5-6.5z"></path>
                </svg>
            </a>`;
    }

    pending() {
        const href = this.url ? `href="${this.url}"` : '';
        return `
            <a class="bg-pending tooltipped tooltipped-s" aria-label="Pending: This commit is being built" ${href}>
                <svg aria-hidden="true" class="octicon octicon-primitive-dot" height="16" version="1.1" viewBox="0 0 8 16" width="8">
                    <path fill-rule="evenodd" d="M0 8c0-2.2 1.8-4 4-4s4 1.8 4 4-1.8 4-4 4-4-1.8-4-4z"></path>
                </svg>
            </a>`;
    }


    failure() {
        const href = this.url ? `href="${this.url}"` : '';
        return `
            <a class="text-red tooltipped tooltipped-s" aria-label="Failure: This commit cannot be built" ${href}>
                <svg aria-hidden="true" class="octicon octicon-x" height="16" version="1.1" viewBox="0 0 12 16" width="12">
                    <path fill-rule="evenodd" d="M7.48 8l3.75 3.75-1.48 1.48L6 9.48l-3.75 3.75-1.48-1.48L4.52 8 .77 4.25l1.48-1.48L6 6.52l3.75-3.75 1.48 1.48z"></path>
                </svg>
            </a>`;
    }
}

customElements.define(Badge.is, Badge);
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Badge;
}
