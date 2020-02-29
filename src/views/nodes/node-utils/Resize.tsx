import { observer } from "mobx-react";
import { NodeStore } from "../../../stores/NodeStore";
import "./NodeUtils.scss";
import React = require("react");

interface IProps {
    store: NodeStore;
}

@observer
export class Resize extends React.Component<IProps> {

    private _isPointerDown = false;

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

        // Resize width and height of node based on horizontal and vertical 
        // cursor movement, to a minimize size of 20px x 20px
        if (this.props.store.Width > 20) {
            this.props.store.Width += e.movementX; 
        } else {
            this.props.store.Width += 1;
        }
        
        if (this.props.store.Height > 20) {
            this.props.store.Height += e.movementY; 
        } else {
            this.props.store.Height += 1;
        }
    }

    render() {
        return <div className="resize" onPointerDown={this.onPointerDown}></div>
    }
}