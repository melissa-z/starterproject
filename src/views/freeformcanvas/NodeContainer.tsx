import { observer } from "mobx-react";

import { NodeCollectionStore } from "../../stores/NodeCollectionStore";
import { TextNodeStore } from "../../stores/TextNodeStore";
import { VideoNodeStore } from "../../stores/VideoNodeStore";
import { ImageNodeStore } from "../../stores/ImageNodeStore";
import { PdfNodeStore } from "../../stores/PdfNodeStore";
import { WebNodeStore } from "../../stores/WebNodeStore";

import { TextNodeView } from "../nodes/TextNodeView";
import { ImageNodeView } from "../nodes/ImageNodeView";
import { VideoNodeView } from "../nodes/VideoNodeView";
import { PdfNodeView } from "../nodes/PdfNodeView";
import { WebNodeView } from "../nodes/WebNodeView";
import "./FreeFormCanvas.scss";
import React = require("react");
import { NewCollectionStore } from "../../stores/NewCollectionStore";
import { CollectionNodeView } from "../nodes/CollectionNodeView";

interface IProps {
    store: NodeCollectionStore
}

@observer
export class NodeContainer extends React.Component<IProps> {
    render() {
        let store = this.props.store;
        return (
            <div className="node-container">
                {store.Nodes.map(nodeStore => {
                    if (nodeStore instanceof TextNodeStore) {
                        return (<TextNodeView key={nodeStore.Id} store={nodeStore as TextNodeStore} collectionStore={store} />)
                    } else if (nodeStore instanceof VideoNodeStore) {
                        return (<VideoNodeView key={nodeStore.Id} store={nodeStore as VideoNodeStore} collectionStore={store} />)
                    } else if (nodeStore instanceof ImageNodeStore) {
                        return (<ImageNodeView key={nodeStore.Id} store={nodeStore as ImageNodeStore} collectionStore={store} />)
                    } else if (nodeStore instanceof PdfNodeStore) {
                        return (<PdfNodeView key={nodeStore.Id} store={nodeStore as PdfNodeStore} collectionStore={store} />)
                    } else if (nodeStore instanceof WebNodeStore) {
                        return (<WebNodeView key={nodeStore.Id} store={nodeStore as PdfNodeStore} collectionStore={store} />)
                    } else if (nodeStore instanceof NewCollectionStore) {
                        return (<CollectionNodeView key={nodeStore.Id} store={nodeStore as NewCollectionStore} collectionStore={store} />)
                    }
                })}
            </div>
        );
    }
}