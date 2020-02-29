import { observer} from "mobx-react";
import { PdfNodeStore } from "../../stores/PdfNodeStore";
import "./NodeView.scss";
import { TopBar } from "./node-utils/TopBar";
import { Resize } from "./node-utils/Resize";
import { Close } from "./node-utils/Close";
import React = require("react");
import { Document, Page } from 'react-pdf';
import { NodeCollectionStore } from "../../stores/NodeCollectionStore";
import { MakeLink } from "./node-utils/MakeLink";
import { Link } from "./node-utils/Link";

interface IProps {
    store: PdfNodeStore;
    collectionStore: NodeCollectionStore;
}

@observer
export class PdfNodeView extends React.Component<IProps> {
    //if document loads, set its total page number and go to page 1
    onDocumentLoadSuccess = ({ numPages }) => {
        this.props.store.numPages = numPages;
        this.props.store.pageNumber = 1;
    }

    //increase current page number by 1
    nextPage = () : void => {
        this.props.store.pageNumber += 1;
    }
    
    //decrease current page number by 1
    previousPage = () : void => {
        this.props.store.pageNumber -= 1;
    }
    
    render() {
        let store = this.props.store;
        let collectionStore = this.props.collectionStore;
        const { Width, Height, pageNumber, numPages } = store;

        return (
            <div className="node pdf-node" 
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
                        <div>
                            <Document
                            className="doc"
                            file='https://arxiv.org/pdf/2002.00983.pdf'
                            onLoadSuccess={this.onDocumentLoadSuccess}
                            >
                                <Page pageNumber={pageNumber} />
                            </Document>
                            <div>
                                <p> Page {pageNumber || (numPages ? 1 : '--')} of {numPages || '--'}</p>
                                <button
                                    type="button"
                                    disabled={pageNumber <= 1}
                                    onClick={this.previousPage}
                                >
                                    Previous
                                </button>
                                <button
                                    type="button"
                                    disabled={pageNumber >= numPages}
                                    onClick={this.nextPage}
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
