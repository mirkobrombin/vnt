import Engine from '../Engine';

export default class BrowserEngine implements Engine {
    onResize(callback: () => void): void {
        window.addEventListener('resize', callback);
    }

    onThemeChange(callback: (theme: string) => void): void {
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
            if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                callback('dark');
            } else {
                callback('light');
            }
        });
    }

    async getTheme(): Promise<string> {
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }

    async isMaximized(): Promise<boolean> {
        return false;
    }

    async minimize(): Promise<void> {
        window.blur();
    }

    async maximize(): Promise<void> {
        window.focus();
    }

    async unmaximize(): Promise<void> {
        window.focus();
    }

    async close(): Promise<void> {
        window.close();
    }
}