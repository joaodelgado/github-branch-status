<template>

<span class="commit-indicator">
    <div class="commit-build-statuses">

        <span v-if="status === 'success'">
            <a class="text-green tooltipped tooltipped-s"
                aria-label="Success: This commit looks good">
                <svg class="octicon octicon-check"
                    height="16" width="12"
                    version="1.1" viewBox="0 0 12 16">
                    <path fill-rule="evenodd"
                        d="M12 5l-8 8-4-4 1.5-1.5L4 10l6.5-6.5z">
                    </path>
                </svg>
            </a>
        </span>

        <span v-if="status === 'pending'">
            <a class="bg-pending tooltipped tooltipped-s"
                aria-label="Pending: This commit is being built">
                <svg class="octicon octicon-primitive-dot"
                    height="16" width="8"
                    version="1.1" viewBox="0 0 8 16">
                    <path fill-rule="evenodd"
                        d="M0 8c0-2.2 1.8-4 4-4s4 1.8 4 4-1.8 4-4 4-4-1.8-4-4z">
                    </path>
                </svg>
            </a>
        </span>

        <span v-if="status === 'failure'">
            <a class="text-red tooltipped tooltipped-s"
                aria-label="Failure: This commit cannot be built">
                <svg class="octicon octicon-x"
                    height="16" width="12"
                    version="1.1" viewBox="0 0 12 16">
                    <path fill-rule="evenodd"
                        d="M7.48 8l3.75 3.75-1.48 1.48L6 9.48l-3.75
                           3.75-1.48-1.48L4.52 8 .77 4.25l1.48-1.48L6
                           6.52l3.75-3.75 1.48 1.48z">
                    </path>
                </svg>
            </a>
        </span>

        <span v-else-if="status === 'loading'">
            Loading
        </span>

        <span v-else>
            Error
        </span>

    </div>
</span>

</template>

<script>

import Vue from 'vue';

export default Vue.component('status-icon', {

    props: {
        status: String,
    },

});

</script>
