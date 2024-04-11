<template>
    <div class="ContextArea" ref="areaElement">
        <div class="ContextArea-safeArea" @contextmenu.prevent="showMenu($event)">
            <slot name="area"></slot>
        </div>
        <div class="ContextArea-menu" ref="menuElement">
            <div class="ContextArea-menu-item" v-for="item in items" :key="item.id" @click="item.action">
                <div class="ContextArea-menu-item-icon">
                    <span class="mdi" v-if="item.icon">{{ item.icon }}</span>
                    <span class="mdi-placeholder" v-else></span>
                </div>
                <div class="ContextArea-menu-item-text">{{ item.text }}</div>
                <div class="ContextArea-menu-item-shortcut">{{ item.shortcut }}</div>
                <div class="ContextArea-menu-item-submenu" v-if="item.submenu.length > 0">
                    <span class="mdi">chevron-right</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name: "ContextArea",
    data() {
        return {
            items: [
                { id: 1, text: "Item 1", shortcut: "Ctrl+1", icon: "favorite_border", action: () => console.log("Item 1"), submenu: [] },
                { id: 2, text: "Item 2", shortcut: "Ctrl+2", icon: "folder", action: () => console.log("Item 2"), submenu: [] },
                { id: 3, text: "Item 3", shortcut: "Ctrl+3", icon: "star_rate", action: () => console.log("Item 3"), submenu: [] },
            ],
        };
    },
    mounted() {
        console.debug('ContextArea mounted');
        document.addEventListener('click', this.handleClickOutside);
    },
    beforeUnmount() {
        document.removeEventListener('click', this.handleClickOutside);
    },
    methods: {
        showMenu(event: MouseEvent) {
            console.log("showMenu", event);
            event.preventDefault();
            const menu = this.$refs.menuElement as HTMLElement;
            if (menu) {
                const clickX = event.clientX;
                const clickY = event.clientY;
                menu.style.left = `${clickX}px`;
                menu.style.top = `${clickY}px`;
                menu.style.display = "flex";
                event.stopPropagation();
            }
        },
        handleClickOutside(event: MouseEvent) {
            const menu = this.$refs.menuElement as HTMLElement;
            if (menu && !menu.contains(event.target as Node)) {
                menu.style.display = 'none';
            }
        },
    },
});
</script>

<style scoped>
.ContextArea {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    height: 100%;
}

.ContextArea-safeArea {
    flex-grow: 1;
    overflow: auto;
    position: relative;
}

.ContextArea-menu {
    position: fixed;
    top: 100%;
    left: 0;
    display: none;
    flex-direction: column;
    background-color: var(--background-base);
    border: 1px solid var(--border-primary);
    border-radius: 8px;
    box-shadow: var(--shadow-elevated);
    font-size: 16px;
}

.ContextArea-menu-item {
    display: flex;
    align-items: center;
    padding: 5px 10px;
    transition: background-color 0.2s;
    color: var(--text-secondary);
    gap: 9px;
}

.ContextArea-menu-item:hover {
    background-color: var(--background-elevated-2);
}

.ContextArea-menu-item:active {
    background-color: var(--background-top);
}

.ContextArea-menu-item-icon {
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.ContextArea-menu-item-icon .mdi,
.ContextArea-menu-item-submenu .mdi,
.ContextArea-menu-item-submenu .mdi-placeholder {
    font-size: 18px;
}

.ContextArea-menu-item-text {
    flex-grow: 1;
}

.ContextArea-menu-item-shortcut {
    margin-left: auto;
    font-size: 14px;
    background-color: var(--background-elevated);
    padding: 4px 6px;
    border-radius: 8px;
    font-weight: 900;
}

.ContextArea-menu-item-submenu {
    margin-left: auto;
}

.ContextArea-menu-item-submenu:hover {
    background-color: transparent;
}

.ContextArea-menu-item-submenu:hover .mdi {
    color: var(--text-primary);
}

.ContextArea-menu-item-submenu:hover .mdi-placeholder {
    color: var(--text-primary);
}

.ContextArea-menu-item-submenu .mdi-placeholder {
    color: var(--text-secondary);
}
</style>
