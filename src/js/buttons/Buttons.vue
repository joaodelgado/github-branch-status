<template>

    <span>

        <token-button v-if="this.tokenPassedValidation && !this.hasValidToken">
        </token-button>

        <add-badge-button v-if="this.tokenPassedValidation && this.hasValidToken">
        </add-badge-button>

    </span>

</template>

<script>
import Vue from 'vue';

import './TokenButton.vue';
import './AddBadgeButton.vue';

export default Vue.component('conf-buttons', {

    data() {
        return {
            tokenPassedValidation: false,
            hasValidToken: true,
        };
    },

    asyncComputed: {
        hasValidToken() {
            return this.github.checkAuthorization(this.store.token)
                .then(() => {
                    this.tokenPassedValidation = true;
                    return true;
                })
                .catch(() => {
                    this.tokenPassedValidation = true;
                    return false;
                });
        },
    },

});

</script>

