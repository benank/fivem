import { Color } from '@common/utils';
import { ClassTypes } from '../enums/ClassTypes';
import { BaseEntity } from './BaseEntity';

export class Prop extends BaseEntity {
	private static lastPropOutline: number | undefined;

	public static exists(prop: Prop): boolean {
		return typeof prop !== 'undefined' && prop.exists();
	}

	public static fromHandle(handle: number): Prop | null {
		return new Prop(handle);
	}

	public static fromNetworkId(networkId: number, errorOnInvalid = false): Prop | null {
		if (errorOnInvalid && NetworkDoesEntityExistWithNetworkId(networkId)) {
			throw new Error(`Entity with ${networkId} doesn't exist`);
		}

		return new Prop(NetworkGetEntityFromNetworkId(networkId));
	}
	public readonly type = ClassTypes.Prop;

	constructor(handle: number) {
		super(handle);
	}

	public exists(): boolean {
		return super.exists() && GetEntityType(this.handle) === 3;
	}

	public placeOnGround(): void {
		PlaceObjectOnGroundProperly(this.handle);
	}

	/**
	 * Sets whether an outline should be drawn around this prop.
	 * Only one prop may have an outline at once to avoid crashes.
	 * @param enabled False to disable, true to enable
	 * @param color Color of the outline
	 * @param shader Shader used to draw the outline.
	 * 0: Default value, gauss shader.
	 * 1: 2px wide solid color outline.
	 * 2: Fullscreen solid color except for entity.
	 */
	public setDrawOutline(enabled: boolean, color: Color = Color.white, shader = 0) {
		if (!enabled) {
			SetEntityDrawOutline(this.handle, false);
			Prop.lastPropOutline = undefined;
			return;
		}

		if (Prop.lastPropOutline) {
			SetEntityDrawOutline(Prop.lastPropOutline, false);
		}

		SetEntityDrawOutlineShader(shader);
		SetEntityDrawOutlineColor(color.r, color.g, color.b, color.a);
		SetEntityDrawOutline(this.handle, true);
		Prop.lastPropOutline = this.handle;
	}
}
