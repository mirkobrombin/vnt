<template>
    <div class="HBox" :style="{ margin: margin + 'px', gap: spacing + 'px', alignItems: _align }">
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
        margin: {
            type: Number,
            default: 0,
        },
        align: {
            type: String,
            default: 'center',
            validator: (value: string) => ['center', 'start', 'end', 'fill'].includes(value),
        },
    },
    computed: {
        _align(): string {
            switch (this.align) {
                case 'fill':
                    return 'stretch';
                case 'start':
                case 'end':
                    return 'flex-' + this.align;
                case 'center':
                    return 'center';
                default:
                    return 'center';
            }
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