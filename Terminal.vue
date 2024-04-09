<template>
    <div class="Terminal" ref="terminal"></div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Terminal, ITerminalOptions } from "@xterm/xterm";
import { FitAddon } from '@xterm/addon-fit';
import "xterm/css/xterm.css";

export default defineComponent({
    name: "Terminal",
    data() {
        return {
            terminal: null as Terminal | null,
        };
    },
    mounted() {
        console.log('Terminal mounted');
        this.terminal = new Terminal(
            {
                cursorBlink: true,
                cursorStyle: "underline",
                fontSize: 16,
                fontFamily: "monospace",
                theme: {
                    background: "#000",
                    foreground: "#fff",
                },
            } as ITerminalOptions
        );
        const fitAddon = new FitAddon();
        this.terminal.loadAddon(fitAddon);
        this.terminal.open(this.$refs.terminal as HTMLElement);
        fitAddon.fit();

        this.terminal.writeln(`Terminal ${Math.floor(Math.random() * 10000000000)}`);
    },
});
</script>

<style scoped>
.Terminal {
    width: 100%;
    height: 100%;
}
</style>