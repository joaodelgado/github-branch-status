class BadgesBox {
    constructor({ refs, base }) {
        this.base = base;
        this.refs = refs || [];
    }

    render() {
        $('#ghbs-wrapper').remove();
        const wrapper = $(document.createElement('div'))
            .attr('id', 'ghbs-wrapper')
            .css('margin-bottom', '10px');
        this.base.after(wrapper);

        this.refs.forEach(ref => wrapper.append(new Badge(ref)));
    }
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = BadgesBox;
}
