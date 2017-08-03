class ButtonBox {

    render() {
        console.debug("Rendering button box");
        const readme = $('#readme article');

        if (!readme.length) {
            console.error("Unable to find readme div");
            return;
        }

        const wrapper = $(document.createElement('div'));
        readme.prepend(wrapper);

        new Badge("master", wrapper).render();
        new Badge("development", wrapper).render();
    }

}

if (typeof module !== "undefined" && module.exports) {
    module.exports = ButtonBox;
}
