import React from "react";
import {Row, Col, Carousel} from "antd";
import "../../../static/css/pc_top.css";
import {get} from "../../../fetch/get.js";
import TopText from  "./top/top_text.js";
import ImgTextBlock from  "./publiccomponents/img_text_block.js";

export default class PCTop extends React.Component {

    constructor() {
        super();
        this.state = {
            bannerimg: []
        }
    }

    componentDidMount() {
        // 轮播图
        var bi = [];
        var result = get("http://www.iwen.wiki/sxtstu/blueberrypai/getIndexBanner.php");
        result.then(res => {
            return res.json();
        }).then(json => {
            json
                .banner
                .map(function (element, index) {
                    bi.push(element.img);
                })
            this.setState({bannerimg: bi})
        });
    }

    render() {
        const settings = {
            dots: true,
            infinite: true,
            speed: 500,
            autoplay: true,
            autoplaySpeed: 2000
        }

        return (
            <div className="topContainer">
                <Row>
                    <Col span={2}></Col>
                    <Col span={20}>
                        <Row>
                            <Col span={10}>
                                <div className="banner">
                                    <Carousel {...settings} className="Carousel">
                                        <div>
                                            <a href="#">
                                                <img src={this.state.bannerimg[0]} alt="img"/>
                                            </a>
                                        </div>
                                        <div>
                                            <a href="#">
                                                <img src={this.state.bannerimg[1]} alt="img"/>
                                            </a>
                                        </div>
                                        <div>
                                            <a href="#">
                                                <img src={this.state.bannerimg[2]} alt="img"/>
                                            </a>
                                        </div>
                                        <div>
                                            <a href="#">
                                                <img src={this.state.bannerimg[3]} alt="img"/>
                                            </a>
                                        </div>
                                    </Carousel>
                                </div>
                            </Col>
                            <Col span={14}>
                                <TopText url="http://www.iwen.wiki/sxtstu/news/juhenews.php?type=top&count=4"/>
                                <TopText url="http://www.iwen.wiki/sxtstu/news/juhenews.php?type=yule&count=4"/>
                            </Col>
                        </Row>
                        <ImgTextBlock url="http://www.iwen.wiki/sxtstu/news/juhenews.php?type=junshi&count=9"/>
                    </Col>
                    <Col span={2}></Col>
                </Row>
            </div>
        )
    }
}