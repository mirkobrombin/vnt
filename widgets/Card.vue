<template>
    <div class="Card">
        <slot></slot>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name: "Card",
    mounted() {
        console.debug('Card mounted');
    },
});
</script>

<style scoped>
.Card {
    background-color: var(--background-elevated);
    border-radius: 8px;
    padding: 16px;
    box-shadow: var(--shadow-elevated-2);
    border: 1px solid var(--border-primary);
    text-align: left;
}
</style>
