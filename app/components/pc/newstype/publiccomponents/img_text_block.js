import React from "react";
import {get} from "../../../../fetch/get.js";
import "../../../../static/css/img_text_block.css";

export default class ImgTextBlock extends React.Component {

    constructor() {
        super();
        this.state = {
            info: [
                {
                    title: "未知",
                    thumbnail_pic_s:"",
                    url:""
                }
            ]
        }
    }

    componentDidMount(){
        var textResult = get(this.props.url);
        textResult.then(res => {
            return res.json();
        }).then(json => {
            this.setState({info: json})
        })
    }

    render() {
        return (
            <div className="imgtext">
                {
                    this.state.info.map((element,index) => {
                        return(
                            <a key={index} href={element.url}>
                                <img src={element.thumbnail_pic_s} alt="img"/>
                                <span>{element.title}</span>
                            </a>
                        )
                    })
                }
            </div>
        )
    }
}