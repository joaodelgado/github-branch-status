import 'arrive';

import Vue from 'vue';

import GitHub from './Github';
import TokenButton from './buttons/TokenButton.vue';

import { EventBus } from './EventBus';

const github = new GitHub();

function reset() {
    EventBus.$off();

    const existingButtons = document.getElementById('ghbs-button');
    if (existingButtons) {
        existingButtons.remove();
    }
}

function initButtons() {
    const base = document.querySelector('.new-pull-request-btn');
    const wrapper = document.createElement('div');

    wrapper.id = 'ghbs-button';
    base.after(wrapper);

    /* eslint-disable no-new */
    new Vue({
        el: '#ghbs-button',
        render: c => c(TokenButton),
    });
    /* eslint-enable no-new */
}

const listener = () => {
    if (!github.inRepoHome()) {
        return;
    }

    reset();
    initButtons();
};

document.arrive(github.readmeSelector(), listener);
listener();
