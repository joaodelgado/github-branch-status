<template>

<tooltip @tooltip-open="focus" :width="300">
    <button slot="clickable"
        class="btn btn-sm ml-2 tooltipped tooltipped-s"
        aria-label="Configure Github Branch Status">
        <icon-gear></icon-gear>
    </button>

    <div class="m-2">
        <span>Please insert your access token:</span>
        <div class="input-group">
            <input type="text"
                class="form-control input-monospace input-sm"
                ref="input"
                v-model="token"
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

import '../icons/Gear.vue';
import '../tooltip/Tooltip.vue';
import { EventBus, GlobalEvents } from '../EventBus';

export default Vue.component('token-button', {

    data() {
        return {
            token: undefined,
        };
    },

    methods: {
        focus() {
            Vue.nextTick(() => this.$refs.input.focus());
        },

        submit() {
            this.store.token = this.token;
            this.token = undefined;

            EventBus.$emit(GlobalEvents.CLOSE_TOOLTIP);
            this.$emit('token-submitted');
        },
    },

});

</script>
