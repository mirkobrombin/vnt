import Engine from '../Engine';

export default class TauriEngine implements Engine {
    private window: any;

    "constructor"(window: any) {
        this.window = window;
    }

    onResize(callback: () => void): void {
        this.window?.listen('tauri://resize', callback);
    }

    onThemeChange(callback: (theme: string) => void): void {
        this.window?.listen('tauri://theme-changed', (theme: string) => {
            callback(theme);
        });
    }

    async getTheme(): Promise<string> {
        return this.window?.theme();
    }

    async isMaximized(): Promise<boolean> {
        return this.window?.isMaximized();
    }

    async minimize(): Promise<void> {
        this.window?.minimize();
    }

    async maximize(): Promise<void> {
        this.window?.maximize();
    }

    async unmaximize(): Promise<void> {
        this.window?.unmaximize();
    }

    async close(): Promise<void> {
        this.window?.close();
    }
}