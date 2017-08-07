import React from "react";
import {get} from "../../../../fetch/get.js";

export default class TopText extends React.Component {

    constructor() {
        super();
        this.state = {
            topText: [
                {
                    title: "未知"
                }
            ]
        }
    }

    componentDidMount() {
        var textResult = get(this.props.url);
        textResult.then(res => {
            return res.json();
        }).then(json => {
            this.setState({topText: json})
        })

    }

    render() {
        return (
            <div className="top-text">
                <ul>
                    {this
                        .state
                        .topText
                        .map((element, index) => {
                            return (
                                <li key={index}>
                                    <a target="_blank" href={element.url}>{element.title}</a>
                                </li>
                            )
                        })
}
                </ul>
            </div>

        )
    }
}