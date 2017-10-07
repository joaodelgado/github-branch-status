<template>

<div class="float-left">

    <span @click="open = true">
        <slot name="clickable"></slot>
    </span>

    <div class="select-menu-modal-holder dropdown-menu-content"
         :style="{ display: open ? 'block' : 'none' }">
        <div class="dropdown-menu dropdown-menu-se"
            :style="{ width: width + 'px' }">
            <slot></slot>
        </div>
    </div>

    <div class="ghbs-backdrop" v-if="open" @click="open = false"></div>

</div>

</template>

<script>
import Vue from 'vue';
import { EventBus, GlobalEvents } from '../EventBus';

export default Vue.component('tooltip', {

    created() {
        EventBus.$on(GlobalEvents.CLOSE_TOOLTIP, this.close);
    },

    props: {
        width: Number,
    },

    data() {
        return {
            open: false,
        };
    },

    methods: {
        close() {
            this.open = false;
        },
    },

    beforeDestroy() {
        EventBus.$off(GlobalEvents.CLOSE_TOOLTIP, this.close);
    },

});
</script>

<style>

.ghbs-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 20;
    display: block;
    width: 100vw;
    height: 100vh;
}

</style>
