import React, { Component } from 'react';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
// import htmlToDraft from 'html-to-draftjs';
// import draftToMarkdown from 'draftjs-to-markdown';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

/**
 * ckEditor 2 html and markdown
 */
export default class HtmlEditor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            editorState: EditorState.createEmpty(),
        }
    }

    render() {
        const { editorState } = this.state;
        return (
            <div>
                <Editor
                    editorState={editorState}
                    placeholder="感谢您选择CK~"
                    wrapperClassName="home-wrapper"
                    editorClassName="home-editor"
                    onEditorStateChange={this.onEditorStateChange}
                    localization={{ locale: 'zh', translations: {'generic.add': 'Test-Add'} }}
                />
            </div>  
        );
    }

    /**
     * save html and ck
     */
    onEditorStateChange = (editorState) => {
        this.setState({ editorState });
        let htmlValue = draftToHtml(convertToRaw(editorState.getCurrentContent()));
        this.props.saveHtml(htmlValue);

        // draftToMarkdown(convertToRaw(editorState.getCurrentContent()))
    };
}
