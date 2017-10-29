import React, {Component} from 'react';
import 'font-awesome/css/font-awesome.css';
var MarkdownEditor = require('react-markdown-editor').MarkdownEditor;

var Remarkable = require('remarkable');
var md = new Remarkable();

export default class MarkDownEditor extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            markdownValue: '',
        };
    }
    render(){
        const style = {
            styleMarkdownTextArea: {
                height: 400,
            },
            styleMarkdownPreviewArea: {
                height: 400,
            }
          };
      
        return (
            <div>
                <MarkdownEditor 
                initialContent="" 
                iconsSet="font-awesome" 
                onContentChange={this.setValue}
                styles = {style}
                />
            </div>

        );
    }

    /**
     * save html and markdown
     */
    setValue = (value) => {
        this.setState({markdownValue: value});
        this.props.saveHtml(md.render(value));
    }
}