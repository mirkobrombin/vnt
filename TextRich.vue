<template>
    <div class="TextRich">
        <div class="TextRich-content">
            <slot></slot>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name: "TextRich",
    mounted() {
        console.log('TextRich mounted');
    },
});
</script>

<style>
.TextRich {
    padding: 2px;
}

.TextRich-content {
    display: flex;
    flex-direction: column;
    min-width: 160px;
    align-items: flex-start;
    line-height: 1.5;
    gap: 20px;
}

.TextRich-content p {
    margin: 0;
}

.TextRich-content b,
.TextRich-content strong {
    font-weight: bold;
}

.TextRich-content i,
.TextRich-content em {
    font-style: italic;
}

.TextRich-content u {
    text-decoration: underline;
}

.TextRich-content s {
    text-decoration: line-through;
}

.TextRich-content h1,
.TextRich-content h2,
.TextRich-content h3,
.TextRich-content h4,
.TextRich-content h5,
.TextRich-content h6 {
    margin: 0;
}

.TextRich-content h1 {
    font-size: 2.25rem;
}

.TextRich-content h2 {
    font-size: 1.875rem;
}

.TextRich-content h3 {
    font-size: 1.5rem;
}

.TextRich-content h4 {
    font-size: 1.25rem;
}

.TextRich-content h5 {
    font-size: 1.125rem;
}

.TextRich-content h6 {
    font-size: 1rem;
}

.TextRich-content ul {
    list-style-type: disc;
    padding-left: 20px;
}

.TextRich-content ol {
    list-style-type: decimal;
    padding-left: 20px;
}

.TextRich-content ul,
.TextRich-content ol {
    margin: 0;
}

.TextRich-content li {
    margin: 0;
}

.TextRich-content a {
    color: var(--action-suggested);
    text-decoration: none;
}

.TextRich-content a:hover {
    text-decoration: underline;
}

.TextRich-content a:active {
    color: var(--action-suggested-active);
}

.TextRich-content blockquote {
    margin: 0;
    padding: 0 1em;
    border-left: 4px solid var(--action-suggested);
}

.TextRich-content pre {
    margin: 0;
    padding: 16px;
    background-color: var(--action-suggested-disabled);
    color: var(--action-suggested-active);
    border-radius: 8px;
    overflow-x: auto;
}

.TextRich-content code {
    font-family: monospace;
    font-size: 0.875rem;
    background-color: var(--action-suggested-disabled);
    color: var(--action-suggested-active);
    padding: 2px 4px;
    border-radius: 8px;
}

.TextRich-content hr {
    margin: 0;
    border: none;
    border-top: 1px solid #323232;
}

.TextRich-content img {
    max-width: 100%;
    height: auto;
    border-radius: 8px;
}

.TextRich-content table {
    width: 100%;
    border-collapse: collapse;
    color: var(--text-primary);
}

.TextRich-content th,
.TextRich-content td {
    border: 1px solid var(--border-primary);
    padding: 8px;
}

.TextRich-content th {
    background-color: var(--background-elevated);
}

.TextRich-content tr:nth-child(even) {
    background-color: var(--background-base);
}

.TextRich-content tr:nth-child(odd) {
    background-color: var(--background-elevated);
}

.TextRich-content tr:hover {
    background-color: var(--background-base);
}

.TextRich-content tr td:hover {
    background-color: var(--background-elevated-2);
}

.TextRich-content center {
    text-align: center;
    display: block;
    width: 100%;
}
</style>
