import { computed, observable, action } from "mobx";
import { Utils } from "../Utils";

export class NodeStore {

    public Id: string = Utils.GenerateGuid();

    @observable
    public Color = Utils.getRandomColor();

    @observable
    public X: number = 0;

    @observable
    public Y: number = 0;

    @observable
    public Width: number = 300;

    @observable
    public Height: number = 300;

    @observable
    public prevPos = [];

    @computed
    public get Transform(): string {
        return "translate(" + this.X + "px, " + this.Y + "px)";
    }
    
    @observable
    public IsSelected: boolean = false;

    //get background color of the link button (highlighted if node is selected)
    @computed
    public get LinkButtonColor(): string {
        return this.IsSelected ? "#31595e" : null;
    }

    //list of all nodes linked with this node
    @observable
    public LinkedWith: NodeStore[] = [];

    //check if given node is already linked with this node
    @observable
    public IsLinkedWith = (newNode: NodeStore) : boolean => {
        let found = false;
        this.LinkedWith.forEach(node => {
            if (node.Id === newNode.Id) {
                found = true;
            }
        });
        return found;
    }
}