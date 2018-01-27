export class Queue<T> {
    private _store: Array<T>;
    constructor() {
        this._store = [];
    }

    public enqueue(val: T) {
        this._store.push(val);
    }

    public dequeue(): T | undefined {
        return this._store.shift();
    }

    public toArray(): Array<T> {
        return this._store;
    }

    public clear() {
        this._store = [];
    }

    public isEmpty(): boolean {
        return this.length < 1;
    }

    get length() {
        return this._store.length;
    }
}