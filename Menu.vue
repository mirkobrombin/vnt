<template>
    <div class="Menu">
        <div class="Menu-items">
            <div v-for="(item, index) in items" :key="index" class="Menu-item" @click="item.action">
                <span class="Menu-item-label">{{ item.label }}</span>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

interface MenuItem {
    label: string;
    action: () => void;
}

export default defineComponent({
    name: "Menu",
    props: {
        items: {
            type: Array as () => MenuItem[],
            required: true,
            default: () => [],
        },
    },
    mounted() {
        console.log('Menu mounted');
    },
});
</script>

<style scoped>
.Menu {
    padding: 2px;
}

.Menu-items {
    display: flex;
    flex-direction: column;
    min-width: 160px;
}

.Menu-item {
    align-items: center;
    display: flex;
    gap: 8px;
    padding: 10px 16px;
    transition: background-color 0.2s;
    background-color: transparent;
    color: var(--text-primary);
    border-radius: 8px;
}

.Menu-item:hover {
    background-color: var(--background-elevated-2-hover);
}

.Menu-item:active {
    background-color: var(--background-top);
}

.Menu-item-label {
    flex-grow: 1;
}
</style>
