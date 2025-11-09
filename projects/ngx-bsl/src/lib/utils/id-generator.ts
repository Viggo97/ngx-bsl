export class IdGenerator {
    private id = 0;

    nextId(): number {
        return this.id++;
    }
}
