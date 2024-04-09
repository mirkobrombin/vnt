export default class Engine {
    private static instance: Engine;
    private engine: string;

    private constructor() {
        this.engine = this.detectEngine();
    }

    public static getInstance(): Engine {
        if (!Engine.instance) {
            Engine.instance = new Engine();
        }

        return Engine.instance;
    }

    public getEngine(): string {
        return this.engine;
    }

    public isElectron(): boolean {
        return this.engine === 'electron';
    }

    public isTauri(): boolean {
        return this.engine === 'tauri';
    }

    public isWails(): boolean {
        return this.engine === 'wails';
    }

    public isChrome(): boolean {
        return this.engine === 'chrome';
    }

    public isFirefox(): boolean {
        return this.engine === 'firefox';
    }

    private detectEngine(): string {
        if (typeof window !== 'undefined') {
            if (navigator.userAgent.indexOf('Electron') > -1) {
                return 'electron';
            } else if (window.hasOwnProperty("__TAURI_INTERNALS__") || window.hasOwnProperty('__TAURI__')) {
                return 'tauri';
            } else if (window.hasOwnProperty('wails')) {
                return 'wails';
            } else if (window.hasOwnProperty('chrome')) {
                return 'chrome';
            } else if (window.hasOwnProperty('InstallTrigger')) {
                return 'firefox';
            }
        }

        return 'unknown';
    }
}