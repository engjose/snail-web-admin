import React, {Component} from 'react';
import {
    Card,
    Icon,
    Tag,
    Button,
    Input,
    message,
    notification,
} from 'antd';

import HtmlEditor from '../commonComponents/HtmlEditor';
import MarkDownEditor from '../commonComponents/MarkDownEditor';
import UploadImg from '../commonComponents/UploadImg'

import { $post, $get } from '../../axios/HttpAxios';
import { ACTION_URL } from '../ActionUrl';

const errIcon = <Icon type="frown-o" style={{color:'red'}} />;
export default class ArticleAdd extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isCkEditor: true,
            htmlValue: '',
            tags:[],
            tagsColor: ["#2db7f5", "#f50", "#FB9738", "#34BA71", "#364C77", "#587C0C"],
            editorTitle: 'CK编辑器',
            articleImg: '',
            selectTagId: '',
            selectTagValue:'* * * * *',
        };
    }

    render() {
        const {isCkEditor, editorTitle, selectTagValue, articleImg, tags, tagsColor} = this.state;
        return (
            <div>
                <Card bordered={false} title="文章描述" style={{marginBottom:50}}>
                   <div className="article_attr_out">
                        <div className="article_element">
                            <div className="article_element_tag">
                                请填写文章标题:
                            </div>
                            <Input type="textarea" placeholder="PLEASE INPUT..." rows={6} onChange={this.setTitle} />
                        </div>

                        <div className="article_element">
                            <div className="article_element_tag">
                                请填写文章描述:
                            </div>
                            <Input type="textarea" placeholder="PLEASE INPUT..." rows={6} onChange={this.setDesc} />
                        </div>

                        <div className="article_element">
                            <UploadImg 
                                type = "articleImg" 
                                btnName="上传文章展示图片"
                                action={ACTION_URL.SSO + '/employee/uploadImg'}
                                saveFun = {this.saveImgUrl} 
                            />
                            <div className="article_img_div">
                                <img src={articleImg} className="article_img" />
                            </div>
                        </div>

                        <div className="article_element">
                            <div className="article_element_tag">
                                请选择标签:
                            </div>
                            {
                                this.state.tags.map((record, index) => 
                                    <span onClick={(id, value) => this.handleChangeTag(record.id, record.tagName)} style={{marginTop:10, display:'inline-block'}}>
                                        <Tag key={record.id} color={tagsColor[Math.floor(Math.random() * tagsColor.length + 1)-1]}>{record.tagName}</Tag>
                                    </span>  
                                )
                            }
                            <div style={{marginTop:100}}>
                                已选择标签: <Tag color="#595959">{selectTagValue}</Tag>
                            </div>
                        </div>
                    </div>
                </Card>

                <Card bordered={false} title="编写文章">
                    <div className="article_title_out">
                        <div className="article_title_btn article_title_btn_ck" onClick={() => this.selectEditor(true)}>CK</div>
                        <div className="article_title_btn article_title_btn_mark" onClick={() => this.selectEditor(false)}>Mark</div>
                    </div>

                    <div>
                        <Card title={editorTitle} style={{marginBottom:20, minHeight:500}} bordered={false}>
                            {
                                isCkEditor ? <HtmlEditor saveHtml={this.saveHtml} /> : <MarkDownEditor saveHtml={this.saveHtml} />
                            }
                        </Card>
                    </div>

                    <div className="article_submit_btn">
                        <Button style={{marginRight:10}} onClick={this.preView}>预览</Button>
                        <Button type="primary" onClick={this.createArticle}>发表文章</Button>
                    </div>
                </Card>
            </div>
        );
    }

    componentWillMount() {
        let url = `${ACTION_URL.SHARE}/shareMgr/tags`;
        $get(url, {}, errIcon).then(data => {
            if(data) {
                this.setState({tags: data.data});
            }
        });
    }

    getTags = () => {
        console.log("哈哈");
        return <span>aa</span>
    }

    /**
     * select whate Editor and clear htmlValue
     */
    selectEditor = (isCkEditor) => {
        let title = isCkEditor ? "CK编辑器" : "MarkDown编辑器";
        this.setState({
            htmlValue: '',
            editorTitle: title,
            isCkEditor: isCkEditor,
        });
    }

    saveHtml = (value) => {
        this.setState({htmlValue: value});
    }

    /**
     * 预览文章
     */
    preView = () => {
        console.log(this.state.htmlValue);
    }

    /**
     * 发表文章
     */
    createArticle = () => {
        let url = `${ACTION_URL.SHARE}/shareMgr/articles`;
        let {title, description, articleImg, selectTagId, selectTagValue, htmlValue} = this.state;
        if(title && description && articleImg && selectTagId && selectTagValue && htmlValue) {
            let params = {
                title: title,
                shareIcon: articleImg, 
                shareDesc:description, 
                tagId:selectTagId, 
                tagName:selectTagValue, 
                content:htmlValue,
                userIcon: localStorage.getItem("headUrl"),
            }
            $post(url, params, errIcon).then(data => {
                if(data) {
                    window.location.href = "#/articles/list";
                }
            });
        } else {
            message.warning('文章信息必须完整!');
        }
    }

    /**
     * 消息提示
     *
     * @param type
     * @param title
     * @param message
     */
    showError = (title, message) => {
        notification.open({
            message: title,
            description: message,
            icon: <Icon type="frown-o" style={{ color: 'red' }} />,
        });
    };

    /**
     * save imgUrl for show
     */
    saveImgUrl = (type,url) => {
        console.log(url);
        console.log('url');
        this.setState({ [type]: url })
    }

    setTitle = (e) => {
       this.setState({"title": e.target.value});
    }

    setDesc = (e) => {
        this.setState({"description": e.target.value});
    }

    handleChangeTag = (id, value) => {
        this.setState({ selectTagId: id, selectTagValue: value });
    }
}