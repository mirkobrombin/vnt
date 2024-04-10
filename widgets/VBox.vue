<template>
    <div class="VBox"
        :style="{ margin: margin + 'px', gap: spacing + 'px', alignItems: stretch ? 'stretch' : 'center' }">
        <slot></slot>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name: "VBox",
    props: {
        margin: {
            type: Number,
            default: 0,
        },
        spacing: {
            type: Number,
            default: 0,
        },
        stretch: {
            type: Boolean,
            default: false,
        },
    },
    mounted() {
        console.log('VBox mounted');
    },
});
</script>

<style scoped>
.VBox {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
}
</style>