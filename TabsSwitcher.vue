<template>
    <div class="TabsSwitcher">
        <div class="TabsSwitcher-add" v-if="allowNewTabs">
            <button class="TabsSwitcher-add-button" @click="createTab">
                <span class="mdi">add</span>
            </button>
        </div>
        <div class="TabsSwitcher-items" @wheel.passive="handleWheel" ref="tabsSwitcherItems">
            <div class="TabsSwitcher-items-item" v-for="(tab, index) in orderedTabs" :key="tab.id"
                :class="{ 'TabsSwitcher-items-item--active': activeTab === tab.id, 'TabsSwitcher-items-item--hovered': hoveredIndex === index }"
                draggable="true" @dragstart="dragStart(index, $event)" @dragover="dragOver(index, $event)"
                @drop="drop(index, $event)" :ref="'tabItem-' + tab.id">
                <div class="TabsSwitcher-items-item-title" :title="tab.title" @click="setActiveTab(tab.id)"
                    @click.middle="closeTab(tab.id)">
                    {{ tab.title.length > 20 ? tab.title.slice(0, 20) + "…" : tab.title }}
                </div>
                <div class="TabsSwitcher-items-item-actions">
                    <button class="TabsSwitcher-items-item-actions-item" title="Close tab" @click="closeTab(tab.id)">
                        <span class="mdi">close</span>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

interface Tab {
    id: number;
    order: number;
    title: string;
}

export default defineComponent({
    name: "TabsSwitcher",
    props: {
        name: {
            type: String,
            required: true,
        },
        allowNewTabs: {
            type: Boolean,
            required: false,
            default: false,
        },
    },
    data() {
        return {
            tabs: [] as Tab[],
            activeTab: 1,
            draggingIndex: null as null | number,
            hoveredIndex: null as null | number,
        };
    },
    mounted() {
        console.log("TabsSwitcher mounted");
    },
    computed: {
        orderedTabs() {
            return [...this.tabs].sort((a, b) => a.order - b.order);
        }
    },
    methods: {
        dragStart(index: number, event: DragEvent) {
            console.log("dragStart", index);
            this.draggingIndex = index;
            this.hoveredIndex = null;
            if (event.dataTransfer) {
                event.dataTransfer.setData("text/plain", index.toString());
            }
        },
        dragOver(index: number, event: DragEvent) {
            event.preventDefault();
            if (this.hoveredIndex !== index) {
                this.hoveredIndex = index;
            }
        },
        drop(targetIndex: number, event: DragEvent) {
            event.preventDefault();
            const itemToMove = this.orderedTabs[this.draggingIndex as number];
            const targetItem = this.orderedTabs[targetIndex];
            const movingItemOrder = itemToMove.order;
            itemToMove.order = targetItem.order;
            targetItem.order = movingItemOrder;
            this.draggingIndex = null;
            this.hoveredIndex = null;
        },
        handleWheel(event: WheelEvent) {
            const tabsSwitcherItems = event.currentTarget as HTMLElement;
            tabsSwitcherItems.scrollLeft += event.deltaY;
        },
        closeTab(tabId: number) {
            const wasLastTab = this.tabs[this.tabs.length - 1].id === tabId;
            this.tabs = this.tabs.filter((tab) => tab.id !== tabId);

            if (this.activeTab === tabId) {
                this.activeTab = this.tabs.length > 0 ? this.tabs[0].id : -1;
            }

            if (wasLastTab && this.tabs.length > 0) {
                this.$nextTick(() => {
                    const lastTabId = this.tabs[this.tabs.length - 1].id;
                    const lastTabRef = this.$refs[`tabItem-${lastTabId}`];
                    if (lastTabRef && (lastTabRef as HTMLElement[])[0]) {
                        // @ts-ignore
                        lastTabRef[0].scrollIntoView({ behavior: "smooth", block: "nearest", inline: "end" });
                    }
                });
                this.activeTab = this.tabs[this.tabs.length - 1].id;
            }

            this.$eventBus.emit(`${this.name}-closeTab`, tabId);
        },
        createTab() {
            const newTabId = Math.max(...this.tabs.map(tab => tab.id), 0) + 1;
            const newTab = {
                id: newTabId,
                order: this.tabs.length + 1,
                title: `Tab ${newTabId}`,
            };
            this.tabs.push(newTab);
            this.activeTab = newTab.id;

            this.$nextTick(() => {
                const lastTabRef = this.$refs[`tabItem-${newTab.id}`];
                if (lastTabRef && (lastTabRef as HTMLElement[])[0]) {
                    // @ts-ignore TODO: Fix this
                    lastTabRef[0].scrollIntoView({ behavior: "smooth", block: "nearest", inline: "end" });
                }
            });

            console.log("emit", `${this.name}-createTab`, newTab.id);
            this.$eventBus.emit(`${this.name}-createTab`, newTab.id);
        },
        setActiveTab(tabId: number) {
            this.activeTab = tabId;
            this.$eventBus.emit(`${this.name}-setActiveTab`, tabId);
        },
    },
});
</script>


