import React from "react";
import "../../static/css/mobile_news_block.css";
import {get} from "../../fetch/get.js";

export default class MobileNewsBlock extends React.Component {

    constructor() {
        super();
        this.state = {
            newsInfo : [
                {
                    url: "",
                    title: "",
                    thumbnail_pic_s: ""
                }
            ]
        }
    }

    componentDidMount() {
        var result = get(this.props.url);
        result.then(res => {
            return res.json();
        }).then(json => {
            this.setState({newsInfo: json})
        })
    }

    render() {
        return (
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
        )
    }
}