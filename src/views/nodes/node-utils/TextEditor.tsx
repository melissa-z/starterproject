import { observer } from "mobx-react";
import { TextNodeStore } from "../../../stores/TextNodeStore";
import "./NodeUtils.scss";
import React = require("react");
//import * as ReactQuill from "react-quill"; // import Quill text editor
import ReactQuill, {Quill} from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // ES6
{/* <link rel="stylesheet" href="//cdn.quilljs.com/1.2.6/quill.snow.css"></link> */}

interface IProps {
    store: TextNodeStore;
}

@observer
export class TextEditor extends React.Component<IProps> {
    //change text value
    handleChange = (value) => {
      this.props.store.Text = value;
    }
  
    render() {
      const { Text } = this.props.store;
      return (
        <div className="text-editor">
          <ReactQuill theme="snow"
                      value={ Text }
                      onChange={this.handleChange}/>   
        </div>
      )
    }
  }