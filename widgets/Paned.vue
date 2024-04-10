<template>
    <div class="Paned" ref="paned" :class="{ 'Paned--resizing': resizing, 'Paned--min-left-reached': minLeftReached }">
        <button class="Paned-toggle" @click="showLeftOverlay" v-if="minLeftReached">
            <span class="mdi" v-if="overlayVisible">chevron_left</span>
            <span class="mdi" v-else>chevron_right</span>
        </button>
        <transition name="slide">
            <div class="Paned-left" ref="left" :style="{ width: `${_size.left}%` }"
                v-show="!minLeftReached || overlayVisible"
                :class="{ 'Paned-left--overlay-visible': overlayVisible, 'Paned-left--overlay-hidden': minLeftReached && !overlayVisible }">
                <slot name="left"></slot>
            </div>
        </transition>

        <div class="Paned-divider" @mousedown="startResize" ref="divider"></div>
        <div class="Paned-right" ref="right" :style="{ left: `${_size.left}%` }">
            <slot name="right"></slot>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name: "Paned",
    props: {
        size: {
            type: Object,
            default: () => ({ left: 50, right: 50 }),
        },
        minLeft: {
            type: Number,
            default: 0,
        },
        leftTrigger: {
            type: Number,
            default: 0,
        },
    },
    data() {
        return {
            resizing: false,
            _size: { left: 50, right: 50 },
            minLeftReached: false,
            overlayVisible: false,
        };
    },
    mounted() {
        console.log("Paned mounted")
        this._size = this.size as { left: number; right: number };
        this.handleResize();

        if (this.leftTrigger > 0) {
            window.addEventListener('resize', this.handleResize);
        }
    },
    methods: {
        startResize() {
            this.resizing = true;
            const _paned = this.$refs.paned as HTMLElement;

            const mouseMove = (event: MouseEvent) => {
                let leftWidth = event.clientX - _paned.getBoundingClientRect().left;
                leftWidth = Math.max(leftWidth, this.minLeft);
                this._size.left = (leftWidth / _paned.clientWidth) * 100;
                this.checkMinLeft();
            };

            const mouseUp = () => {
                document.removeEventListener("mousemove", mouseMove);
                document.removeEventListener("mouseup", mouseUp);
                this.resizing = false;
            };

            document.addEventListener("mousemove", mouseMove);
            document.addEventListener("mouseup", mouseUp);
        },
        checkMinLeft() {
            this.minLeftReached = window.innerWidth <= this.leftTrigger;
        },
        handleResize() {
            this.checkMinLeft();
        },
        showLeftOverlay() {
            this.overlayVisible = !this.overlayVisible;
        },
        restoreLeftPanel() {
            this.overlayVisible = false;
        },
    },
});
</script>

<style scoped>
.Paned {
    display: flex;
    flex-direction: row;
    height: 100%;
    position: relative;
}

.Paned-left,
.Paned-right {
    overflow: auto;
    display: flex;
    flex-direction: column;
}

.Paned-left {
    flex: 0 0 auto;
    transition: left 0.3s;
}

.Paned-left--overlay-visible,
.Paned-left--overlay-hidden {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    min-width: 100%;
    z-index: 1000;
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
    box-shadow: var(--shadow-elevated-2);
    animation: slide-in 0.3s;
}

.Paned-left--overlay-hidden {
    animation: slide-out 0.3s;
}

.Paned-right {
    flex: 1 1 auto;
}

.Paned-toggle {
    position: absolute;
    left: 10px;
    bottom: 10px;
    z-index: 1010;
    background-color: var(--background-base);
    border: 1px solid var(--border-primary);
    border-radius: 8px;
    padding: 5px;
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--text-primary);
}

.Paned-toggle:hover {
    background-color: var(--background-elevated);
}

.Paned-toggle:active {
    background-color: var(--background-elevated-2);
}

.Paned-toggle .mdi {
    font-size: 24px;
}

.Paned-divider {
    cursor: ew-resize;
    background-color: var(--background-elevated);
    border: 2px solid transparent;
    transition: all 0.2s;
}

.Paned-divider:hover,
.Paned--resizing .Paned-divider {
    background-color: var(--background-top);
    border: 2px solid var(--background-top);
}

@keyframes slide-in {
    from {
        transform: translateX(-100%);
        opacity: 0;
    }

    to {
        transform: translateX(0);
        opacity: 1;
    }
}

@keyframes slide-out {
    from {
        transform: translateX(0);
        opacity: 1;
    }

    to {
        transform: translateX(-100%);
        opacity: 0;
    }
}
</style>
