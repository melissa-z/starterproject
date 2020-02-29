import { observer } from "mobx-react";
import { NodeStore } from "../../../stores/NodeStore";
import { NodeCollectionStore } from "../../../stores/NodeCollectionStore";
import "./NodeUtils.scss";
import React = require("react");

interface IProps {
    linkedStore: NodeStore;
    originStore: NodeStore;
    collectionStore: NodeCollectionStore;
}

@observer
export class Link extends React.Component<IProps> {
    //follow link by bringing the linked node to the current node
    followLink = (e) => {
        e.stopPropagation();
        e.preventDefault();

        if(!this.props.collectionStore.GridView) {
            //bring linked node to current node
            this.props.linkedStore.X = this.props.originStore.X + 80;
            this.props.linkedStore.Y = this.props.originStore.Y + 80;

            //reposition linked node so that it's on top of the current node
            this.props.collectionStore.ReRender(this.props.linkedStore);
        }
    }

    render() {
        return (
            <div 
                className="link" 
                style={{backgroundColor: this.props.linkedStore.Color}} 
                onClick={this.followLink}>
            </div>
        )
    }
}