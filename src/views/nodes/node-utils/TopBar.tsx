import { observer } from "mobx-react";
import { NodeStore } from "../../../stores/NodeStore";
import "../NodeView.scss";
import React = require("react");
import { NodeCollectionStore } from "../../../stores/NodeCollectionStore";
import { element } from "prop-types";

interface IProps {
    store: NodeStore;
    collectionStore: NodeCollectionStore;
}

@observer
export class TopBar extends React.Component<IProps> {
    private _isPointerDown = false;

    onPointerDown = (e: React.PointerEvent): void => {
        e.stopPropagation();
        e.preventDefault();
        if (!this.props.collectionStore.GridView) {
            this._isPointerDown = true;
            document.removeEventListener("pointermove", this.onPointerMove);
            document.addEventListener("pointermove", this.onPointerMove);
            document.removeEventListener("pointerup", this.onPointerUp);
            document.addEventListener("pointerup", this.onPointerUp);
        }
        this.props.collectionStore.ReRender(this.props.store);
    }

    onPointerUp = (e: PointerEvent): void => {
        e.stopPropagation();
        e.preventDefault();
        this._isPointerDown = false;
        document.removeEventListener("pointermove", this.onPointerMove);
        document.removeEventListener("pointerup", this.onPointerUp);
    }

    onPointerMove = (e: PointerEvent): void => {
        e.stopPropagation();
        e.preventDefault();
        if (!this._isPointerDown) {
            return;
        }
        this.props.store.X += e.movementX;
        this.props.store.Y += e.movementY;
    }

    render() {
        let store = this.props.store;
        const { Color } = store;
        return <div className="top" style={{backgroundColor: Color}} onPointerDown={this.onPointerDown}></div>
    }
}
