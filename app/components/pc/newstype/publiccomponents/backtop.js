import React from "react";
import $ from "jquery";
import "../../../../static/css/backtop.css";

export default class BackTop extends React.Component {
    //初始化
    constructor() {
        super();
        this.backtopFn();
    }

    backtopFn(){
      //获得当前屏幕的高度
      var winHeight = $(window).height();
      $(window).scroll(function(){
          //滚动的高度
          var myTop = $(window).scrollTop();
          if(winHeight < myTop){
              $(".all-backtop").fadeIn(300,function(){
                  $(this).clearQueue();
              })
          }else{
              $(".all-backtop").fadeOut(100,function(){
                  $(this).clearQueue();
              })
          }
      });
    }

    handleBackTop() {
        $(".all-backtop")
            .click(function () {
                $("body,html").animate({
                    scrollTop: 0
                }, {duration: 300});
            });
    }

    render() {
        return (
            <div>
                <div
                    onClick={this
                    .handleBackTop
                    .bind(this)}
                    className="all-backtop">
                    TOP
                </div>
            </div>
        )
    }

}