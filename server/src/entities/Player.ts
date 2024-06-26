import cfx from "../cfx";
import { ClassTypes } from "../enum/ClassTypes";
import { Game } from "../Game";
import { PlayerIdentifier } from "../type/PlayerIdentifier";
import { cleanPlayerName } from "../utils";
import { Vector3 } from "../utils";
import { Ped } from "./Ped";

export class Player {
	protected type = ClassTypes.Player;
	constructor(private readonly source: number) {}

	public static fromStateBagName(bagName: string) {
		const playerHandle = GetPlayerFromStateBagName(bagName);
		if (playerHandle === 0) {
			return;
		}

		return new Player(playerHandle);
	}

	/**
	 * Get an interable list of players currently on the server
	 * @returns Iterable list of Players.
	 */
	public static *AllPlayers(): IterableIterator<Player> {
		const num = GetNumPlayerIndices();
		for (let i = 0; i < num; i++) {
			yield new Player(parseInt(GetPlayerFromIndex(i)));
		}
	}

	public get Exists(): boolean {
		return DoesPlayerExist(this.Src);
	}

	public get Source(): number {
		return this.source;
	}

	public get State(): StateBagInterface {
		return cfx.Player(this.source).state;
	}

	/**
	 * Returns the player source casted as a string
	 */
	public get Src(): string {
		return this.source as unknown as string;
	}

	public get Ped(): Ped {
		return new Ped(GetPlayerPed(this.Src));
	}

	public set Model(model: string) {
		SetPlayerModel(this.Src, Game.generateHash(model));
	}

	public get Tokens(): string[] {
		return getPlayerTokens(this.source);
	}

	public GetIdentifier(type: PlayerIdentifier): string {
		return GetPlayerIdentifierByType(this.Src, type);
	}

	public get Identifiers(): Record<PlayerIdentifier, string | null> {
		const identifiers = getPlayerIdentifiers(this.source);
		const playerIdens: Record<PlayerIdentifier, string | null> = {
			discord: null,
			fivem: null,
			ip: null,
			license: null,
			license2: null,
			live: null,
			steam: null,
			xbl: null,
		};

		identifiers.forEach(iden => {
			if (iden.includes("discord")) {
				playerIdens["discord"] = iden.replace("discord:", "");
			} else if (iden.includes("fivem")) {
				playerIdens["fivem"] = iden.replace("fivem:", "");
			} else if (iden.includes("ip")) {
				playerIdens["ip"] = iden.replace("ip:", "");
			} else if (iden.includes("license:")) {
				playerIdens["license"] = iden.replace("license:", "");
			} else if (iden.includes("license2:")) {
				playerIdens["license2"] = iden.replace("license2:", "");
			} else if (iden.includes("live")) {
				playerIdens["live"] = iden.replace("live:", "");
			} else if (iden.includes("steam")) {
				playerIdens["steam"] = iden.replace("steam:", "");
			} else if (iden.includes("xbl")) {
				playerIdens["xbl"] = iden.replace("xbl:", "");
			}
		});

		return playerIdens;
	}

	public get Endpoint(): string {
		return GetPlayerEndpoint(this.Src);
	}

	public get CameraRotation(): Vector3 {
		return Vector3.fromArray(GetPlayerCameraRotation(this.Src));
	}

	/**
	 * Returns the time since the last player UDP message
	 */
	public get LastMessage(): number {
		return GetPlayerLastMsg(this.Src);
	}

	public get MaxArmour(): number {
		return GetPlayerMaxArmour(this.Src);
	}

	public get MaxHealth(): number {
		return GetPlayerMaxHealth(this.Src);
	}

	public get MeleeModifier(): number {
		return GetPlayerMeleeWeaponDamageModifier(this.Src);
	}

	/**
	 * @returns the players name
	 */
	public get Name(): string {
		return GetPlayerName(this.Src);
	}

	/**
	 * @returns the players name with any color code unicode, etc removed, this can lead to there being no name at all
	 */
	public filteredName(): string {
		return cleanPlayerName(this.Name);
	}

	/**
	 * @returns the players round trip ping
	 */
	public get Ping(): number {
		return GetPlayerPing(this.Src);
	}

	/**
	 * @returns the current routhing bucket the player is in, default is 0
	 */
	public get RoutingBucket(): number {
		return GetPlayerRoutingBucket(this.Src);
	}

	public get Team(): number {
		return GetPlayerTeam(this.Src);
	}

	public get WantedPosition(): Vector3 {
		return Vector3.fromArray(GetPlayerWantedCentrePosition(this.Src));
	}

	public get WantedLevel(): number {
		return GetPlayerWantedLevel(this.Src);
	}

	public get IsEvadingWanted(): boolean {
		return IsPlayerEvadingWantedLevel(this.Src);
	}

	public get WeaponDamageModifier(): number {
		return GetPlayerWeaponDamageModifier(this.Src);
	}

	public get WeaponDefenseModifier(): number {
		return GetPlayerWeaponDefenseModifier(this.Src);
	}

	public get WeaponDefenseModifier2(): number {
		return GetPlayerWeaponDefenseModifier_2(this.Src);
	}

	public get AirDragMultiplier(): number {
		return GetAirDragMultiplierForPlayersVehicle(this.Src);
	}

	public get IsUsingSuperJump(): boolean {
		return IsPlayerUsingSuperJump(this.Src);
	}

	public get IsMuted(): boolean {
		return MumbleIsPlayerMuted(this.source);
	}

	public set IsMuted(isMuted: boolean) {
		MumbleSetPlayerMuted(this.source, isMuted);
	}

	public set Invincible(isInvincinble: boolean) {
		SetPlayerInvincible(this.Src, isInvincinble);
	}

	public get Invincible() {
		return GetPlayerInvincible(this.Src);
	}

	public isAceAllowed(object: string): boolean {
		return IsPlayerAceAllowed(this.Src, object);
	}

	public timeInPersuit(lastPursuit = false): number {
		return GetPlayerTimeInPursuit(this.Src, lastPursuit);
	}

	public drop(reason = "No reason specified"): void {
		DropPlayer(this.Src, reason);
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	public emit(eventName: string, ...args: any[]): void {
		TriggerClientEvent(eventName, this.source, ...args);
	}

	public toString() {
		return `Player ${this.Name} (${this.source})`;
	}
}
