<template>
    <div class="StaticNotebook">
        <div class="StaticNotebook-pages" ref="pages">
            <slot></slot>
        </div>
    </div>
</template>


<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name: "StaticNotebook",
    props: {
        name: {
            type: String,
            required: true,
        },
    },
    data() {
        return {
            currentPageId: -1,
            _pages: [] as HTMLElement[],
        };
    },
    mounted() {
        console.log("StaticNotebook mounted");

        this.$eventBus.on(`${this.name}-changePage`, this.changePage);

        this.$nextTick(() => {
            const pages = this.$refs.pages as HTMLElement;
            this._pages = Array.from(pages.children) as HTMLElement[];
            this._pages.forEach((page: { id: string; }, index: any) => {
                page.id = `${index}`;
            });
            this.changePage(0);
        });
    },
    methods: {
        changePage(pageId: number) {
            if (this.currentPageId === pageId) return;
            this.currentPageId = pageId;

            this._pages.forEach((page: { style: { display: string; }; }) => {
                page.style.display = "none";
            });

            if (this._pages[pageId]) {
                this._pages[pageId].style.display = "block";
                this.$eventBus.emit(`${this.name}-pageChanged`, pageId);
            }
        },
    },
});
</script>