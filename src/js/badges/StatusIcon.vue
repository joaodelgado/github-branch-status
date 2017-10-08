<template>

<span class="commit-indicator">
    <div class="commit-build-statuses">

        <template v-if="status === 'success'">
            <a class="text-green tooltipped tooltipped-s"
                aria-label="Success: This commit looks good"
                :href="url">
                <icon-check></icon-check>
            </a>
        </template>

        <template v-else-if="status === 'pending'">
            <a class="bg-pending tooltipped tooltipped-s"
                aria-label="Pending: This commit is being built"
                :href="url">
                <icon-circle></icon-circle>
            </a>
        </template>

        <template v-else-if="status === 'failure'">
            <a class="text-red tooltipped tooltipped-s"
                aria-label="Failure: This commit cannot be built"
                :href="url">
                <icon-cross></icon-cross>
            </a>
        </template>

        <template v-else-if="status === 'loading'">
            Loading
        </template>

        <template v-else>
            <strong class="text-red">Error</strong>
        </template>

    </div>
</span>

</template>

<script>

import Vue from 'vue';

import '../icons/Check.vue';
import '../icons/Circle.vue';
import '../icons/Cross.vue';

export default Vue.component('status-icon', {

    props: {
        status: String,
        url: String,
    },

});

</script>
