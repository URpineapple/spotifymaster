import React, { Component } from 'react'

export default class TopButton extends Component {
    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
    }

    handleScroll = () => {
        let mybutton = document.getElementById("topbutton");
        if (mybutton) {
            if (window.pageYOffset > 20) {
                mybutton.style.display = "flex";
            } else {
                mybutton.style.display = "none";
            }
        }
    }

    goTop() {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }

    render() {
        return (
            <div id="topbutton" className="topbutton" onClick={() => this.goTop()}>
                <i className="fa fa-arrow-up"></i>
            </div>
        )
    }
}
