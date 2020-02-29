import { observer } from "mobx-react";
import { NodeCollectionStore } from "../../stores/NodeCollectionStore";
import "./FreeFormCanvas.scss";
import { NodeContainer } from "./NodeContainer";
import React = require("react");
import { AddNode } from "../../AddNode";
import { ClearAll } from "../../ClearAll";

interface IProps {
    store: NodeCollectionStore
    parentCollectionStore?: NodeCollectionStore;
}

@observer
export class FreeFormCanvas extends React.Component<IProps> {

    private _isPointerDown: boolean;

    onPointerDown = (e: React.PointerEvent): void => {
        e.stopPropagation();
        e.preventDefault();
        this._isPointerDown = true;
        document.removeEventListener("pointermove", this.onPointerMove);
        document.addEventListener("pointermove", this.onPointerMove);
        document.removeEventListener("pointerup", this.onPointerUp);
        document.addEventListener("pointerup", this.onPointerUp);
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
        if (this.props.store.isTopLevel) { 
            this.props.store.X += e.movementX;
            this.props.store.Y += e.movementY;
        } else {
            this.props.store.innerX += e.movementX;
            this.props.store.innerY += e.movementY;
        }
    }

    store = this.props.store;

    //if this canvas is not the top level, use InnerTransform
    getTransform = () : string => {
        if (this.store.isTopLevel) {
            return this.store.Transform;
        } else {
            return this.store.InnerTransform;
        } 
    }

    //if this canvas has a parent store, use GridTransform
    getGridTransform = () : string => {
        let hasParent = this.props.parentCollectionStore !== undefined;
        return hasParent ? this.store.GridTransform : this.store.Transform;
    }

    render() {
        let store = this.props.store;

        //if in grid view, remove add node buttons, and prevent transformation
        if (store.GridView) {
            return (
                <div className="freeformcanvas-container" onPointerDown={this.onPointerDown}>
                    <div className="freeformcanvas" style={{ transform: this.getGridTransform() }}>
                        <NodeContainer store={store} />
                    </div>
                </div>
            );
        } else {
            return (
                <div className="freeformcanvas-container" onPointerDown={this.onPointerDown}>
                    <AddNode store={store} />
                    <ClearAll store={store} />
                    <div className="freeformcanvas" 
                        style={{ transform: this.getTransform() }}>
                        <NodeContainer store={store} />
                    </div>
                </div>
            );
        }
    }
}