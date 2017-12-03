interface IConfig {
    hasKey(key: string): boolean;
    getValue(key: string, fallback?: any): any;
}

export { IConfig };
