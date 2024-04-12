<template>
    <div class="NotepadPage">
        <Paned>
            <template #left>
                <textarea class="NotepadPage-textarea" v-model="text" />
            </template>
            <template #right>
                <TextRich class="NotepadPage-preview">
                    <div v-html="text" />
                </TextRich>
            </template>
        </Paned>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name: "NotepadPage",
    props: {
        context: {
            type: String,
            required: true,
        },
        tabId: {
            type: Number,
            required: true,
        },
    },
    data() {
        return {
            text: "",
        };
    },
    mounted() {
        console.debug('NotepadPage mounted');
    },
    watch: {
        text(newValue: string, oldValue: string) {
            if (newValue.slice(0, 10) !== oldValue.slice(0, 10)) {
                this.$eventBus.emit(`${this.context}-renameTab`, {
                    tabId: this.tabId,
                    title: newValue.slice(0, 10),
                });
            }
        },
    },
});
</script>

<style scoped>
.NotepadPage {
    display: flex;
    flex-direction: column;
    height: 100%;
}

.NotepadPage-textarea {
    flex: 1;
    border: none;
    border-radius: 8px;
    padding: 16px;
    resize: none;
    font-size: 16px;
    color: var(--text-primary);
    background-color: transparent;
    outline: none;
}

.NotepadPage-preview {
    background-color: var(--background-base);
    height: 100%;
    text-align: left;
}
</style>