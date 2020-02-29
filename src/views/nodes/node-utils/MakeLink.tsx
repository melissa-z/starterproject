import { observer } from "mobx-react";
import { NodeStore } from "../../../stores/NodeStore";
import "./NodeUtils.scss";
import React = require("react");
import { NodeCollectionStore } from "../../../stores/NodeCollectionStore";

interface IProps {
    store: NodeStore;
    collectionStore: NodeCollectionStore;
}

@observer
export class MakeLink extends React.Component<IProps> {
    //when link button is clicked, call checkLink
    handleClick = (e) => {
        e.stopPropagation();
        e.preventDefault();

        this.props.collectionStore.checkLink(this.props.store);
    }

    render() {
        let store = this.props.store;
        const { LinkButtonColor } = store;
        return <div className="make-link" 
                    style={{backgroundColor: LinkButtonColor}} 
                    onClick={this.handleClick}></div>
    }
}