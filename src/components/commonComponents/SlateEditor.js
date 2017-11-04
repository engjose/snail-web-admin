import React, {Component} from 'react'
import { Editor } from 'slate-react'
import { State } from 'slate'

const initialState = State.fromJSON({
  document: {
    nodes: [
      {
        kind: 'block',
        type: 'paragraph',
        nodes: [
          {
            kind: 'text',
            ranges: [
              {
                text: 'A line of text in a paragraph.'
              }
            ]
          }
        ]
      }
    ]
  }
})

function CodeNode(props) {
    return <pre {...props.attributes}><code>{props.children}</code></pre>
}

export default class SlateEditor extends Component {
  state = {
    state: initialState,
    schema: {
      marks: {
        bold: props => <strong>{props.children}</strong>
      }
    }
  }

    // 发生变更时，使用新的编辑器状态更新应用的 React 状态。
    onChange = ({ state }) => {
      this.setState({ state })
    }

    onKeyDown = (event, change, data) => {
      //ctrl + shift + c
      if (event.which != 67 || !event.metaKey || !event.altKey){
          return;
    }

    function BoldMark(props) {
      return <strong>{props.children}</strong>
    }

    event.preventDefault()
    // change.insertText('and')

    // 判断当前选中 block 是否为代码块。
    const isCode = change.state.blocks.some(block => block.type == 'code')
    // 根据 `isCode` 设置 block 类型。
    change.setBlock(isCode ? 'paragraph' : 'code')
    return true;
  }

  // 渲染编辑器。
  render() {
    return (
      <Editor
        schema={this.state.schema}
        state={this.state.state}
        onChange={this.onChange}
        onKeyDown={this.onKeyDown}
      />
    )
  }

}