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
import Badges from './badges/Badges.vue';
import { EventBus } from './EventBus';


const CONF_BUTTONS_ID = 'ghbs-conf-buttons';
const BADGES_ID = 'ghbs-badges';

function reset() {
    EventBus.$off();

    const existingButtons = document.getElementById(CONF_BUTTONS_ID);
    if (existingButtons) {
        existingButtons.remove();
    }
}

function initButtons() {
    const buttonsBase = document.querySelector('.new-pull-request-btn');
    const badgesBase = document.querySelector('.file-navigation');

    const buttonsWrapper = document.createElement('div');
    buttonsWrapper.id = CONF_BUTTONS_ID;

    const badgesWrapper = document.createElement('div');
    badgesWrapper.id = BADGES_ID;

    buttonsBase.after(buttonsWrapper);
    badgesBase.after(badgesWrapper);

    /* eslint-disable no-new */
    new Vue({
        el: `#${CONF_BUTTONS_ID}`,
        render: c => c(ConfButtons),
    });
    new Vue({
        el: `#${BADGES_ID}`,
        render: c => c(Badges),
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
