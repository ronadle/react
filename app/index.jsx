import React from 'react';
import { render } from 'react-dom';
import MediaQuery from "react-responsive";
import PCIndex from "./components/pc/pc_index.js";
import MobileIndex from "./components/mobile/mobile_index.js";
import {Router,Route,hashHistory,IndexRoute} from "react-router";
import PCCenter from "./components/pc/pc_center.jsx";
import PCTop from "./components/pc/newstype/pc_top.js";
import PCGuoNei from "./components/pc/newstype/pc_guonei.js";
import PCGuoJi from "./components/pc/newstype/pc_guoji.js";
import PCJunShi from "./components/pc/newstype/pc_junshi.js";
import PCKeJi from "./components/pc/newstype/pc_keji.js";
import PCShiShang from "./components/pc/newstype/pc_shishang.js";
import PCTiYu from "./components/pc/newstype/pc_tiyu.js";
import PCYuLe from "./components/pc/newstype/pc_yule.js";

class App extends React.Component {
    // 初始化
    constructor(){
        super();
    }

    render() {
        return (
            <div>
                {/* PC端 */}
                <MediaQuery query="(min-device-width:1224px)">
                    <Router history={hashHistory}>
                        <Route path="/" component={PCIndex}>
                            <IndexRoute component={PCTop} />
                            <Route path="/guonei" component={PCGuoNei} />
                            <Route path="/guoji" component={PCGuoJi} />
                            <Route path="/junshi" component={PCJunShi} />
                            <Route path="/keji" component={PCKeJi} />
                            <Route path="/shishang" component={PCShiShang} />
                            <Route path="/tiyu" component={PCTiYu} />
                            <Route path="/yule" component={PCYuLe} />
                        </Route>
                        <Route path="/center/:username/:password" component={PCCenter}></Route>
                    </Router>
                </MediaQuery>

                {/* 移动端 */}
                <MediaQuery query="(max-device-width:1224px)">
                    <MobileIndex />
                </MediaQuery>
            </div>
        )
    }
}

render(
    <App/>,document.getElementById('root')
)
