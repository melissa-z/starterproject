import { observer } from "mobx-react";
import { VideoNodeStore } from "../../stores/VideoNodeStore";
import "./NodeView.scss";
import { TopBar } from "./node-utils/TopBar";
import { Resize } from "./node-utils/Resize";
import { Close } from "./node-utils/Close";
import React = require("react");
import { NodeCollectionStore } from "../../stores/NodeCollectionStore";
import { MakeLink } from "./node-utils/MakeLink";
import { Link } from "./node-utils/Link";

interface IProps {
    store: VideoNodeStore;
    collectionStore: NodeCollectionStore;
}

@observer
export class VideoNodeView extends React.Component<IProps> {

    render() {
        let store = this.props.store;
        let collectionStore = this.props.collectionStore;
        const { Width, Height } = store;
        
        return (
            <div className="node video-node" 
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
                        <video src={store.Url} controls />
                    </div>
                </div>
            </div>
        );
    }
}