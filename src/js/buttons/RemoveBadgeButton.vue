<template>

<tooltip :width="300">
    <button slot="clickable" class="btn btn-sm ml-2">
        <span>Remove check</span>
    </button>

    <div class="m-2">
        <span>Please insert the branch you want to remove:</span>
        <div class="input-group">
            <input type="text"
                class="form-control input-monospace input-sm"
                v-model="branch"
                @keyup.enter="submit">
            </input>
            <div class="input-group-button">
                <button class="btn btn-sm btn-danger" @click="submit">
                    <span>Submit</span>
                </button>
            </div>
        </div>
    </div>
</tooltip>

</template>

<script>
import Vue from 'vue';

import '../tooltip/Tooltip.vue';
import { EventBus, GlobalEvents } from '../EventBus';

export default Vue.component('remove-badge-button', {
    data() {
        return {
            branch: undefined,
        };
    },

    methods: {
        submit() {
            EventBus.$emit(GlobalEvents.CLOSE_TOOLTIP);

            if (!this.branch) {
                return;
            }

            const config = this.store.config || {};
            const owner = this.github.owner();
            const repo = this.github.repo();

            if (!config[owner] || !config[owner][repo]) {
                return;
            }

            const index = config[owner][repo].indexOf(this.branch);
            if (index > -1) {
                config[owner][repo].splice(index, 1);
                this.store.config = config;
            }

            // Clear submitted branch
            this.branch = undefined;
        },
    },

});

</script>

