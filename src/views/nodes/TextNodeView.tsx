import { observer } from "mobx-react";
import { TextNodeStore } from "../../stores/TextNodeStore";
import "./NodeView.scss";
import { TopBar } from "./node-utils/TopBar";
import { Resize } from "./node-utils/Resize";
import { Close } from "./node-utils/Close";
import { TextEditor } from "./node-utils/TextEditor";
import React = require("react"); // import Quill text editor
import { NodeCollectionStore } from "../../stores/NodeCollectionStore";
import { MakeLink } from "./node-utils/MakeLink";
import { Link } from "./node-utils/Link";

<html>
    <link rel="stylesheet" href="//cdn.quilljs.com/1.2.6/quill.snow.css"></link>
</html>

interface IProps {
    store: TextNodeStore;
    collectionStore: NodeCollectionStore;
}

@observer
export class TextNodeView extends React.Component<IProps> {

    render() {
        let store = this.props.store;
        let collectionStore = this.props.collectionStore;
        const { Width, Height } = store;
        
        return (
            <div className="node text-node" 
                style={{ 
                    transform: store.Transform,
                    width: Width,
                    height: Height 
                }}>
                <TopBar store={store} collectionStore={collectionStore} /> {/* add top bar*/}
                <Resize store={store} /> {/* add resize button */}
                <Close store={store} collectionStore={collectionStore}/> {/* add close button */}
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
                        <TextEditor store={store} />
                    </div>
                </div>
            </div>
        );
    }
}