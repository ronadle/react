import React from "react";
import {Icon, Carousel, Tabs} from "antd";
const TabPane = Tabs.TabPane;
import MobileNewsBlock from "./mobile_news_block.js";
import {get} from "../../fetch/get.js";
import Tloader from 'react-touch-loader';
import ReactPullToRefresh from "react-pull-to-refresh";

export default class MobileBody extends React.Component {

    constructor() {
        super();
        this.state = {
            newsInfo: [
                {
                    url: "",
                    title: "",
                    thumbnail_pic_s: ""
                }
            ],
            count: 5,
            hasMore: 0,
            initializing: 1,
            autoLoadMore: true
        }
    }

    /**
     *
     * initializing:控制的进图条（加载）
     * hasMore:控制的是底部加载状态
     * resove(): 参数是结束的状态调用，没有他，会无法继续下一次加载
     */

    componentDidMount() {
        this.http("guonei");
        //当滑动到底部的时候，需要做一个延时加载的效果
        setTimeout(() => {
            this.setState({
                hasMore: 1, initializing: 2 //初始化完成
            })
        }, 2e3);
    }

    http(type) {
        var result = get("http://www.iwen.wiki/sxtstu/news/juhenews.php?type="+type+"&count=" + this.state.count);
        result.then(res => {
            return res.json();
        }).then(json => {
            this.setState({newsInfo: json})
        })
    }

    //resove:结束是触发，自己调用
    handleLoadMore(resove) { // 函数，每次页面到底部触发
        console.log("上拉加载")
        setTimeout(() => {
            var count = this.state.count;
            this.setState({
                count: count + 5
            })
            this.http("guonei");
            this.setState({
                hasMore: count > 0 && count < 30
            })
            //组件自带的，结束的标识
            resove();
        }, 2e3);

    }

    //下拉刷新
    handleRefresh(resolve, reject) {
        console.log("下拉刷新");
        this.setState({
            count:5
        })
        this.http("guonei");
        resolve();
    }

    render() {
        var settings = {
            dots: true,
            infinite: true,
            speed: 500,
            autoplay: true,
            autoplaySpeed: 2000
        }

        var {initializing, hasMore, autoLoadMore} = this.state;

        return (
            <div>
                <Carousel className="carousel" {...settings}>
                    <div>
                        <img src="http://iwen.wiki/sxtstu/blueberrypai/indexImg/banner2.jpg" alt=""/>
                    </div>
                    <div>
                        <img src="http://iwen.wiki/sxtstu/blueberrypai/indexImg/banner3.jpg" alt=""/>
                    </div>
                    <div>
                        <img src="http://iwen.wiki/sxtstu/blueberrypai/indexImg/banner1.jpg" alt=""/>
                    </div>
                </Carousel>
                <Tabs className="types" defaultActiveKey="1">
                    <TabPane tab="国内" key="1">

                        <ReactPullToRefresh
                            onRefresh={this
                            .handleRefresh
                            .bind(this)}
                            className="your-own-class-if-you-want"
                            style={{
                            textAlign: 'center'
                        }}>

                            <Tloader
                                initializing={initializing}
                                hasMore={hasMore}
                                autoLoadMore={autoLoadMore}
                                onLoadMore={this
                                .handleLoadMore
                                .bind(this)}>
                                {/* 在当前页面自己渲染 */}
                                <div className="news-block">
                                    {this
                                        .state
                                        .newsInfo
                                        .map((element, index) => {
                                            return (
                                                <a key={index} href={element.url}>
                                                    <img src={element.thumbnail_pic_s} alt=""/>
                                                    <span>{element.title}</span>
                                                </a>
                                            )
                                        })
}
                                </div>
                            </Tloader>
                        </ReactPullToRefresh>

                    </TabPane>
                    <TabPane tab="国际" key="2">
                        <MobileNewsBlock
                            url="http://www.iwen.wiki/sxtstu/news/juhenews.php?type=guoji&count=10"/>
                    </TabPane>
                    <TabPane tab="娱乐" key="3">
                        <MobileNewsBlock
                            url="http://www.iwen.wiki/sxtstu/news/juhenews.php?type=yule&count=10"/>
                    </TabPane>
                    <TabPane tab="科技" key="4">
                        <MobileNewsBlock
                            url="http://www.iwen.wiki/sxtstu/news/juhenews.php?type=keji&count=10"/>
                    </TabPane>
                    <TabPane tab="体育" key="5">
                        <MobileNewsBlock
                            url="http://www.iwen.wiki/sxtstu/news/juhenews.php?type=tiyu&count=10"/>
                    </TabPane>
                    <TabPane tab="军事" key="6">
                        <MobileNewsBlock
                            url="http://www.iwen.wiki/sxtstu/news/juhenews.php?type=junshi&count=10"/>
                    </TabPane>
                    <TabPane tab="时尚" key="7">
                        <MobileNewsBlock
                            url="http://www.iwen.wiki/sxtstu/news/juhenews.php?type=shishang&count=10"/>
                    </TabPane>
                </Tabs>
            </div>
        )
    }
}