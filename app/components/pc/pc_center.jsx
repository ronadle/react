import React from "react";

export default class PCCenter extends React.Component{
    render(){
        return(
            <div>
                {this.props.params.username}
                {this.props.params.password}
            </div>
        )
    }
}