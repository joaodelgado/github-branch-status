<template>

<tooltip :width="300">
    <button slot="clickable" class="btn btn-sm ml-2">
        <span>Token</span>
    </button>

    <div class="m-2">
        <span>Please insert your access token:</span>
        <div class="input-group">
            <input type="text"
                class="form-control input-monospace input-sm"
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
import '../tooltip/Tooltip.vue';

import Store from '../Store';
import { EventBus, GlobalEvents } from '../EventBus';

export default {

    created() {
        this.store = new Store();
    },

    data() {
        return {
            token: undefined,
        };
    },

    methods: {
        submit() {
            this.store.token.set(this.token);
            EventBus.$emit(GlobalEvents.CLOSE_TOOLTIP);
        },
    },

};

</script>
