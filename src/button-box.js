class ButtonBox {

    constructor({ refs, base }) {
        this.base = base;
        this.refs = refs || [];
    }

    render() {
        console.debug("Rendering button box");

        $('#ghbs-wrapper').remove();
        const wrapper = $(document.createElement('div'))
            .attr('id', 'ghbs-wrapper')
            .css('margin-bottom', '10px');
        this.base.after(wrapper);

        for (const ref of this.refs) {
            const branchWrapper = $(document.createElement('span'))
                .attr('id', 'ghbs-wrapper-' + ref)
                .css('margin-right', '4px');
            wrapper.append(branchWrapper);
            new Badge(ref, branchWrapper).render();
        }
    }

}

if (typeof module !== "undefined" && module.exports) {
    module.exports = ButtonBox;
}
