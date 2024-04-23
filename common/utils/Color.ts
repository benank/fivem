export class Color {
    public static fromArgb(a: number, r: number, g: number, b: number): Color {
        return new Color(r, g, b, a);
    }

    public static fromRgb(r: number, g: number, b: number): Color {
        return new Color(r, g, b);
    }

    public static fromArray(
        primitive: [number, number, number] | number[]
    ): Color {
        return new Color(primitive[0], primitive[1], primitive[2], 255);
    }

    public a: number;
    public r: number;
    public g: number;
    public b: number;

    constructor(r: number, g: number, b: number, a = 255) {
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
    }
}

export class ConsoleColor {
    static get Red() {
        return "^1";
    }

    static get Green() {
        return "^2";
    }

    static get Yellow() {
        return "^3";
    }

    static get Blue() {
        return "^4";
    }

    static get LightBlue() {
        return "^5";
    }

    static get Purple() {
        return "^6";
    }

    static get Default() {
        return "^7";
    }

    static get DarkRed() {
        return "^8";
    }

    static get Fuchsia() {
        return "^9";
    }

    static get White() {
        return "^0";
    }
}
