import React from "react";
import MobileHeader from "./mobile_header.js";
import "../../static/css/mobile_index.css";
import MobileFooter from "./mobile_footer.js";
import MobileBody from "./mobile_body.js";

export default class MobileIndex extends React.Component{
    render(){
        return(
            <div className="container">
                <MobileHeader />
                <MobileBody />
                <MobileFooter />
            </div>
        )
    }
}