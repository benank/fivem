export class Event {
    constructor(
        public name: string,
        public callback: Function,
        defaultSubscribe: boolean = false
    ) {
        if (defaultSubscribe) {
            on(this.name, callback);
        }
    }

    public emit(...args: any[]) {
        this.callback(...args);
    }

    public off() {
        Events.off(this.callback);
    }
}

export class Events {
    private static subs: Event[] = [];

    static Events = () => Events;
    
    public static emit(eventName: string, ...args: any[]) {
        this.subs
            .filter((e) => e.name === eventName)
            .forEach((e) => {
                e.emit(...args);
            });
    }

    public static on(
        eventName: string,
        callback: Function,
        defaultSubscribe: boolean = false
    ): Event {
        const event = new Event(eventName, callback, defaultSubscribe);
        this.subs.push(event);
        return event;
    }

    public static off(callback: Function) {
        this.subs = this.subs.filter((e) => e.callback !== callback);
    }
}