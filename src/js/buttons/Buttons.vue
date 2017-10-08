<template>

    <span>
        <token-button v-if="!this.store.token"></token-button>
        <add-badge-button v-if="this.store.token"></add-badge-button>
        <remove-badge-button v-if="hasChecks"></remove-badge-button>
    </span>

</template>

<script>
import Vue from 'vue';

import './TokenButton.vue';
import './AddBadgeButton.vue';
import './RemoveBadgeButton.vue';

export default Vue.component('conf-buttons', {

    computed: {
        hasChecks() {
            const { config } = this.store;
            const owner = this.github.owner();
            const repo = this.github.repo();

            return config
                && config[owner]
                && config[owner][repo]
                && config[owner][repo].length > 0;
        },
    },

});

</script>

