<template>
    <div class="SideLayout">
        <Paned :size="_size" :minLeft="265" :leftTrigger="600">
            <template #left>
                <div class="SideLayout-sidebar">
                    <slot name="sidebar"></slot>
                </div>
            </template>
            <template #right>
                <div class="SideLayout-content">
                    <slot name="content"></slot>
                </div>
            </template>
        </Paned>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name: "SideLayout",
    props: {
        size: {
            type: Object,
            default: () => ({ left: 30, right: 70 }),
        },
    },
    data() {
        return {
            resizing: false,
            _size: { left: 30, right: 70 },
        };
    },
    mounted() {
        console.log("SideLayout mounted");
        this._size = {
            left: this.size.left,
            right: this.size.right,
        };
    },
    methods: {
        startResize() {
            this.resizing = true;
            const _paned = this.$refs.paned as HTMLElement;

            const mouseMove = (event: MouseEvent) => {
                const leftWidth = event.clientX - _paned.getBoundingClientRect().left;
                this._size.left = (leftWidth / _paned.clientWidth) * 100;
            };

            const mouseUp = () => {
                document.removeEventListener("mousemove", mouseMove);
                document.removeEventListener("mouseup", mouseUp);
                this.resizing = false;
            };

            document.addEventListener("mousemove", mouseMove);
            document.addEventListener("mouseup", mouseUp);
        },
    },
});
</script>

<style scoped>
.SideLayout {
    display: flex;
    flex-direction: column;
    height: 100%;
}

.SideLayout-sidebar {
    overflow: auto;
    background-color: var(--background-elevated);
    padding: 20px;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
}

.SideLayout-content {
    padding: 10px;
}
</style>