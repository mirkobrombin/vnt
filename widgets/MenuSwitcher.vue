<template>
    <div class="MenuSwitcher">
        <div class="MenuSwitcher-items">
            <div class="MenuSwitcher-items-item" v-for="item in items" :key="item.label"
                @click="changePage(item.pageId)" :class="{ 'MenuSwitcher-items-item--active': item.isActive }">
                <span class="MenuSwitcher-items-item-label">{{ item.label }}</span>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

interface MenuItem {
    label: string;
    pageId: number;
    isActive: boolean;
}

export default defineComponent({
    name: "MenuSwitcher",
    props: {
        context: {
            type: String,
            required: true,
        },
        items: {
            type: Array as () => MenuItem[],
            required: true,
            default: () => [],
        },
        onChange: {
            type: Function,
            required: false,
        },
    },
    mounted() {
        console.debug('MenuSwitcher mounted');
        this.items[0].isActive = true;
    },
    methods: {
        changePage(pageId: number) {
            this.items.forEach((item) => {
                item.isActive = item.pageId === pageId;
            });

            if (this.onChange) {
                this.onChange();
            }

            this.$eventBus.emit(`${this.context}-changePage`, pageId);
        },
    },
});
</script>

<style scoped>
.MenuSwitcher {
    padding: 2px;
}

.MenuSwitcher-items {
    display: flex;
    flex-direction: column;
    min-width: 160px;
}

.MenuSwitcher-items-item {
    align-items: center;
    display: flex;
    gap: 8px;
    padding: 10px 16px;
    transition: background-color 0.2s;
    background-color: transparent;
    color: var(--text-primary);
    border-radius: 8px;
    text-align: left;
}

.MenuSwitcher-items-item:hover {
    background-color: var(--background-elevated-2-hover);
}

.MenuSwitcher-items-item:active {
    background-color: var(--background-top);
}

.MenuSwitcher-items-item.MenuSwitcher-items-item--active {
    background-color: var(--background-top);
}

.MenuSwitcher-items-item-label {
    flex-grow: 1;
}
</style>