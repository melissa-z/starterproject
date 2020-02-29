import { observer } from "mobx-react";
import { NewCollectionStore } from "../../stores/NewCollectionStore";
import "./NodeView.scss";
import { TopBar } from "./node-utils/TopBar";
import { Resize } from "./node-utils/Resize";
import { Close } from "./node-utils/Close";
import React = require("react");
import { NodeCollectionStore } from "../../stores/NodeCollectionStore";
import { FreeFormCanvas } from "../freeformcanvas/FreeFormCanvas";
import { Zoom } from "./node-utils/Zoom";
import { MakeLink } from "./node-utils/MakeLink";
import { Link } from "./node-utils/Link";

interface IProps {
    store: NewCollectionStore;
    collectionStore: NodeCollectionStore;
}

@observer
export class CollectionNodeView extends React.Component<IProps> {
    render() {
        let store = this.props.store;
        let collectionStore = this.props.collectionStore;
        const { Width, Height } = store;

        return (
            <div className="node collection-node"  id="collection"
                style={{
                    transform: store.Transform,
                    width: Width,
                    height: Height 
                }}>
                <div className="links-container">
                    {store.LinkedWith.map(node => {
                        return (<Link 
                            linkedStore={node} 
                            originStore={store} 
                            collectionStore={collectionStore}/>)
                    })}
                </div>
                <div className="content" 
                    style={{ 
                        width: Width,
                        height: Height }} >
                    <FreeFormCanvas store={store} parentCollectionStore={collectionStore}/>
                    <h3 className="title" contentEditable onPointerDown={(e) => e.stopPropagation()}>{store.Title}</h3>
                </div>
                <TopBar store={store} collectionStore={collectionStore} /> {/* add top bar*/}
                <Resize store={store} /> {/* add resize button */}
                <Close store={store} collectionStore={collectionStore} /> {/* add close button */}
                <Zoom store={store} /> {/* add zoom-in & zoom-out */}
                <MakeLink store={store} collectionStore={collectionStore}/> {/* add link button */}
            </div>
        );
    }
}