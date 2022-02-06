interface PackageMetrics {
    name: string;
    description: string;
    version: string;
}
export declare function getPackageJson(): Promise<PackageMetrics>;
export {};
