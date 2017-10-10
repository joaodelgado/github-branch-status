/* eslint-disable import/first */

import 'arrive';
import Vue from 'vue';
import AsyncComputed from 'vue-async-computed';

import Github from './Github';

const github = new Github();

//
// Configure global Vue mixins and plugins
//

import Store from './Store';

Vue.use(AsyncComputed);
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


const BUTTONS_ID = 'ghbs-conf-buttons';
const BADGES_ID = 'ghbs-badges';

function init() {
    EventBus.$off();

    // Create base elements
    if (!document.getElementById(BUTTONS_ID)) {
        const buttonsBase = document.querySelector('.new-pull-request-btn');
        const buttonsWrapper = document.createElement('div');
        buttonsWrapper.id = BUTTONS_ID;
        buttonsBase.after(buttonsWrapper);
    }

    if (!document.getElementById(BADGES_ID)) {
        const badgesBase = document.querySelector('.file-navigation');
        const badgesWrapper = document.createElement('div');
        badgesWrapper.id = BADGES_ID;
        badgesBase.after(badgesWrapper);
    }

    /* eslint-disable no-new */
    new Vue({
        el: `#${BUTTONS_ID}`,
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

    init();
};

document.arrive(github.readmeSelector(), listener);
listener();
