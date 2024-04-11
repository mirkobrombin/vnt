<template>
    <div class="HBox"
        :style="{ margin: margin + 'px', gap: spacing + 'px', alignItems: stretch ? 'stretch' : 'center' }">
        <slot></slot>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name: "HBox",
    props: {
        spacing: {
            type: Number,
            default: 0,
        },
        stretch: {
            type: Boolean,
            default: false,
        },
        margin: {
            type: Number,
            default: 0,
        },
    },
    mounted() {
        console.debug('HBox mounted');
    },
});
</script>

<style scoped>
.HBox {
    display: flex;
    flex-direction: row;
    gap: 8px;
}
</style>