<template>
    <BaseField :model-value="modelValue" :label="label" :placeholder="placeholder" :type="type" :icon="icon"
        :icon-position="iconPosition" @update:modelValue="updateTextValue" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BaseField from './BaseField.vue';

export default defineComponent({
    name: 'TextField',
    components: {
        BaseField,
    },
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
    mounted() {
        console.debug('TextField mounted');
    },
    methods: {
        updateTextValue(newValue: string) {
            this.$emit('update:modelValue', newValue);
        },
    },
});
</script>
