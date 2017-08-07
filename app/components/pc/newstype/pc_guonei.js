import React from "react";
import ImgTextBlock from "./publiccomponents/img_text_block.js";
import {Row, Col, BackTop} from "antd";
import MyBackTop from "./publiccomponents/backtop.js";

export default class PCGuoNei extends React.Component {
    render() {
        return (
            <div>
                <Row>
                    <Col span={2}></Col>
                    <Col span={20}>
                        <ImgTextBlock
                            url="http://www.iwen.wiki/sxtstu/news/juhenews.php?type=guonei&count=30"/>
                    </Col>
                    <Col span={2}></Col>
                </Row>
                <div>
                    {/*<BackTop/>*/}
                    <MyBackTop />
                </div>,
            </div>
        )
    }
}