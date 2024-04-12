<template>
    <Window>
        <template #top>
            <TitleBar>
                <template #area>
                    <Button @click="goBack" icon="chevron_left" type="flat" />
                    <TabsSwitcher :allowNewTabs="true" context="mainTabs" />
                </template>
            </TitleBar>
        </template>
        <template #content>
            <Notebook :newPageContent="newPage" context="mainTabs" />
        </template>
    </Window>
</template>

<script lang="ts">
import { defineComponent, shallowRef } from 'vue';
import NotebookPage from './NotepadPage.vue';

export default defineComponent({
    name: 'Notepad',
    components: {
        NotebookPage,
    },
    methods: {
        newPage() {
            return {
                component: shallowRef(NotebookPage),
                props: {
                    context: 'mainTabs',
                },
            };
        },
        goBack() {
            this.$router.back();
        },
    },
});
</script>