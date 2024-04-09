<template>
    <div class="Dummy">
        <p>Hi, I'm a dummy component {{ random }}</p>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name: "Dummy",
    data() {
        return {
            random: Math.random(),
        };
    },
});
</script>

<style scoped>
.Dummy {
    font-size: 14px;
    color: var(--text-color);
    padding: 20px;
    background-color: var(--background-base);
    border-radius: 8px;
}

.Dummy p {
    margin: 0;
}
</style>