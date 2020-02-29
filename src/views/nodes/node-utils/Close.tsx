import { observer } from "mobx-react";
import { NodeStore } from "../../../stores/NodeStore";
import "./NodeUtils.scss";import React = require("react");
import { NodeCollectionStore } from "../../../stores/NodeCollectionStore";

interface IProps {
    store: NodeStore;
    collectionStore: NodeCollectionStore;
}

@observer
export class Close extends React.Component<IProps> {
    
    //when clicked, remove node from store
    handleClick = (e: React.MouseEvent) : void => {
        e.preventDefault();
        this.props.collectionStore.RemoveNode(this.props.store.Id);
    }

    render() {
        return <div className="close" onClick={this.handleClick}></div>
    }
}