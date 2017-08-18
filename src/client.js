const github = new GitHub();
const store = new Store();

const listener = () => {
    if (!github.inRepoHome()) {
        return;
    }

    const confButtons = new ConfButtonBox(github.owner(), github.repo());

    confButtons.render();
    if (confButtons.isEnabled()) {
        const badgeBox = new BadgeBox(store.getConfig(github.owner(), github.repo()));
        github.fileNavigator().after(badgeBox);
    }
};

document.arrive(github.readmeSelector(), listener);
listener();
