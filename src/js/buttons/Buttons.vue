<template>

    <span>
        <token-button v-if="!this.store.token"></token-button>
        <add-badge-button v-if="this.store.token"></add-badge-button>
    </span>

</template>

<script>
import Vue from 'vue';

import './TokenButton.vue';
import './AddBadgeButton.vue';

export default Vue.component('conf-buttons', {

});

</script>

