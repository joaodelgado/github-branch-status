const github = new GitHub();
const store = new Store();

const listener = () => {
    if (!github.inRepoHome()) {
        return;
    }

    const confButtons = new ConfButtonBox(github.owner(), github.repo());

    confButtons.render();
    if (confButtons.isEnabled()) {
        const badgesBox = new BadgesBox({
            base: github.fileNavigator(),
            refs: store.getConfig(github.owner(), github.repo()),
        });
        badgesBox.render();
    }
};

document.arrive(github.readmeSelector(), listener);
listener();
