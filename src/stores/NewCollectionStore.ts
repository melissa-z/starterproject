import { computed, observable, action } from "mobx";
import { NodeStore } from "./NodeStore";
import { Utils } from "../Utils";

export class NewCollectionStore extends NodeStore {
    constructor(initializer: Partial<NewCollectionStore>) {
        super();
        Object.assign(this, initializer);
    }

    @observable
    public Width: number = 450;

    @observable
    public Height: number = 300;

    @observable
    public Scale: number = 1;

    @observable
    public Nodes: NodeStore[] = new Array<NodeStore>();

    @observable
    public GridView: boolean = false;

    @computed
    public get Transform(): string {
        return "translate(" + this.X + "px," + this.Y + "px) scale(" + this.Scale + "," + this.Scale + ")";
    }

    //when in grid view, prevent transformation of nodes
    @computed
    public get GridTransform(): string {
        return "translate(0px,0px) scale(" + this.Scale + "," + this.Scale + ")";
    }
    
    //add nodes to the store
    @action
    public AddNodes(stores: NodeStore[]): void {
        stores.forEach(store => this.Nodes.push(store));
    }

    //remove given node from collection
    @action
    public RemoveNode(targetID: string) : void {
        var i;
        for (i = 0; i < this.Nodes.length; i++) {
            var id = this.Nodes[i].Id;
            if (id === targetID) {
                this.Nodes.splice(i, 1);
            }
        }

        //remove any links to the deleted node
        this.Nodes.forEach(node => {
            var i;
            for (i = 0; i < node.LinkedWith.length; i++) {
                var id = node.LinkedWith[i].Id;
                if (id === targetID) {
                    node.LinkedWith.splice(i, 1);
                }
            }
        });
    }

    //re-render node so that it is above other nodes
    @action
    public ReRender(node : NodeStore) : void {
        //remove node from collection
        var i;
        for (i = 0; i < this.Nodes.length; i++) {
            var id = this.Nodes[i].Id;
            if (id === node.Id) {
                this.Nodes.splice(i, 1);
            }
        }

        //add node to collection again
        this.AddNodes([node]);
    }

    //list of pairs of linked nodes
    @observable
    public linkedNodes: NodeStore[][] = [];

    //currently selected node to be linked
    @observable
    public selectedNode: NodeStore = null;

    //if 2 distinct nodes are both selected, link them
    //if same node was selected twice, un-select it
    //if 1 node is selected, set it as selectedNode
    @action
    public checkLink = (node: NodeStore) : void => {
        if (this.selectedNode != null) { 
        //if another node has also been selected
            if (this.selectedNode.Id === node.Id){
            //if the same node was selected twice, then unselect
                node.IsSelected = false;
                this.selectedNode = null;
                console.log("same node selected twice, unselected");
            } else {
            //make link and unselect previously selected node
                this.makeLink(this.selectedNode, node)
                this.selectedNode.IsSelected = false;
                this.selectedNode = null; 
            }
        } else { 
        //if no other node is selected, store this one
            node.IsSelected = true;
            this.selectedNode = node;
            console.log("1 node selected");
        }
    }

    //make link between two nodes
    @action
    public makeLink = (node1: NodeStore, node2: NodeStore) : void => {
        if (!node1.IsLinkedWith(node2)) {
            this.linkedNodes.push([node1, node2]);
            node1.LinkedWith.push(node2);
            node2.LinkedWith.push(node1);
            console.log("link success!", this.linkedNodes);
        } else {
            console.log("these 2 alreayd linked :(");
        }
    }

    @observable
    public isTopLevel = false;

    @observable
    public Title: string;

    @observable
    public innerX: number = 0;

    @observable
    public innerY: number = 0;

    @computed
    public get InnerTransform(): string {
        return "translate(" + this.innerX + "px," + this.innerY + "px) scale(" + this.Scale + "," + this.Scale + ")";
    }
}