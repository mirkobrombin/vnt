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
            const cleanValue = newValue.replace(/<\/?[^>]+(>|$)/g, "");
            let escapedTitle = cleanValue.slice(0, 10);
            escapedTitle = escapedTitle.replace(/[^a-zA-Z0-9\s]+$/, "");

            const oldCleanValue = oldValue.replace(/<\/?[^>]+(>|$)/g, "").slice(0, 10);
            if (escapedTitle !== oldCleanValue) {
                // @ts-ignore
                this.$eventBus.emit(`${this.context}-renameTab`, {
                    tabId: this.tabId,
                    title: escapedTitle,
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