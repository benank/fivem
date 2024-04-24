import { Vector3, Color } from '@common/utils';
import { Entity, ParticleEffectAsset } from './';
import { InvertAxis, InvertAxisFlags } from './enums';

export type ParticleEffectOrigin = 'position' | 'entity' | 'bone';

export interface ParticleEffectArgs {
	effectBank: string;
	effectName: string;
	origin?: ParticleEffectOrigin;
	entity?: Entity;
	entityOffset?: Vector3;
	position?: Vector3;
	rotation?: Vector3;
	scale?: number;
	/** Can only be false when using origin type 'position' */
	loop?: boolean;
}

/**
 * Creates a particle effect in the world.
 * 
 * List of effect banks and names: https://pastebin.com/N9unUFWY
 */
export class ParticleEffect {
	protected readonly asset: ParticleEffectAsset;
	protected readonly effectBank: string;
	protected readonly effectName: string;
	protected offset: Vector3 = Vector3.Zero;
	protected rotation: Vector3 = Vector3.Zero;
	protected position: Vector3 = Vector3.Zero;
	protected color: Color = Color.empty;
	protected scale = 1.0;
	protected range = 1.0;
	protected loop: boolean;
	protected origin: ParticleEffectOrigin;
	protected invertAxis: InvertAxis = { flags: InvertAxisFlags.None };
	private handle: number;

	/**
	 *
	 * Creates a particle effect.
	 *
	 * @param asset Particle effect asset.
	 * @param effectName Name of effect.
	 * @param origin If the particle should stick to a bone or a 3D coordinate.
	 * @param loop If the particle effect should loop.
	 */
	constructor({
		origin = 'position',
		effectName,
		effectBank,
		loop = false,
		scale = 1,
		position = Vector3.Zero,
		rotation = Vector3.Zero,
	}: ParticleEffectArgs) {
		this.handle = -1;
		this.origin = origin;
		this.loop = loop;
		this.effectName = effectName;
		this.effectBank = effectBank;
		this.asset = new ParticleEffectAsset(this.effectBank);
		this.scale = scale;
		this.position = position;
		this.rotation = rotation;
		this.start();
	}

	/**
	 * Get the particle effect handle.
	 */
	public get Handle(): number {
		return this.handle;
	}

	/**
	 * Get whether particle effect is currently active.
	 */
	public get IsActive(): boolean {
		return this.Handle !== -1 && DoesParticleFxLoopedExist(this.Handle);
	}

	public async start() {
		const loaded = await this.asset.request(1000);
		if (!loaded) {
			console.error(`Failed to load particle effect ${this.effectBank}/${this.effectName}`);
			return;
		}

		if (this.loop) {
			// TODO
			if (this.origin === 'position') {
			} else {
			}
		} else {
			if (this.origin === 'position') {
				this.asset.startNonLoopedAtCoord(
					this.effectName,
					this.position,
					this.rotation,
					this.scale,
					this.invertAxis,
				);
			} else {
				// this.asset.startNonLoopedOnEntity()
			}
		}
	}

	/**
	 * Stop a particle effect.
	 */
	public stop(): void {
		if (this.IsActive) {
			RemoveParticleFx(this.Handle, false);
		}
		this.handle = -1;
	}

	/**
	 * Get the rotation of the particle effect.
	 */
	public get Rotation(): Vector3 {
		return this.rotation;
	}

	/**
	 * Set the rotation of the particle effect.
	 */
	public set Rotation(rotation: Vector3) {
		this.rotation = rotation;
		if (this.IsActive) {
			const off = this.offset; // TODO Matrix stuff to access from memory
			SetParticleFxLoopedOffsets(
				this.Handle,
				off.x,
				off.y,
				off.z,
				rotation.x,
				rotation.y,
				rotation.z,
			);
		}
	}

	/**
	 * Get the range of the particle effect.
	 */
	public get Range(): number {
		return this.range;
	}

	/**
	 * Set the range of the particle effect. (looped only)
	 */
	public set Range(range: number) {
		this.range = range;
		SetParticleFxLoopedRange(this.Handle, range);
	}

	/**
	 * Get the invert axis flag of the particle effect.
	 */
	public get InvertAxis(): InvertAxis {
		return this.invertAxis;
	}

	/**
	 * Set the inverted axis of the particle effect.
	 */
	public set InvertAxis(invertAxis: InvertAxis) {
		this.invertAxis = invertAxis;
		if (this.IsActive) {
			this.stop();
			this.start();
		}
	}

	/**
	 * Set a paramaeter of a particle effect.
	 * Only works for looped particle effects.
	 *
	 * @param parameterName Name of parameter.
	 * @param value Value of parameter.
	 */
	public setParameter(parameterName: string, value: number): void {
		if (this.IsActive) {
			SetParticleFxLoopedEvolution(this.Handle, parameterName, value, false);
		}
	}

	/**
	 * Get the name of the particle effect asset. Same as ParticleEffect.AssetName.
	 */
	public get AssetName(): string {
		return this.asset.AssetName;
	}

	/**
	 * Get the name of the particle effect.
	 */
	public get EffectName(): string {
		return this.effectName;
	}

	/**
	 * Return the particle effect as string. `AssetName`\\`EffectName`.
	 */
	public toString(): string {
		return `${this.AssetName}\\${this.EffectName}`;
	}
}
