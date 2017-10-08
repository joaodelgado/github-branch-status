<template>
<span>


<strong>{{ branch }}</strong>
<status-icon :status="status" :url="url"></status-icon>

<span class="hidden tooltipped tooltipped-s mr-2 text-gray-light clickable"
      @click="remove"
      aria-label="Remove check">
    <icon-cross></icon-cross>
</span>


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
        remove() {
            const owner = this.github.owner();
            const repo = this.github.repo();
            const index = this.store.config[owner][repo].indexOf(this.branch);
            if (index > -1) {
                this.store.config[owner][repo].splice(index, 1);
            }
        },

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

<style>

span > .hidden {
    visibility: hidden;
    opacity: 0;
    transition: visibility 0s linear 0.5s, opacity 0.5s ease;
}

span:hover > .hidden {
    visibility: visible;
    opacity: 1;
    transition-delay: 0s;
}

.clickable {
    cursor: pointer;
}

</style>
