import { observer } from "mobx-react";
import { WebNodeStore } from "../../stores/WebNodeStore";
import "./NodeView.scss";
import { TopBar } from "./node-utils/TopBar";
import { Resize } from "./node-utils/Resize";
import { Close } from "./node-utils/Close";
import React = require("react");
import { NodeCollectionStore } from "../../stores/NodeCollectionStore";
import { MakeLink } from "./node-utils/MakeLink";
import { Link } from "./node-utils/Link";

interface IProps {
    store: WebNodeStore;
    collectionStore: NodeCollectionStore;
}

@observer
export class WebNodeView extends React.Component<IProps> {

    render() {
        let store = this.props.store;
        let collectionStore = this.props.collectionStore;
        const { Width, Height } = store;
        
        return (
            <div className="node website-node" 
                style={{
                    transform: store.Transform,
                    width: Width,
                    height: Height 
                }}>
                <TopBar store={store} collectionStore={collectionStore} /> {/* add top bar*/}
                <Resize store={store} /> {/* add resize button */}
                <Close store={store} collectionStore={collectionStore} /> {/* add close button */}
                <MakeLink store={store} collectionStore={collectionStore}/> {/* add link button */}
                <div className="links-container">
                    {store.LinkedWith.map(node => {
                        return (<Link 
                            linkedStore={node} 
                            originStore={store} 
                            collectionStore={collectionStore}/>)
                    })}
                </div>
                <div className="scroll-box">
                    <div className="content">
                        <h3 className="title" contentEditable onPointerDown={(e) => e.stopPropagation()}>{store.Title}</h3>
                        <div className="iframe-container">
                            <iframe src={store.Url}></iframe>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}