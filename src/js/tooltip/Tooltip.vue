<template>

<div class="float-left">

    <span @click="open">
        <slot name="clickable"></slot>
    </span>

    <div class="select-menu-modal-holder dropdown-menu-content"
         style="display: block"
         v-if="isOpen">
        <div class="dropdown-menu dropdown-menu-se"
            style="top: 6px"
            :style="{ width: width + 'px' }">
            <slot></slot>
        </div>
    </div>

    <div class="ghbs-backdrop" v-if="isOpen" @click="close"></div>

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
            isOpen: false,
        };
    },

    methods: {

        open() {
            this.isOpen = true;
            this.$emit('tooltip-open');
        },

        close() {
            this.isOpen = false;
            this.$emit('tooltip-closed');
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
