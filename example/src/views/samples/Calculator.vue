<template>
    <Window>
        <template #top>
            <TitleBar>
                <template #area>
                    <Button @click="goBack" icon="chevron_left" type="flat" />
                </template>
            </TitleBar>
        </template>
        <template #content>
            <VBox align="fill" class="Calculator">
                <div class="Calculator-display">
                    <div class="Calculator-history">
                        <div class="Calculator-history-item" v-for="item in history" :key="item">{{ item }}</div>
                    </div>
                    <TextField v-model="currentInput" placeholder="0" class="Calculator-input" readOnly :flat="true" />
                </div>
                <VBox align="center">
                    <VBox class="Calculator-keypad" :margin="16">
                        <HBox class="Keypad-row">
                            <Button label="C" @click="currentInput = ''" class="Key Key--function" />
                            <Button label="(" @click="currentInput += '('" class="Key Key--function" />
                            <Button label=")" @click="currentInput += ')'" class="Key Key--function" />
                            <Button label="÷" @click="currentInput += '/'" class="Key Key--function" />
                        </HBox>
                        <HBox class="Keypad-row">
                            <Button label="7" @click="currentInput += '7'" class="Key" />
                            <Button label="8" @click="currentInput += '8'" class="Key" />
                            <Button label="9" @click="currentInput += '9'" class="Key" />
                            <Button label="×" @click="currentInput += '*'" class="Key Key--function" />
                        </HBox>
                        <HBox class="Keypad-row">
                            <Button label="4" @click="currentInput += '4'" class="Key" />
                            <Button label="5" @click="currentInput += '5'" class="Key" />
                            <Button label="6" @click="currentInput += '6'" class="Key" />
                            <Button label="-" @click="currentInput += '-'" class="Key Key--function" />
                        </HBox>
                        <HBox class="Keypad-row">
                            <Button label="1" @click="currentInput += '1'" class="Key" />
                            <Button label="2" @click="currentInput += '2'" class="Key" />
                            <Button label="3" @click="currentInput += '3'" class="Key" />
                            <Button label="+" @click="currentInput += '+'" class="Key Key--function" />
                        </HBox>
                        <HBox class="Keypad-row">
                            <Button label="0" @click="currentInput += '0'" class="Key Key--zero" />
                            <Button label="." @click="currentInput += '.'" class="Key Key--function" />
                            <Button label="%" @click="currentInput += '%'" class="Key Key--function" />
                            <Button label="=" @click="calculateResult" type="suggested" class="Key" />
                        </HBox>
                    </VBox>
                </VBox>
            </VBox>
        </template>
    </Window>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name: "Calculator",
    data() {
        return {
            currentInput: "",
            history: [] as string[],
            allowedKeys: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '(', ')', '+', '-', '*', '/', '%'],
        };
    },
    mounted() {
        window.addEventListener('keydown', this.handleKeyPress);
    },
    beforeUnmount() {
        window.removeEventListener('keydown', this.handleKeyPress);
    },
    methods: {
        calculateResult() {
            try {
                const result = eval(this.currentInput);
                this.history.push(`${this.currentInput} = ${result}`);
                this.currentInput = String(result);
            } catch (error) {
                this.currentInput = "Error";
            }
        },
        handleKeyPress(event: KeyboardEvent) {
            if (this.allowedKeys.includes(event.key)) {
                this.currentInput += event.key;
            } else if (event.key === 'Enter' || event.key === '=') {
                this.calculateResult();
            } else if (event.key === 'Backspace') {
                this.currentInput = this.currentInput.slice(0, -1);
            } else if (event.key === 'Escape') {
                this.currentInput = '';
            }
        },
        goBack() {
            this.$router.back();
        },
    },
});
</script>

<style scoped>
.Calculator {
    width: 100%;
    height: 100%;
    max-height: 600px;
}

.Calculator-display {
    margin-bottom: 1rem;
    font-size: 2rem;
    height: 170px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    background-color: var(--background-elevated-2);
    border: none;
    padding: 0 20px 10px;
    box-sizing: border-box;
    flex-direction: column;
    border-bottom: 1px solid var(--border-tertiary);
}

.Calculator-history {
    display: flex;
    flex-direction: column;
    gap: 8px;
    max-height: 100px;
    overflow-y: auto;
    text-align: right;
    padding-top: 10px;
    font-size: 1rem;
    width: 100%;
    color: var(--text-secondary);
}

.Calculator-history::-webkit-scrollbar {
    display: none;
}

.Calculator-keypad {
    width: 100%;
    max-width: 400px;
}

.Keypad-row {
    display: flex;
    justify-content: space-between;
    width: 100%;
}

.Key {
    width: 50px;
    height: 60px;
    margin: 5px;
    border-radius: 8px;
    font-size: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    user-select: none;
    flex-grow: 1;
}

.Key--function {
    background-color: var(--background-elevated-2);
}
</style>