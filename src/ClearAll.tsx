import { observer } from "mobx-react";
import { NodeCollectionStore } from './stores/NodeCollectionStore';
import React = require("react");
import { observable } from "mobx";

interface IProps {
    store: NodeCollectionStore
}

@observer
export class ClearAll extends React.Component<IProps> {
       
    //when clicked, remove all nodes from the store
    @observable
    public handleClick = (e: React.MouseEvent) : void => {
        e.preventDefault();
        this.props.store.Nodes = [];
    }

    render() {
        return ( 
            <div className="clear-all" onClick={this.handleClick}>
                clear
            </div>
        )
    }
}