<style scoped>
.TabsSwitcher-items::-webkit-scrollbar {
    display: none;
}

.TabsSwitcher {
    display: inline-flex;
    flex-wrap: nowrap;
    gap: 5px;
}

.TabsSwitcher-items {
    display: inline-flex;
    flex-wrap: nowrap;
    gap: 5px;
    margin: 5px;
    overflow-x: auto;
    max-width: calc(100vw - 250px);
}

.TabsSwitcher-items-item {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 0 12px;
    border-radius: 8px;
    cursor: default;
    white-space: nowrap;
    background-color: transparent;
    transition: background-color 0.2s;
    color: var(--text-primary);
}

.TabsSwitcher-items-item--hovered {
    background-color: var(--background-elevated-2);
}

.TabsSwitcher-items-item-title {
    flex-grow: 1;
    padding: 10px 0 10px 10px;
}

.TabsSwitcher-items-item:not(:last-child)::after {
    content: "";
    display: block;
    width: 1px;
    height: 100%;
    background-color: var(--border-primary);
    opacity: 1;
    transition: opacity 0.2s;
}

.TabsSwitcher-items-item.TabsSwitcher-items-item--active::after {
    opacity: 0;
}

.TabsSwitcher-items-item-actions {
    display: flex;
    gap: 5px;
    overflow: hidden;
    position: relative;
    opacity: 0;
    transition: opacity 0.2s;
    pointer-events: none;
}

.TabsSwitcher-items-item-actions-item {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 15px;
    height: 15px;
    border-radius: 50%;
    color: var(--text-primary);
    border: 0;
    background-color: transparent;
    border-radius: 100%;
    padding: 5px;
}

.TabsSwitcher-items-item-actions-item:hover {
    background-color: var(--background-elevated-2-hover);
}

.TabsSwitcher-items-item-actions-item span.mdi {
    font-size: 15px;
}

.TabsSwitcher-items-item.TabsSwitcher-items-item--active {
    background-color: var(--background-top);
}

.TabsSwitcher-items-item:hover {
    background-color: var(--background-elevated-2-hover);
}

.TabsSwitcher-items-item:active {
    background-color: var(--background-top);
}

.TabsSwitcher-items-item.TabsSwitcher-items-item--active .TabsSwitcher-items-item-actions,
.TabsSwitcher-items-item:hover .TabsSwitcher-items-item-actions {
    opacity: 1;
    pointer-events: auto;
}

.TabsSwitcher-items-item:not(:last-child):not(.TabsSwitcher-items-item--active):hover::after {
    opacity: 0;
}

.TabsSwitcher-add {
    display: flex;
    align-items: center;
    gap: 5px;
    padding: 5px;
}

.TabsSwitcher-add-button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;
    border: 0;
    border-radius: 50%;
    background-color: transparent;
    color: var(--text-primary);
}

.TabsSwitcher-add-button:hover {
    background-color: var(--background-elevated-2-hover);
}

.TabsSwitcher-add-button:active {
    background-color: var(--background-top);
}

.TabsSwitcher-add-button span.mdi {
    font-size: 20px;
}
</style>