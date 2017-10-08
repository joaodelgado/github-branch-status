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
        checks() {
            const { config } = this.store;
            const owner = this.github.owner();
            const repo = this.github.repo();

            if(!config
                || !config[owner]
                || !config[owner][repo]) {
                return [];
            }

            return config[owner][repo] || [];
        },
    },

});

</script>


