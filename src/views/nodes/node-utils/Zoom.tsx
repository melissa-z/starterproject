import { observer} from "mobx-react";
import { NewCollectionStore } from "../../../stores/NewCollectionStore";
import "./NodeUtils.scss";
import React = require("react");
import { CollectionNodeView } from "../CollectionNodeView";

interface IProps {
    store: NewCollectionStore;
}

@observer
export class Zoom extends React.Component<IProps> {
    storedPos = [];

    //zoom into the node
    zoomIn = (e: React.MouseEvent) : void => {
        e.preventDefault();
        this.props.store.Scale += 0.02;
    }

    //zoom out of the node
    zoomOut = (e: React.MouseEvent) : void => {
        e.preventDefault();
        this.props.store.Scale -= 0.02;
    }

    render() {
        return (
            <div>
                <div className="zoom-in" onClick={this.zoomIn}>+</div>
                <div className="zoom-out" onClick={this.zoomOut}>-</div>
            </div>
        )
    }
}