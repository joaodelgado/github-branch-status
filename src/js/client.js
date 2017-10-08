import 'arrive';

import Vue from 'vue';

/* eslint-disable import/first */

// This must be imported before creating any component
import Store from './Store';

Vue.use(Store);

import GitHub from './Github';
import ConfButtons from './buttons/Buttons.vue';

import { EventBus } from './EventBus';

/* eslint-enable import/first */


const github = new GitHub();

const CONF_BUTTONS_ID = 'ghbs-conf-buttons';

function reset() {
    EventBus.$off();

    const existingButtons = document.getElementById(CONF_BUTTONS_ID);
    if (existingButtons) {
        existingButtons.remove();
    }
}

function initButtons() {
    const base = document.querySelector('.new-pull-request-btn');
    const wrapper = document.createElement('div');

    wrapper.id = CONF_BUTTONS_ID;
    base.after(wrapper);

    /* eslint-disable no-new */
    new Vue({
        el: `#${CONF_BUTTONS_ID}`,
        render: c => c(ConfButtons),
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
