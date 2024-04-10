<template>
    <button class="Button" :disabled="disabled" :class="classes">
        <span v-if="icon" class="Button-icon mdi">{{ icon }}</span>
        <span v-if="label" class="Button-label">{{ label }}</span>
    </button>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name: "Button",
    props: {
        label: {
            type: String,
            default: "",
        },
        icon: {
            type: String,
            default: "",
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        type: {
            type: String,
            default: "button",
        },
    },
    mounted() {
        console.log('Button mounted');
    },
    computed: {
        classes() {
            const classes = [] as string[];

            if (this.icon) {
                if (this.label) {
                    classes.push("Button--withIcon");
                } else {
                    classes.push("Button--iconOnly");
                }
            }
            if (this.disabled) {
                classes.push("Button--disabled");
            }
            if (this.type === "suggested") {
                classes.push("Button--suggested");
            }
            if (this.type === "destructive") {
                classes.push("Button--destructive");
            }

            return classes;
        },
    },
});
</script>

<style scoped>
.Button {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--background-top);
    color: var(--text-primary);
    transition: background-color 0.2s, color 0.2s;
    border-radius: 20px;
    border: 0;
    font-size: 15px;
    gap: 5px;
    padding: 10px 15px;
}

.Button.Button--withIcon {
    padding-right: 20px;
}

.Button.Button--disabled {
    cursor: not-allowed;
    opacity: 0.5;
}

.Button:hover {
    background-color: var(--background-elevated);
}

.Button:active {
    background-color: var(--background-base);
}

.Button.Button--suggested {
    background-color: var(--action-suggested);
    color: var(--text-primary-alt);
}

.Button.Button--suggested:hover {
    background-color: var(--action-suggested-hover);
}

.Button.Button--suggested:active {
    background-color: var(--action-suggested-active);
}

.Button.Button--destructive {
    background-color: var(--action-destructive);
    color: var(--text-primary-alt);
}

.Button.Button--destructive:hover {
    background-color: var(--action-destructive-hover);
}

.Button.Button--destructive:active {
    background-color: var(--action-destructive-active);
}

.Button-icon {
    font-size: 22px;
}

.Button-label {
    font-weight: 600;
    position: relative;
    top: -1px;
}
</style>
