export default interface Engine {
    onResize(callback: () => void): void;
    onThemeChange(callback: (theme: string) => void): void;
    getTheme(): Promise<string>;
    isMaximized(): Promise<boolean>;
    minimize(): Promise<void>;
    maximize(): Promise<void>;
    unmaximize(): Promise<void>;
    close(): Promise<void>;
}