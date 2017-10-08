<template>
<span class="mr-3">

<strong>{{ branch }}</strong>
<status-icon :status="status"></status-icon>

</span>
</template>

<script>

import Vue from 'vue';

import './StatusIcon.vue';

export default Vue.component('badge', {

    props: {
        branch: String,
    },

    data() {
        return {
            status: 'loading',
        };
    },

});

</script>

