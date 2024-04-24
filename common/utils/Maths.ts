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

    public static applyMatrixScale(matrix: Vector3[], scale: Vector3) {
        if (matrix.length !== 4)
            throw Error(`Expected 4 Vectors, got ${matrix.length}`);

        return matrix.map((v, i) => {
            if (i === 0) {
                return v.multiply(scale.x);
            } else if (i === 1) {
                return v.multiply(scale.y);
            } else if (i === 2) {
                return v.multiply(scale.z);
            }

            return v;
        });
    }
}
