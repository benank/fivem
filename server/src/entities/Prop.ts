import { ClassTypes } from "../enum/ClassTypes";
import { Vector3 } from "../utils";
import { BaseEntity } from "./BaseEntity";

export class Prop extends BaseEntity {
	protected type = ClassTypes.Prop;
	constructor(handle: number) {
		super(handle);
	}

	/**
	 * Get an interable list of props currently on the server
	 * @returns Iterable list of Props.
	 */
	public static *AllProps(): IterableIterator<Prop> {
		for (const prop of GetAllObjects() as unknown as number[]) {
			yield new Prop(prop);
		}
	}

	public static fromNetworkId(netId: number): Prop {
		return new Prop(NetworkGetEntityFromNetworkId(netId));
	}

	public static fromHandle(handle: number): Prop {
		return new Prop(handle);
	}

	public static async Create(hash: string, position: Vector3, isNetwork: boolean) {
		const handle = CreateObject(hash, position.x, position.y, position.z, isNetwork, true, true);
		const prop = new Prop(handle);
		while (!prop.Exists) {
			await new Promise((res) => setTimeout(res, 1));
		}

		return prop;
	}
}
