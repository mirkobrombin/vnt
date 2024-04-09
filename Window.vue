<template>
    <div class="Window" ref="window" :class="{ 'Window--maximized': maximized, 'Window--resizing': resizing }">
        <div class="Window-top">
            <slot name="top"></slot>
        </div>
        <div class="Window-content">
            <slot name="content"></slot>
        </div>
    </div>
</template>

<script lang="ts">
import { Window } from '@tauri-apps/api/window'
import { defineComponent } from "vue";

export default defineComponent({
    name: "Window",
    data() {
        return {
            maximized: false,
            resizing: false,
        };
    },
    async mounted() {
        console.log("Window mounted");

        if (this.$engine.isTauri()) {
            Window.getCurrent().listen('tauri://resize', () => {
                const _window = this.$refs.window as HTMLElement;
                const screenHeight = screen.availHeight - 20;
                if (_window) {
                    Window.getCurrent().isMaximized().then((maximized) => {
                        this.maximized = maximized || _window.clientHeight === screenHeight;
                    });
                }
            });

            // TODO: testing theme change detection, remove later
            await Window.getCurrent().theme().then((theme) => {
                console.log("----------> detected theme", theme);
            });
            await Window.getCurrent().listen('tauri://theme-changed', (theme) => {
                console.log("----------> theme changed", theme);
            });
        }

        window.addEventListener('resize', () => {
            this.resizing = true;

            let windowSizes = [];
            const interval = setInterval(() => {
                const _window = this.$refs.window as HTMLElement;
                if (_window) {
                    windowSizes.push(_window.clientHeight);
                }
            }, 100);

            setTimeout(() => {
                clearInterval(interval);
                this.resizing = false;
            }, 600);

            if (this.$engine.isTauri()) {
                Window.getCurrent().isMaximized().then((maximized) => {
                    if (maximized) {
                        this.maximized = true;
                    }
                });
            }
        });
    },
});
</script>

<style scoped>
.Window {
    display: flex;
    flex-direction: column;
    height: calc(100vh - 20px);
    border-radius: 8px;
    overflow: hidden;
    background-color: var(--background-base);
    border: 1px solid var(--border-secondary);
    margin: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}

.Window--maximized {
    border-radius: 0;
    margin: 0;
    box-shadow: none;
    height: 100vh;
}

.Window-top {
    background-color: var(--background-top);
}

.Window-content {
    flex-grow: 1;
    overflow: auto;
    background-color: var(--background-elevated);
    border-top: 1px solid var(--border-primary);
    border-radius: 8px;
}
</style>