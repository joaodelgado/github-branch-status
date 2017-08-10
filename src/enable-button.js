class EnableButton {

    constructor(owner, repo) {
        this.store = new Store();
        this.owner = owner;
        this.repo = repo;
    }

    isEnabled() {
        const config = this.store.getConfig(this.owner, this.repo);
        return config !== undefined && config.length > 0;
    }

    render() {
        console.debug("Rendering enable button");
        const base = $('.new-pull-request-btn');

        $('.ghbs-config-buttons-wrapper').remove();
        const wrapper = $(document.createElement('div'))
            .attr('id', 'ghbs-config-wrapper');
        base.after(wrapper);

        const add = $(document.createElement('button'))
            .attr('id', 'ghbs-remove-button')
            .addClass('btn btn-sm')
            .css('margin-left', '4px')
            .text('Add check')
            .click(() => this.addCheck());
        wrapper.append(add);

        if (this.isEnabled()) {
            const remove = $(document.createElement('button'))
                .attr('id', 'ghbs-remove-button')
                .addClass('btn btn-sm')
                .css('margin-left', '4px')
                .text('Remove check')
                .click(() => this.removeCheck());

            wrapper.append(remove);
        }

    }

    addCheck() {
        const ref = prompt('What branch should be checked?');
        var currentConfig = this.store.config.get();

        currentConfig = currentConfig || {};
        currentConfig[this.owner] = currentConfig[this.owner] || {};
        currentConfig[this.owner][this.repo] = currentConfig[this.owner][this.repo] || [];

        if (currentConfig[this.owner][this.repo].indexOf(ref) === -1) {
            currentConfig[this.owner][this.repo].push(ref);
            this.store.config.set(currentConfig);
        }

        window.location.reload();
    }

    removeCheck() {
        if (!this.isEnabled()) {
            return;
        }
        const ref = prompt('What branch should be removed?');

        var currentConfig = this.store.config.get();
        var index = currentConfig[this.owner][this.repo].indexOf(ref);
        if (index > -1) {
            currentConfig[this.owner][this.repo].splice(index, 1);
        }

        this.store.config.set(currentConfig);

        window.location.reload();
    }

}

if (typeof module !== "undefined" && module.exports) {
    module.exports = ButtonBox;
}

