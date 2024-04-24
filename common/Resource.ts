import { IsServer } from "./Platform";

export class Resource {
    constructor(public name: string) {}
    public getMetadata(metadataKey: string, index: number): string {
        return GetResourceMetadata(this.name, metadataKey, index);
    }

    public getPath() {
        return GetResourcePath(this.name);
    }

    public loadFile(fileName: string): string {
        return LoadResourceFile(this.name, fileName);
    }

    public saveFile(fileName: string, data: string, length: number): boolean {
        return SaveResourceFile(this.name, fileName, data, length);
    }

    public scheduleTick(): void {
        return ScheduleResourceTick(this.name);
    }

    public start(): void {
        if (IsServer) {
            StartResource(this.name);
        }
    }

    public stop(): void {
        if (IsServer) {
            StopResource(this.name);
        }
    }

    public static startResource(name: string): void {
        if (IsServer) {
            StartResource(name);
        }
    }

    public static stopResource(name: string): void {
        if (IsServer) {
            StopResource(name);
        }
    }

    public static resourceCount(): number {
        return GetNumResources();
    }
}
