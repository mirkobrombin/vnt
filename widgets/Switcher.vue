<template>
    <div class="Switcher" :class="{ 'Switcher--activated': value }" @click="onClick" ref="switchContainer">
        <div class="Switcher-handler" :style="handleStyle" @mousedown.prevent="startDrag"></div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'Switcher',
    props: {
        model: {
            type: Boolean,
            default: false,
        },
    },
    emits: ['update:model'],
    data() {
        return {
            value: this.model,
            dragging: false,
            hasMoved: false,
            justDragged: false,
            startX: 4,
            initialPosition: 4,
            handleStyle: { left: '4px', transition: 'initial' },
        };
    },
    mounted() {
        console.log('Switcher mounted');
        this.updateHandlePosition();
    },
    watch: {
        model(newValue) {
            this.value = newValue;
            this.updateHandlePosition();
        },
    },
    methods: {
        startDrag(event: MouseEvent) {
            this.dragging = true;
            this.hasMoved = false;
            this.startX = event.clientX;
            this.initialPosition = this.value ? 34 : 4;
            this.handleStyle.transition = 'initial';

            const moveHandler = (moveEvent: MouseEvent) => {
                const diff = moveEvent.clientX - this.startX;
                if (Math.abs(diff) > 5) {
                    this.hasMoved = true;
                }
                let newPosition = this.initialPosition + diff;
                newPosition = Math.max(4, Math.min(34, newPosition));
                this.handleStyle.left = `${newPosition}px`;
                this.updateValueBasedOnPosition(newPosition);
            };

            const stopDrag = () => {
                window.removeEventListener('mousemove', moveHandler);
                window.removeEventListener('mouseup', stopDrag);
                this.dragging = false;
                this.handleStyle.transition = 'left 0.2s ease-in-out';
                this.$emit('update:model', this.value);
                this.updateHandlePosition();
            };

            window.addEventListener('mousemove', moveHandler);
            window.addEventListener('mouseup', stopDrag);
        },
        updateValueBasedOnPosition(position: number) {
            const newValue = position > 15;
            if (this.value !== newValue) {
                this.value = newValue;
                this.$emit('update:model', this.value);
            }
        },
        onClick() {
            if (!this.dragging && !this.hasMoved) {
                this.value = !this.value;
                this.$emit('update:model', this.value);
                this.updateHandlePosition();
            }
            if (!this.dragging) {
                this.hasMoved = false;
            }
        },
        updateHandlePosition() {
            this.handleStyle = {
                left: this.value ? '34px' : '4px',
                transition: 'left 0.2s ease-in-out',
            };
        },
    },
});
</script>

<style scoped>
.Switcher {
    width: 60px;
    height: 28px;
    background-color: var(--background-elevated);
    border-radius: 20px;
    display: flex;
    align-items: center;
    position: relative;
    transition: background-color 0.2s;
    border: 1px solid var(--border-primary);
}

.Switcher--activated {
    background-color: var(--action-suggested);
    box-shadow: var(--shadow-elevated-2);
    border-color: transparent;
}

.Switcher-handler {
    width: 20px;
    height: 20px;
    background-color: var(--text-secondary);
    border-radius: 50%;
    position: absolute;
    cursor: grab;
    box-shadow: var(--shadow-elevated);
}

.Switcher--activated .Switcher-handler {
    background-color: var(--background-base);
}
</style>
