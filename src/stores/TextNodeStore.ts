import { observable } from "mobx";
import { NodeStore } from "./NodeStore";

export class TextNodeStore extends NodeStore {

    constructor(initializer: Partial<TextNodeStore>) {
        super();
        Object.assign(this, initializer);
    }

    @observable
    public Title: string = "";

    @observable
    public Text: string = "";
}