/* eslint-disable import/first */

import 'arrive';
import Vue from 'vue';

import Github from './Github';

const github = new Github();

//
// Configure global Vue mixins and plugins
//

import Store from './Store';

Vue.use(Store);
Vue.mixin({
    data() {
        return {
            github,
        };
    },
});

import ConfButtons from './buttons/Buttons.vue';
import { EventBus } from './EventBus';


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
