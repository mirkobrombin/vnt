<template>
    <div class="SelectField" @click="toggleDropdown"
        :class="{ 'SelectField--active': isOpen, 'SelectField--icon-left': iconPosition === 'left', 'SelectField--filled': hasContent }">
        <label class="SelectField-label" :class="{ 'SelectField-label--active': isOpen || hasContent }">
            {{ label }}
        </label>
        <div class="SelectField-display" ref="displayField">
            {{ displayText }}
            <span class="mdi SelectField-expand-icon">{{ isOpen ? 'expand_less' : 'expand_more' }}</span>
        </div>
        <div v-if="icon" class="SelectField-icon mdi"
            :class="{ 'SelectField-icon--left': iconPosition === 'left', 'SelectField-icon--right': iconPosition === 'right' }">
            {{ icon }}
        </div>
        <div v-if="isOpen" class="SelectField-dropdown">
            <div v-for="option in options" :key="option.value" class="SelectField-option"
                @click.stop="selectOption(option)">
                {{ option.text }}
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

interface Option {
    value: string;
    text: string;
}

export default defineComponent({
    name: 'SelectField',
    props: {
        modelValue: {
            type: String,
            default: '',
        },
        label: {
            type: String,
            default: '',
        },
        options: {
            type: Array as PropType<Option[]>,
            default: () => [],
        },
        icon: {
            type: String,
            default: '',
        },
        iconPosition: {
            type: String,
            default: 'right',
        },
    },
    emits: ['update:modelValue'],
    data() {
        return {
            isOpen: false,
            displayText: '',
        };
    },
    mounted() {
        document.addEventListener('click', this.handleClickOutside);
    },
    watch: {
        modelValue: {
            immediate: true,
            handler(value: string) {
                const option = this.options.find((option) => option.value === value);
                this.displayText = option ? option.text : '';
            },
        },
    },
    computed: {
        hasContent() {
            return this.displayText.length > 0;
        },
    },
    methods: {
        toggleDropdown() {
            this.isOpen = !this.isOpen;
        },
        selectOption(option: Option) {
            this.$emit('update:modelValue', option.value);
            this.displayText = option.text;
            this.isOpen = false;
        },
        handleClickOutside(event: MouseEvent) {
            if (!this.$el.contains(event.target as Node)) {
                this.isOpen = false;
            }
        },
    },
});
</script>

<style scoped>
.SelectField {
    position: relative;
}

.SelectField-display {
    border: none;
    border-bottom: 1px solid var(--border-tertiary);
    font-size: 1rem;
    padding: 8px 0;
    background: transparent;
    color: var(--text-primary);
    outline: none;
    line-height: normal;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 22px;
}

.SelectField-display:focus {
    border-bottom: 2px solid var(--action-suggested);
}

.SelectField-label {
    position: absolute;
    left: 0;
    top: 0;
    color: var(--text-secondary);
    pointer-events: none;
    transition: all 0.2s ease-out, color 0.2s ease-out, top 0.2s ease-out;
    transform: translateY(10px);
}

.SelectField-label--active {
    transform: translateY(-10px);
    font-size: 0.85rem;
    color: #858585;
}

.SelectField--active .SelectField-display {
    border-bottom: 2px solid var(--action-suggested);
}

.SelectField.SelectField--filled .SelectField-display {
    padding-right: 34px;
}

.SelectField.SelectField--filled.SelectField--icon-left .SelectField-display {
    padding-right: 0;
    padding-left: 34px;
}

.SelectField-dropdown {
    display: flex;
    position: absolute;
    top: 100%;
    width: calc(100% - 20px);
    background-color: var(--background-base);
    border: 1px solid var(--border-primary);
    border-radius: 8px;
    box-shadow: var(--shadow-elevated);
    z-index: 10;
    max-height: 200px;
    overflow-y: auto;
    padding: 10px;
    flex-direction: column;
    align-items: stretch;
}

.SelectField-option {
    padding: 10px 16px;
    background-color: transparent;
    border-radius: 8px;
    text-align: left;
}

.SelectField-option:hover {
    background-color: var(--background-elevated-2-hover);
}

.SelectField-option:active {
    background-color: var(--background-top);
}

.SelectField-icon {
    text-align: left;
}

.SelectField-icon,
.SelectField-expand-icon {
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
}

.SelectField-icon--left {
    left: 0;
}

.SelectField-icon--right {
    right: 30px;
}

.SelectField.SelectField--active .SelectField-icon,
.SelectField.SelectField--filled .SelectField-icon {
    color: var(--action-suggested);
}

.SelectField-expand-icon {
    right: 8px;
}

.SelectField.SelectField--icon-left .SelectField-label {
    padding-left: 34px;
}

.SelectField.SelectField--icon-left.SelectField--active .SelectField-label,
.SelectField.SelectField--icon-left.SelectField--filled .SelectField-label {
    padding-left: 0;
}
</style>
