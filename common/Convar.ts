export class Convar {
	public static buffer(): string {
		return GetConsoleBuffer();
	}

	public static get(variable: string, defaultVar: string): string {
		return GetConvar(variable, defaultVar);
	}

	public static getInt(variable: string, defaultVar: number): number {
		return GetConvarInt(variable, defaultVar);
	}

	public static set(variable: string, value: string): void {
		SetConvar(variable, value);
	}

	public static setReplicated(variable: string, value: string): void {
		SetConvarReplicated(variable, value);
	}

	public static setServerInfo(variable: string, value: string): void {
		SetConvarServerInfo(variable, value);
	}
}
