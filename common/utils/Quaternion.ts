import { Vector3 } from "./Vector3";

export class Quaternion {
    public static Identity = new Quaternion(Vector3.Zero, 1);
    public x: number;
    public y: number;
    public z: number;
    public w: number;

    constructor(value: number);
    constructor(vector: Vector3, w: number);
    constructor(x: number, y: number, z: number, w: number);
    constructor(
        valueXOrVector: number | Vector3,
        yOrW?: number,
        z?: number,
        w?: number
    ) {
        if (valueXOrVector instanceof Vector3) {
            this.x = valueXOrVector.x;
            this.y = valueXOrVector.y;
            this.z = valueXOrVector.z;
            this.w = yOrW ?? 0;
        } else if (yOrW === undefined) {
            this.x = valueXOrVector;
            this.y = valueXOrVector;
            this.z = valueXOrVector;
            this.w = valueXOrVector;
        } else {
            this.x = valueXOrVector;
            this.y = yOrW;
            this.z = z ?? 0;
            this.w = w ?? 0;
        }
    }

    public get inverted(): Quaternion {
        const magnitudeSquared =
            this.x * this.x +
            this.y * this.y +
            this.z * this.z +
            this.w * this.w;

        // Check if the quaternion is not a zero quaternion
        if (magnitudeSquared !== 0) {
            const conjugate = {
                x: -this.x,
                y: -this.y,
                z: -this.z,
                w: this.w,
            };

            const invertedMagnitudeSquared = 1 / magnitudeSquared;

            return new Quaternion(
                conjugate.x * invertedMagnitudeSquared,
                conjugate.y * invertedMagnitudeSquared,
                conjugate.z * invertedMagnitudeSquared,
                conjugate.w * invertedMagnitudeSquared
            );
        } else {
            return Quaternion.Identity;
        }
    }
}
