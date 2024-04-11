<template>
    <div class="Dialog" :class="classes">
        <div class="Dialog-content">
            <div class="Dialog-content-head">
                <h2 class="Dialog-head-title">{{ title }}</h2>
                <p class="Dialog-head-message" v-for="(message, index) in messages" :key="index">{{ message }}</p>
                <slot></slot>
            </div>
            <div class="Dialog-actions">
                <Button v-if="cancel || !confirm" :label="cancelText" @click="cancel as () => void" />
                <Button v-if="confirm" :label="confirmText" @click="confirm as () => void" :type="confirmType" />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Button from "./Button.vue";

export default defineComponent({
    name: "Dialog",
    props: {
        title: {
            type: String,
            default: "",
        },
        messages: {
            type: Array,
            default: () => [],
        },
        confirm: {
            type: Function,
            default: null,
        },
        confirmText: {
            type: String,
            default: "Confirm",
        },
        confirmType: {
            type: String,
            default: "suggested",
        },
        cancel: {
            type: Function,
            default: null,
        },
        cancelText: {
            type: String,
            default: "Cancel",
        },
    },
    mounted() {
        console.debug('Dialog mounted');
    },
    computed: {
        classes() {
            const classes = [] as string[];

            if (this.confirm) {
                classes.push("Dialog--confirm");
            }
            if (this.cancel) {
                classes.push("Dialog--cancel");
            }

            return classes;
        },
    },
    components: {
        Button,
    },
});
</script>

<style scoped>
.Dialog {
    display: flex;
    flex-direction: column;
    background-color: var(--background-translucent);
    border-radius: 8px;
    overflow: hidden;
    margin: 10px 10px 8px 10px;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 100;
    -webkit-backdrop-filter: blur(10px);
    backdrop-filter: blur(10px);
    align-items: center;
    justify-content: center;
}

.Dialog-content {
    padding: 20px;
    background-color: var(--background-elevated);
    color: var(--text-primary);
    border-radius: 8px;
    min-width: 300px;
    box-shadow: var(--shadow-top);
    text-align: center;
}

.Dialog-content-head {
    margin-bottom: 20px;
}

.Dialog-head-title {
    margin: 0 0 10px;
    font-size: 24px;
    font-weight: 600;
}

.Dialog-head-message {
    margin: 0 0 10px;
    font-size: 14px;
}

.Dialog-actions {
    display: flex;
    justify-content: center;
    gap: 15px;
    margin-top: 20px;
}
</style>
