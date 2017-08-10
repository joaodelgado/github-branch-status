const github = new GitHub();
const store = new Store();

const listener = () => {
    if (!github.inRepoHome()) {
        return;
    }

    console.debug("In repo home");
    console.debug("Owner: " + github.owner());
    console.debug("Repo: " + github.repo());

    const enableButton = new EnableButton(github.owner(), github.repo());

    enableButton.render();
    if (enableButton.isEnabled()) {
        const buttonBox = new ButtonBox({
            base: github.fileNavigator(),
            refs: store.getConfig(github.owner(), github.repo())
        });
        buttonBox.render();
    }
}

document.arrive(github.readmeSelector(), listener);
listener();
