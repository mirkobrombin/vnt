<template>
    <div class="Showcase">
        <Card :fill="true">
            <VBox :spacing="15" :stretch="true">
                <h2 class="Showcase-title">{{ title }}</h2>
                <p class="Showcase-description">{{ description }}</p>
                <div class="Showcase-content">
                    <slot></slot>
                </div>
            </VBox>
        </Card>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name: "Showcase",
    props: {
        title: {
            type: String,
            default: "",
        },
        description: {
            type: String,
            default: "",
        },
    },
});
</script>

<style scoped>
.Showcase {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    height: 100%;
    width: 100%;
}

.Showcase-title {
    font-size: 1.5rem;
    font-weight: 400;
    margin: 0;
}

.Showcase-description {
    font-size: 1rem;
    font-weight: 300;
    margin: 0;
}

.Showcase-content {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    height: 100%;
    background-color: var(--background-base);
    border-radius: 8px;
    padding: 16px;
}
</style>