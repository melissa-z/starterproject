import * as React from 'react';
import * as ReactDOM from 'react-dom';
import "./Main.scss";
import { NodeCollectionStore } from './stores/NodeCollectionStore';
import { RootStore } from './stores/RootStore';
import { TextNodeStore } from './stores/TextNodeStore';
import { VideoNodeStore } from './stores/VideoNodeStore';
import { ImageNodeStore } from './stores/ImageNodeStore';
import { PdfNodeStore } from './stores/PdfNodeStore';
import { WebNodeStore } from './stores/WebNodeStore';
import { FreeFormCanvas } from './views/freeformcanvas/FreeFormCanvas';
import { NewCollectionStore } from './stores/NewCollectionStore';
import { Utils } from './Utils';

const mainNodeCollection = new NodeCollectionStore();

//add a variety of nodes by default
let node1 = new ImageNodeStore({ X: 150, Y: 150, Title: "Image Node Title", Url: "https://i.pinimg.com/originals/7b/c1/62/7bc1622fc2cdca0e21ddebd3d460c55c.png" });
let node2 = new TextNodeStore({ X: 500, Y: 150, Title: "Text Node Title", Text: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"});
let node3 = new VideoNodeStore({ X: 850, Y: 150, Title: "Video Node Title", Url: "http://cs.brown.edu/people/peichman/downloads/cted.mp4" });
let node4 = new PdfNodeStore({ X: 150, Y: 500, Title: "PDF Node Title", Url: "https://i.pinimg.com/originals/22/27/c0/2227c0567796bde1273dc37874ebcea2.png" });
let node5 = new WebNodeStore({ X: 500, Y: 500, Title: "Web Node Title", Url: "https://www.nytimes.com/" });
let node6 = new NewCollectionStore({ X: 850, Y: 500, Title: "Collection Node Title" });
let defaultNodes = [node1, node2, node3, node4, node5, node6];

mainNodeCollection.isTopLevel = true;
mainNodeCollection.AddNodes(defaultNodes);

//handle click to change grid view on or off
let handleViewChange = (e: React.MouseEvent) => {
    e.preventDefault;
    if(!mainNodeCollection.GridView) {
        mainNodeCollection.GridView = true;
        gridOn();
    } else {
        mainNodeCollection.GridView = false;
        gridOff();
    }
}

//restore nodes to previous position
let gridOff = () => {
    mainNodeCollection.Nodes.forEach(n => {
        n.X = n.prevPos[0];
        n.Y = n.prevPos[1]
        n.Width = n.prevPos[2];
        n.Height = n.prevPos[3];
        if(n instanceof NewCollectionStore) {
            collectionGridOff(n);
        }
    });
}

//arrange nodes into a grid
let gridOn = () => {
    //store original positions and size
    mainNodeCollection.Nodes.forEach(n => {
        n.prevPos = [n.X, n.Y, n.Width, n.Height];
    });

    let setX = 20; //default X
    let setY = 40; //default Y
    
    //compute how many nodes at least 200px wide can fit onto screen
    let totalNodes = mainNodeCollection.Nodes.length;
    let nPerRow = Math.floor(window.innerWidth/310);

    //set new positions
    if(totalNodes <= nPerRow) { //if nodes all fit into 1 row, space them out evenly
        let width = (window.innerWidth - (totalNodes*10))/totalNodes;
        let height = window.innerHeight - 40;

        mainNodeCollection.Nodes.forEach(n => {
            n.Width = width;
            n.Height = height;
            n.X = setX;
            n.Y = setY;
            setX += n.Width + 10;
            if(n instanceof NewCollectionStore) {
                collectionGridOn(n);
            }
        });
    } else {
        //calculate width and height
        let width = (window.innerWidth - (nPerRow*10))/nPerRow;
        let height = width; 
        let count = 1; 

        mainNodeCollection.Nodes.forEach(n => {
            n.Width = width;
            n.Height = height;   
            n.X = setX;
            n.Y = setY;
            if(count == nPerRow) {
            //if at the end of row, reset count and X-position
                setX = 20;
                setY += (height + 10);
                count = 1;
            } else { 
            //space out nodes in a row
                setX += n.Width + 10;
                count++;
            }  
            if(n instanceof NewCollectionStore) {
                collectionGridOn(n);
            }
        });
    }
}

//turn grid view on in collection nodes
export const collectionGridOn = (parent: NewCollectionStore) => {
    parent.GridView = true;
    
    //store previous scale and reset scale to 1
    parent.prevPos.push(parent.Scale);
    parent.Scale = 1;

    let x = 0;
    let y = 0;
    let count = 1;
    
    parent.Nodes.forEach(n => {
        //store previous position & scale
        if (n.prevPos == []) {
            n.prevPos = [n.X, n.Y, n.Width, n.Height];
        }
        
        if(parent.Nodes.length <= 4) {
        //if there are 4 or less nodes in collection, divide space into quarters
            n.Width = parent.Width/2 - 10;
            n.Height = parent.Height/2 - 10;
            n.X = x;
            n.Y = y; 
            if(count == 2){
                x = 0;
                y += (n.Height + 5);
                count = 1;
            } else {
                x += (n.Width + 5);
                count++;
            }
        } else {
        //if there >4 nodes in collection, divide space into 3 nodes per row
            n.Width = n.Height = parent.Width/3 - 15;
            n.X = x;
            n.Y = y; 
            if(count == 3){
                x = 0;
                y += (n.Height + 5);
                count = 1;
            } else {
                x += (n.Width + 5);
                count++;
            }
        }

        //repeat for children nodes
        if(n instanceof NewCollectionStore) {
            collectionGridOn(n);
        }   
    });
}

//turn of grid view, return nodes to previous position
export const collectionGridOff = (parent: NewCollectionStore) => {
    parent.GridView = false;
    parent.Scale = parent.prevPos[4];

    parent.Nodes.forEach(n => {
        n.X = n.prevPos[0];
        n.Y = n.prevPos[1]
        n.Width = n.prevPos[2];
        n.Height = n.prevPos[3];
        n.prevPos = [];
        console.log(n instanceof NewCollectionStore);
        if(n instanceof NewCollectionStore) {
            collectionGridOff(n);
        }
    });
}

ReactDOM.render((
    <div>
        <h1 style={{color: Utils.getRandomColor()}}>
            Dash Web
        </h1>      
        <FreeFormCanvas store={mainNodeCollection} />
        <button className="change-view" onClick={handleViewChange}>grid view </button>
    </div>), document.getElementById('root'));