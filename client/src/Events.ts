/* eslint-disable */
import { ClassTypes } from './enums/ClassTypes';
import { Ped } from './models/Ped';
import { Player } from './models/Player';
import { Prop } from './models/Prop';
import { Vehicle } from './models/Vehicle';
import { Entity } from './models/Entity';
import { Vector2, Vector3, Vector4 } from '@common/utils';

export type NetEvent = (...args: any[]) => void;

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
				newArgs.push(Player.fromServerId(arg.source));
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
	/**
	 * An onNet wrapper that properly converts the type into the correct type
	 */
	public static on = (eventName: string, event: NetEvent) => {
		onNet(eventName, (...args: any[]) => {
			event(...getClassFromArguments(...args));
		});
	};
	
	public static emit = (eventName: string, ...args: any[]) => {
		emitNet(eventName, ...args);
	}
}
