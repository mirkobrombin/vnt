<template>
    <div class="BaseField" @click="focusInput"
        :class="{ 'BaseField--active': isActive || hasContent, 'BaseField--icon-left': iconPosition === 'left', 'BaseField--flat': flat }">
        <label class="BaseField-label" :class="{ 'BaseField-label--active': isActive || hasContent }">
            {{ label }}
        </label>
        <input :type="inputType" :placeholder="isActive ? placeholder : ''" :value="inputValue" @input="handleInput"
            @focus="isActive = true" @blur="handleBlur" class="BaseField-input" :readonly="readOnly" ref="inputField" />
        <span v-if="icon" class="BaseField-icon mdi"
            :class="{ 'BaseField-icon--left': iconPosition === 'left', 'BaseField-icon--right': iconPosition === 'right' }">
            {{ icon }}
        </span>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'BaseField',
    props: {
        modelValue: {
            type: String,
            default: '',
        },
        label: {
            type: String,
            default: '',
        },
        placeholder: {
            type: String,
            default: '',
        },
        type: {
            type: String,
            default: 'text',
            validator: (value: string) => ['text', 'number', 'email', 'password'].includes(value),
        },
        icon: {
            type: String,
            default: '',
        },
        iconPosition: {
            type: String,
            default: 'right',
            validator: (value: string) => ['left', 'right'].includes(value),
        },
        readOnly: {
            type: Boolean,
            default: false,
        },
        flat: {
            type: Boolean,
            default: false,
        },
    },
    emits: ['update:modelValue'],
    data() {
        return {
            inputValue: this.modelValue,
            isActive: false,
        };
    },
    watch: {
        modelValue(newVal) {
            this.inputValue = newVal;
        }
    },
    mounted() {
        console.debug('BaseField mounted');
    },
    computed: {
        hasContent() {
            return this.inputValue.length > 0;
        },
    },
    methods: {
        focusInput() {
            (this.$refs.inputField as HTMLInputElement).focus();
        },
        handleInput(event: Event) {
            const newValue = (event.target as HTMLInputElement).value;
            this.inputValue = newValue;
            this.$emit('update:modelValue', newValue);
        },
        handleBlur() {
            this.isActive = this.hasContent;
        },
        inputType(): string {
            return this.type;
        },
    },
});
</script>

<style scoped>
.BaseField {
    position: relative;
}

.BaseField-input {
    width: 100%;
    border: none;
    border-bottom: 1px solid var(--border-tertiary);
    font-size: 100%;
    padding: 8px 0;
    background: transparent;
    color: var(--text-primary);
    outline: none;
    line-height: normal;
}

.BaseField-input:focus {
    border-bottom: 2px solid var(--action-suggested);
}

.BaseField.BaseField--flat .BaseField-input {
    border-bottom: none;
}

.BaseField-label {
    position: absolute;
    left: 0;
    top: 0;
    color: var(--text-secondary);
    pointer-events: none;
    transition: all 0.2s ease-out, color 0.2s ease-out, top 0.2s ease-out;
    transform: translateY(10px);
}

.BaseField-label--active {
    transform: translateY(-10px);
    font-size: 0.85rem;
}

.BaseField:not(.BaseField--active) .BaseField-input:placeholder-shown~.BaseField-label {
    transform: translateY(0);
    font-size: 1rem;
    top: 1.5rem;
}

.BaseField-icon {
    position: absolute;
    top: 59%;
    transform: translateY(-67%);
}

.BaseField--active .BaseField-icon {
    color: var(--action-suggested);
}

.BaseField-icon--left {
    left: 0;
}

.BaseField-icon--right {
    right: 0;
}

.BaseField--icon-left .BaseField-input,
.BaseField--icon-left .BaseField-label:not(.BaseField-label--active) {
    padding-left: 34px;
}

.BaseField--icon-left .BaseField-input {
    width: calc(100% - 34px);
}
</style>