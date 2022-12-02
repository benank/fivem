import { Ped, Prop, Vehicle } from "./entities";
import { Player } from "./entities/Player";

export abstract class Game {
	// A map containing generated hashes.
	public static hashCache: Map<string, number> = new Map();
	/**
	 * Calculate the Jenkins One At A Time (joaat) has from the given string.
	 *
	 * @param input The input string to calculate the hash
	 */
	public static generateHash(input: string): number {
		if (typeof input === "undefined") {
			return 0;
		}

		const _hash = this.hashCache.get(input);
		if (_hash) return _hash;
		const hash = GetHashKey(input);
		this.hashCache.set(input, hash);
		return hash;
	}

	/**
	 * Gets how many milliseconds the game has been open this session
	 */
	public static get GameTime(): number {
		return GetGameTimer();
	}

	public static get GameBuild(): number {
		return GetGameBuildNumber();
	}

	public static get GameName(): string {
		return GetGameName();
	}

	public static registerCommand(name: string, handler: (player: Player, args: any[]) => void, restricted = false): void {
		RegisterCommand(name, (source: string, args: any[]) => {
			const player = new Player(parseInt(source));

			handler(player, args);
		}, restricted)
	};

	public static get RegisteredCommands(): [{ name: string }] {
		return GetRegisteredCommands() as unknown as [{ name: string }];
	}

	/**
	 * Get an iterable list of players currently on the server.
	 * @returns Iterable list of Player objects.
	 */
	public static *PlayerList(): IterableIterator<Player> {
		for (const id of getPlayers() as unknown as number[]) {
			yield new Player(id);
		}
	}

	/**
	 * Get an interable list of peds currently on the server 
	 * @returns Iterable list of Peds.
	 */
	public static *getAllPed(): IterableIterator<Ped> {
		for (const pedId of GetAllPeds() as unknown as number[]) {
			yield new Ped(pedId);
		}
	}

	/**
	 * Get an interable list of props currently on the server 
	 * @returns Iterable list of Props.
	 */
	public static *getAllProps(): IterableIterator<Prop> {
		for (const prop of GetAllObjects() as unknown as number[]) {
			yield new Prop(prop);
		}
	}

	/**
	 * Get an interable list of vehicles currently on the server 
	 * @returns Iterable list of Vehicles.
	 */
	public static *getAllVehicles(): IterableIterator<Vehicle> {
		for (const prop of GetAllVehicles() as unknown as number[]) {
			yield new Vehicle(prop);
		}
	}
}
