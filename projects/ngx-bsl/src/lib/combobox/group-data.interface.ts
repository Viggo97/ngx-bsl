export class GroupData<T> {
    group: string;
    data: T[];

    constructor(group: string, data: T[]) {
        this.group = group;
        this.data = data;
    }
}
