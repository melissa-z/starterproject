import { observer } from "mobx-react";
import { NodeCollectionStore } from './stores/NodeCollectionStore';
import React = require("react");
import { ClearAll } from "./ClearAll";
import { NewCollectionStore } from "./stores/NewCollectionStore";
import { PdfNodeStore } from "./stores/PdfNodeStore";
import { WebNodeStore } from "./stores/WebNodeStore";
import { VideoNodeStore } from "./stores/VideoNodeStore";
import { TextNodeStore } from "./stores/TextNodeStore";
import { ImageNodeStore } from "./stores/ImageNodeStore";

interface IProps {
    store: NodeCollectionStore
}

@observer
export class AddNode extends React.Component<IProps> {

    //Default X and Y positions of the first new node
    xPos = 50;
    yPos = 50;

    //When clicked, add a new node offset by 15px right and down from the 
    //previous new node
    handleClick = (type: String) : void => {
        if(this.yPos < 400) {
            this.xPos += 15;
            this.yPos += 15;
        } else {
            this.xPos = 50;
            this.yPos = 50;
        }

        let newNode;
        if (type === "image") {
            newNode = new ImageNodeStore({ X: this.xPos, Y: this.yPos, Title: "Image Node Title", Url: "https://i.pinimg.com/originals/7b/c1/62/7bc1622fc2cdca0e21ddebd3d460c55c.png" });
        } else if (type === "text") {
            newNode = new TextNodeStore({ X: this.xPos, Y: this.yPos, Title: "Text Node Title", Text: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"});
        } else if (type === "video") {
            newNode = new VideoNodeStore({ X: this.xPos, Y: this.yPos, Title: "Video Node Title",  Url: "http://cs.brown.edu/people/peichman/downloads/cted.mp4" });
        } else if (type === "web") {
            newNode = new WebNodeStore({ X: this.xPos, Y: this.yPos, Title: "Web Node Title", Url: "https://www.nytimes.com/" });
        } else if (type === "pdf") {
            newNode = new PdfNodeStore({ X: this.xPos, Y: this.yPos, Title: "PDF Node Title", Url: "https://i.pinimg.com/originals/22/27/c0/2227c0567796bde1273dc37874ebcea2.png" });
        }  else if (type === "collection") {
            newNode = new NewCollectionStore({ X: this.xPos, Y: this.yPos, Title: "Collection Node Title" });
        }

        this.props.store.AddNodes([newNode]);
    }

    //tell handleclick what type the new node is
    //text
    handleText = (e: React.MouseEvent) : void => {
        e.preventDefault();
        this.handleClick("text");
    }
    //image
    handleImage = (e: React.MouseEvent) : void => {
        e.preventDefault();
        this.handleClick("image");
    }
    //video
    handleVideo = (e: React.MouseEvent) : void => {
        e.preventDefault();
        this.handleClick("video");
    }
    //web
    handleWeb = (e: React.MouseEvent) : void => {
        e.preventDefault();
        this.handleClick("web");
    }
    //pdf
    handlePdf = (e: React.MouseEvent) : void => {
        e.preventDefault();
        this.handleClick("pdf");
    }
    //collection
    handleCollection = (e: React.MouseEvent) : void => {
        e.preventDefault();
        this.handleClick("collection");
    }

    render() {
        return ( 
            <div className="buttons" onClick={() => console.log("BUTTONS!")}>
                <div className="button add-collection" onClick={this.handleCollection}>
                    + collection
                </div>
                <div className="button add-image" onClick={this.handleImage}>
                    + image
                </div>
                <div className="button add-text" onClick={this.handleText}>
                    + text
                </div>
                <div className="button add-video" onClick={this.handleVideo}>
                    + video
                </div>
                <div className="button add-web" onClick={this.handleWeb}>
                    + web
                </div>
                <div className="button add-pdf" onClick={this.handlePdf}>
                    + pdf
                </div>
            </div>
        )
    }
}