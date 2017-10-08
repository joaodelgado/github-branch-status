<template>

    <span>
        <token-button v-if="true || !this.store.token"></token-button>
        <add-badge-button v-if="this.store.token"></add-badge-button>
        <remove-badge-button v-if="hasChecks"></remove-badge-button>
    </span>

</template>

<script>
import Vue from 'vue';

import './TokenButton.vue';
import './AddBadgeButton.vue';
import './RemoveBadgeButton.vue';
import { hasValue, getNested } from '../Utils';

export default Vue.component('conf-buttons', {

    computed: {
        hasChecks() {
            const checks = getNested(
                this.store.config,
                this.github.owner(),
                this.github.repo()
            );
            return hasValue(checks) && checks.length > 0;
        },
    },

});

</script>

