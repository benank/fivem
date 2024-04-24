import { Vector3 } from "./Vector3";

export abstract class Maths {
	public static clamp(num: number, min: number, max: number): number {
		return num <= min ? min : num >= max ? max : num;
	}

	public static getRandomInt(min: number, max: number): number {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min)) + min;
	}
	
	public static applyMatrixScale(matrix: Vector3[], scale: number) {
		if (matrix.length !== 4) throw Error(`Expected 4 Vectors, got ${matrix.length}`);

		return matrix.map((v, i) => (i < 3 ? v.multiply(scale) : v));
	}
}
