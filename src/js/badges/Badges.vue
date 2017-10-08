<template>

<div class="mb-2">
    <badge v-for="check in checks" :key="check" :branch="check"></badge>
</div>

</template>

<script>

import Vue from 'vue';

import './Badge.vue';
import { getNested } from '../Utils';

export default Vue.component('badges', {

    computed: {
        checks() {
            return getNested(
                this.store.config,
                this.github.owner(),
                this.github.repo()
            ) || [];
        },
    },

});

</script>
