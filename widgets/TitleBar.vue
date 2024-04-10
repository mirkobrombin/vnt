<template>
    <div class="TitleBar">
        <div class="TitleBar-area" data-tauri-drag-region>
            <slot name="area"></slot>
        </div>
        <div class="TitleBar-controls">
            <button class="TitleBar-controls-item" @click="minimizeWindow">
                <span class="mdi">minimize</span>
            </button>
            <button class="TitleBar-controls-item" @click="maximizeWindow">
                <span class="mdi">square</span>
            </button>
            <button class="TitleBar-controls-item" @click="closeWindow">
                <span class="mdi">close</span>
            </button>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name: "TitleBar",
    mounted() {
        console.log("TitleBar mounted");
        console.log(this.$engine)
    },
    methods: {
        minimizeWindow() {
            this.$engine.minimize();
        },
        async maximizeWindow() {
            if (await this.$engine.isMaximized()) {
                this.$engine.unmaximize();
                return;
            }
            this.$engine.maximize();
        },
        closeWindow() {
            this.$engine.close();
        },
    },
});
</script>

<style scoped>
.TitleBar {
    display: flex;
    justify-content: space-between;
    align-items: stretch;
    height: 48px;
    padding: 0 10px;
    background-color: var(--background-base);
    color: var(--text-primary-alt);
    user-select: none;
}

.TitleBar-area {
    display: flex;
    align-items: center;
    flex-grow: 1;
    --wails-draggable: drag;
}

.TitleBar-controls {
    display: flex;
    align-items: center;
}

.TitleBar-controls-item {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;
    color: var(--text-primary);
    border: none;
    background-color: transparent;
    border-radius: 8px;
}

.TitleBar-controls-item .mdi {
    font-size: 16px;
}

.TitleBar-controls-item:hover {
    background-color: var(--background-elevated-2-hover);
}

.TitleBar-controls-item:active {
    background-color: var(--background-top);
}

.TitleBar-controls-item:focus {
    outline: none;
}
</style>