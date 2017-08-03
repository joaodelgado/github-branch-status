const github = new GitHub();
const buttonBox = new ButtonBox();

const listener = () => {
    if (!github.inRepoHome()) {
        return;
    }

    console.debug("In repo home");
    console.debug("Owner: " + github.owner());
    console.debug("Repo: " + github.repo());
    console.debug("Ref: " + github.ref());
    buttonBox.render();

}

listener();
