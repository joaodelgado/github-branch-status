class Badge {
    constructor(ref, wrapper) {
        this.store = new Store();
        this.github = new GitHub();
        this.ref = ref || 'development';
        this.status = 'Loading';
        this.wrapper = wrapper;
        this.getStatus();
    }

    getStatus() {
        console.debug("Loading badge - " + this.ref);
        $.ajax({
            type: 'GET',
            url: Config.GITHUB_API_BASE + 'repos/' + this.github.owner() + '/' + this.github.repo() + '/commits/' + this.ref + '/status',
            headers: {
                "Authorization": "token " + this.store.getToken()
            },
            error: () => {
                this.status = 'error';
                this.render();
            },
            context: this,
            success: data => {
                this.status = data.state;
                this.render();
            }
        });
    }

    render() {
        console.debug("Rendering badge - " + this.ref);
        $('#ghbs-' + this.ref).remove();
        this.wrapper.append($(document.createElement('div'))
            .attr('id', 'ghbs-' + this.ref)
            .text(this.ref + ' - ' + this.status)
        );
    }

}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = Badge;
}
