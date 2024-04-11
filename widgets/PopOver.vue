<template>
    <div class="PopOver" ref="popover">
        <div class="PopOver-content">
            <slot></slot>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, nextTick } from "vue";

export default defineComponent({
    name: "PopOver",
    props: {
        attachTo: {
            type: Object,
            required: true,
        },
    },
    mounted() {
        console.debug('PopOver mounted');
        this.setPopoverPosition();

        this.$engine.onResize(() => {
            this.setPopoverPosition();
        });
        document.addEventListener('click', this.handleClickOutside);
    },
    methods: {
        getScrollableParents(element: HTMLElement) {
            let parents: any[] = [];
            let parent = element.parentNode;
            while (parent && parent !== document.body) {
                if ((parent as HTMLElement).scrollHeight > (parent as HTMLElement).clientHeight || (parent as HTMLElement).scrollWidth > (parent as HTMLElement).clientWidth) {
                    let parents: Array<HTMLElement> = [];
                    parents.push(parent as HTMLElement);
                }
                parent = parent.parentNode;
            }
            return parents;
        },
        setPopoverPosition() {
            nextTick(() => {
                const popover = this.$refs.popover as HTMLElement;
                const attachTo = this.attachTo.$el as HTMLElement;
                const rect = attachTo.getBoundingClientRect();
                let top = rect.top;
                let left = rect.left;

                this.getScrollableParents(attachTo).forEach(parent => {
                    // @ts-ignore
                    top += parent.scrollTop - parent.getBoundingClientRect().top + attachTo.getBoundingClientRect().height + 8;
                    // @ts-ignore
                    left += parent.scrollLeft;
                });

                popover.style.top = `${top}px`;
                popover.style.left = `${left}px`;
            });
        },
        handleClickOutside(event: MouseEvent) {
            const popover = this.$refs.popover as HTMLElement;
            if (popover && !popover.contains(event.target as Node) && !this.attachTo.$el.contains(event.target as Node)) {
                this.$emit('close');
            }
        },
    },
});
</script>


<style scoped>
.PopOver {
    position: absolute;
    z-index: 1000;
    background-color: var(--background-base);
    border: 1px solid var(--border-primary);
    border-radius: 8px;
    box-shadow: var(--shadow-elevated);
    padding: 8px;
    text-align: left;
}

.PopOver-content {
    max-width: 300px;
}
</style>
