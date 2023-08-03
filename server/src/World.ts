import { Ped, Prop, Vehicle } from "./entities";

export abstract class World {

    /**
     * Get an iterable list of vehicles currently on the server.
     * @returns Iterable list of Vehicle objects.
     */
    public static *getAllVehicles(): IterableIterator<Vehicle> {
        for (const id of GetAllVehicles() as unknown as number[]) {
            yield new Vehicle(id);
        }
    }
    
    /**
     * Get an iterable list of props currently on the server.
     * @returns Iterable list of Prop objects.
     */
    public static *getAllPeds(): IterableIterator<Ped> {
        for (const id of GetAllPeds() as unknown as number[]) {
            yield new Ped(id);
        }
    }
    
    /**
     * Get an iterable list of props currently on the server.
     * @returns Iterable list of Prop objects.
     */
    public static *getAllProps(): IterableIterator<Prop> {
        for (const id of GetAllObjects() as unknown as number[]) {
            yield new Prop(id);
        }
    }

}