<template>

<tooltip @tooltip-open="focus" :width="300">
    <button slot="clickable" class="btn btn-sm ml-2">
        <span>Add check</span>
    </button>

    <div class="m-2">
        <span>Please insert the branch you want to check:</span>
        <div class="input-group">
            <input type="text"
                class="form-control input-monospace input-sm"
                ref="input"
                v-model="branch"
                @keyup.enter="submit">
            </input>
            <div class="input-group-button">
                <button class="btn btn-sm btn-primary" @click="submit">
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
import { getNested, setNested } from '../Utils';


export default Vue.component('add-badge-button', {
    data() {
        return {
            branch: undefined,
        };
    },

    methods: {
        focus() {
            Vue.nextTick(() => this.$refs.input.focus());
        },

        submit() {
            EventBus.$emit(GlobalEvents.CLOSE_TOOLTIP);

            if (!this.branch) {
                return;
            }

            const currentChecks = getNested(
                this.store.config,
                this.github.owner(),
                this.github.repo()
            ) || [];

            if (currentChecks.indexOf(this.branch) === -1) {
                currentChecks.push(this.branch);
            }
            setNested(
                this.store.config,
                this.github.owner(),
                this.github.repo(),
                currentChecks
            );

            // Clear submitted branch
            this.branch = undefined;
        },
    },

});

</script>

