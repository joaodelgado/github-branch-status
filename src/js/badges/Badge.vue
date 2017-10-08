<template>
<span class="mr-3">

<strong>{{ branch }}</strong>
<status-icon :status="status" :url="url"></status-icon>

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
            url: undefined,
        };
    },

    methods: {
        fetchStatus() {
            this.status = 'loading';
            this.github.fetchStatus(this.store.token, this.branch)
                .then((response) => {
                    this.status = response.data.state;
                    if (response.data.statuses && response.data.statuses.length > 0) {
                        this.url = response.data.statuses[0].target_url;
                    }
                })
                .catch(() => {
                    this.status = 'error';
                });
        },
    },

    mounted() {
        this.fetchStatus();
    },

});

</script>

