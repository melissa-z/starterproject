import { observable } from "mobx";
import { NodeStore } from "./NodeStore";

export class PdfNodeStore extends NodeStore {

    constructor(initializer: Partial<PdfNodeStore>) {
        super();
        Object.assign(this, initializer);
    }

    @observable
    public Title: string;

    @observable
    public Url: string;

    @observable
    public pageNumber: number;

    @observable
    public numPages: number;

}