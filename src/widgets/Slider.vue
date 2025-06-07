<template>
    <div class="Slider" @click="onClick" ref="slider">
        <div class="Slider-track"></div>
        <div class="Slider-handle" :style="handleStyle" @mousedown.prevent="startDrag"></div>
        <div v-if="showLabels" class="Slider-labels">
            <span v-for="(label, index) in labels" :key="index" :style="{ left: `${labelPositions[index]}%` }">{{ label
                }}</span>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'Slider',
    props: {
        modelValue: {
            type: Number,
            default: 0,
        },
        min: {
            type: Number,
            default: 0,
        },
        max: {
            type: Number,
            default: 100,
        },
        points: {
            type: Array as () => number[],
            default: () => [],
        },
        labels: {
            type: Array as () => string[],
            default: () => [],
        },
    },
    emits: ['update:modelValue'],
    data() {
        return {
            handleStyle: { left: '0%' },
            dragging: false,
            startX: 0,
            startValue: 0,
            sliderWidth: 0,
            showLabels: this.labels.length > 0,
            labelPositions: this.points.map(point => ((point - this.min) / (this.max - this.min)) * 100),
        };
    },
    mounted() {
        console.debug('Slider mounted');
        this.$nextTick(() => {
            const slider = this.$refs.slider as HTMLElement;
            this.sliderWidth = slider.offsetWidth;
            this.updateHandlePosition();
        });
    },
    watch: {
        modelValue: {
            handler() {
                this.updateHandlePosition();
            },
            immediate: true,
        },
    },
    methods: {
        startDrag(event: { clientX: number; }) {
            this.dragging = true;
            this.startX = event.clientX;
            this.startValue = this.modelValue
            const slider = this.$refs.slider as HTMLElement;
            this.sliderWidth = slider.offsetWidth;

            const moveHandler = (moveEvent: { clientX: number; }) => {
                if (!this.dragging) return;
                const diffX = moveEvent.clientX - this.startX;
                const percentage = diffX / this.sliderWidth;
                const valueDiff = percentage * (this.max - this.min);
                let newValue = this.startValue + valueDiff;
                newValue = Math.max(this.min, Math.min(newValue, this.max));
                this.handleStyle.left = `${((newValue - this.min) / (this.max - this.min)) * 100}%`;
                this.$emit('update:modelValue', newValue);
            };

            const upHandler = () => {
                document.removeEventListener('mousemove', moveHandler);
                document.removeEventListener('mouseup', upHandler);
                this.dragging = false;
            };

            document.addEventListener('mousemove', moveHandler);
            document.addEventListener('mouseup', upHandler);
        },
        onClick(event: { clientX: number; }) {
            const slider = this.$refs.slider as HTMLElement;
            const rect = slider.getBoundingClientRect();
            const clickPosition = (event.clientX - rect.left) / rect.width;
            const newValue = this.min + clickPosition * (this.max - this.min);
            this.$emit('update:modelValue', newValue);
            this.updateHandlePosition();
        },
        updateHandlePosition() {
            const handleWidth = 20;
            const sliderPadding = handleWidth / 2;
            const position = ((this.modelValue - this.min) / (this.max - this.min)) * (this.sliderWidth - sliderPadding * 2);
            const positionPercentage = position / this.sliderWidth * 100;
            this.handleStyle.left = `${positionPercentage}%`;
        },
    },
});
</script>

<style scoped>
.Slider {
    width: 100%;
    position: relative;
    height: 50px;
}

.Slider-track {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 10px;
    background-color: var(--background-top);
    transform: translateY(-50%);
    border-radius: 100px;
    border: 1px solid var(--border-primary);
}

.Slider-handle {
    position: absolute;
    top: 0;
    width: 20px;
    height: 20px;
    background-color: var(--action-suggested);
    border-radius: 50%;
    transform: translateY(-50%);
    margin-left: -10px;
}

.Slider-handle:hover {
    background-color: var(--action-suggested-hover);
}

.Slider-handle:active {
    background-color: var(--action-suggested-active);
}

.Slider-labels {
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin: 16px 0 0 0;
    font-size: 14px;
    font-weight: 600;
    color: var(--text-secondary);
}

.Slider-labels span {
    position: static;
    transform: none;
}
</style>