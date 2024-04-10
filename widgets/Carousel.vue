<template>
    <div class="Carousel">
        <div class="Carousel-leftControl">
            <button @click="prevSlide" v-if="currentSlide > 0">
                <span class="mdi">chevron_left</span>
            </button>
        </div>
        <div class="Carousel-slides" :style="transformStyle">
            <slot></slot>
        </div>
        <div class="Carousel-rightControl">
            <button @click="nextSlide" v-if="currentSlide < slides.length - 1">
                <span class="mdi">chevron_right</span>
            </button>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name: "Carousel",
    data() {
        return {
            currentSlide: 0,
            slides: [] as HTMLElement[],
        };
    },
    computed: {
        transformStyle() {
            const percentage = -(100 * this.currentSlide);
            return {
                transform: `translateX(${percentage}%)`,
            };
        }
    },
    mounted() {
        console.log('Carousel mounted');
        this.slides = Array.from(this.$el.querySelectorAll(".Carousel-slides > *")) as HTMLElement[];
    },
    methods: {
        prevSlide() {
            if (this.currentSlide > 0) {
                this.currentSlide--;
            }
        },
        nextSlide() {
            if (this.currentSlide < this.slides.length - 1) {
                this.currentSlide++;
            }
        },
    },
});
</script>

<style scoped>
.Carousel {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    min-height: 200px;
    position: relative;
    overflow: hidden;
    background-color: var(--background-elevated);
}

.Carousel-leftControl,
.Carousel-rightControl {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: center;
}

.Carousel-leftControl button,
.Carousel-rightControl button {
    background-color: transparent;
    border: none;
    color: var(--text-secondary);
    font-size: 24px;
    box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
    border-radius: 100%;
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.Carousel-leftControl button:hover,
.Carousel-rightControl button:hover {
    color: var(--text-secondary);
    background-color: var(--background-elevated-2);
}

.Carousel-leftControl button:active,
.Carousel-rightControl button:active {
    background-color: var(--background-top);
}

.Carousel-leftControl {
    left: 0;
}

.Carousel-rightControl {
    right: 0;
}

.Carousel-slides {
    display: flex;
    width: 100%;
    transition: transform 0.5s;
}
</style>

<style>
.Carousel-slides>* {
    flex: 0 0 100%;
    width: 100%;
}
</style>