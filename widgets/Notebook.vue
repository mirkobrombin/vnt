<template>
    <div class="Notebook">
        <div class="Notebook-items">
            <div class="Notebook-items-item" v-for="page in orderedPages" :key="page.id"
                :class="{ active: activePage === page.id }">
                <component :is="page.content" v-if="page.props" v-bind="page.props" />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

interface Page {
    id: number;
    content: any;
    props?: {};
}

export default defineComponent({
    name: "Notebook",
    props: {
        context: {
            type: String,
            required: true,
        },
        newPageContent: {
            type: Function,
            required: false,
        },
    },
    data() {
        return {
            pages: [] as Page[],
            activePage: 1,
        };
    },
    computed: {
        orderedPages(): Page[] {
            return this.pages.sort((a: { id: number; }, b: { id: number; }) => a.id - b.id);
        },
    },
    mounted() {
        console.log("Notebook mounted");

        this.$eventBus.on(`${this.context}-createTab`, (event: unknown) => this.createPage(event as number));
        this.$eventBus.on(`${this.context}-setActiveTab`, (event: unknown) => this.setActivePage(event as number));
        this.$eventBus.on(`${this.context}-closeTab`, (event: unknown) => this.closePage(event as number));
    },
    methods: {
        createPage(pageId: number) {
            const newPage = defineComponent(this.newPageContent?.()) as any;

            if (newPage.props === undefined) {
                this.pages.push({
                    id: pageId,
                    content: newPage.component,
                });
            } else {
                let _props = newPage.props
                _props.tabId = pageId;
                this.pages.push({
                    id: pageId,
                    content: newPage.component,
                    props: _props,
                });
            }

            this.activePage = this.pages.length;

            this.$eventBus.emit(`${this.context}-pageCreated`, this.activePage);
        },
        setActivePage(pageId: number) {
            this.activePage = pageId;

            this.$eventBus.emit(`${this.context}-pageChanged`, this.activePage);

            console.log("setActivePage", pageId);
        },
        closePage(pageId: number) {
            const pageIndex = this.pages.findIndex((page) => page.id === pageId);
            if (pageIndex === -1) {
                return;
            }

            this.pages.splice(pageIndex, 1);

            if (this.activePage === pageId) {
                this.activePage = this.pages.length;
            }

            this.$eventBus.emit(`${this.context}-pageClosed`, pageId);

            console.log("remaining pages", this.pages);
        },
    },
});
</script>

<style scoped>
.Notebook {
    display: flex;
    flex-direction: column;
    height: 100%;
}

.Notebook-items {
    display: flex;
    flex-direction: column;
    height: 100%;
}

.Notebook-items-item {
    flex: 1;
    flex-direction: column;
    height: 100%;
    display: none;
}

.Notebook-items-item.active {
    display: flex;
}
</style>