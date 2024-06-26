/* eslint-disable @typescript-eslint/no-explicit-any */
import { Ped, Prop, Vehicle, Entity } from "./entities";
import { Player } from "./entities/Player";
import { ClassTypes } from "./enum/ClassTypes";
import { Vector2, Vector3, Vector4 } from "./utils";

export type NetEvent = (player: Player, ...args: any[]) => void;

const getClassFromArguments = (...args: any[]): any[] => {
	const newArgs: any[] = [];

	for (const arg of args) {
		switch (arg.type) {
			case ClassTypes.Vector2: {
				newArgs.push(Vector2.create(arg));
				continue;
			}
			case ClassTypes.Vector3: {
				newArgs.push(Vector3.create(arg));
				continue;
			}
			case ClassTypes.Vector4: {
				newArgs.push(Vector4.create(arg));
				continue;
			}
			case ClassTypes.Ped: {
				newArgs.push(Ped.fromNetworkId(arg.handle));
				continue;
			}
			case ClassTypes.Player: {
				newArgs.push(new Player(arg.source));
				continue;
			}
			case ClassTypes.Prop: {
				newArgs.push(Prop.fromNetworkId(arg.handle));
				continue;
			}
			case ClassTypes.Vehicle: {
				newArgs.push(Vehicle.fromNetworkId(arg.netId));
				continue;
			}
			case ClassTypes.Entity: {
				newArgs.push(Entity.fromNetworkId(arg.netId));
				continue;
			}
			default: {
				newArgs.push(arg);
			}
		}
	}
	return newArgs;
};

export class NetEvents {
	
	public static emit(eventName: string, target: Player | Player[] | 'all', ...args: any[]) {
		if (target instanceof Player) {
			emitNet(eventName, target.Source, ...args);
		} else if (Array.isArray(target) && target.every((p) => p instanceof Player)) {
			target.forEach((p) => emitNet(eventName, p.Source, ...args));
		} else if (target === 'all') {
			emitNet(eventName, -1, ...args);
		}
	}
	
	/**
	 * An onNet wrapper that properly converts the type into the correct type
	 */
	public static on = (eventName: string, event: NetEvent) => {
		onNet(eventName, (...args: any[]) => {
			const ply = new Player(source);

			event(ply, ...getClassFromArguments(...args));
		});
	};
}
