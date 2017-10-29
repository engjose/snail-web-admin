import React, {Component} from 'react';
import { Carousel } from 'antd';
import BannerAnim, { Element } from 'rc-banner-anim';
import QueueAnim from 'rc-queue-anim';
import TweenOne from 'rc-tween-one';
import 'rc-banner-anim/assets/index.css';
import './banner.css';

export default class AutoSwitchBanner extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const bannerElementStyle = {
            height:'100%',
            width:'100%',
        }
        const buttonCss = {
            width:120,
            height:30,
            backgroundColor:'#1998E5',
            borderRadius:5,
            marginTop:10,
            color:'white',
            textAlign:'center',
            fontWight:"bord",
        }
        return (
            <div>
                <BannerAnim 
                    prefixCls="banner-user" 
                    autoPlay 
                    style={{height:400}}
                    autoPlaySpeed={3000}
                >
                    <Element  
                        prefixCls="banner-user-elem" 
                        key="0"
                    >
                        <TweenOne 
                            style={bannerElementStyle} 
                            className="banner-user-text"
                            animation={{ y: 30, opacity: 0, type: 'from', delay: 100 }}
                        >
                            <img src="https://zos.alipayobjects.com/rmsportal/hzPBTkqtFpLlWCi.jpg" style={bannerElementStyle} />
                        </TweenOne>
                    </Element>

                    <Element 
                        prefixCls="banner-user-elem"
                        key="1"
                    >
                        <TweenOne 
                            style={bannerElementStyle} 
                            className="banner-user-text"
                            animation={{ y: 30, opacity: 0, type: 'from', delay: 100 }}
                        >
                            <img src="https://zos.alipayobjects.com/rmsportal/gGlUMYGEIvjDOOw.jpg" style={bannerElementStyle}/>
                        </TweenOne>
                    </Element>
                </BannerAnim>
                <div style={{marginTop:100, height:300}}>
                    <Carousel autoplay autoplaySpeed={2000}>
                        <img key='5' src="https://zos.alipayobjects.com/rmsportal/gGlUMYGEIvjDOOw.jpg" style={{height:300}}/>
                        <img key='6' src="https://zos.alipayobjects.com/rmsportal/hzPBTkqtFpLlWCi.jpg" style={{height:300}}/>
                    </Carousel>
                </div>


            <QueueAnim delay={300} className="queue-simple">
                <div key="a" style={buttonCss}>依次进场</div>
                <div key="b" style={buttonCss}>依次进场</div>
                <div key="c" style={buttonCss}>依次进场</div>
                <div key="d" style={buttonCss}>依次进场</div>
            </QueueAnim>
          </div>
        );
    }
}