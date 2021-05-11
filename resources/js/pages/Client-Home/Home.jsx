import React from "react";
import "./style.scss";
import { base_url } from "../../constant/constant";

export default function componentName() {
    return (
        <div className="Contatent_container">
            <div className="TopBar">
                <div className="Icon-Menu">
                    <span className="las la-bars"></span>
                </div>
                <h4>Home</h4>
            </div>
            <article className="Client-Contents" style={{paddingTop:80}}>
                <div className="c-left">
                    <img
                        src={base_url + "img/icon/logo.svg"}
                        className="BaseLogo"
                    />
                    <div className="label-Home">
                        <p>Kepolisian Kuantan singingi</p>
                        <h2>Sistem Penyebaran</h2>
                        <h2>Narkotika</h2>
                        <h5>SAT RESNARKOBA</h5>
                    </div>
                </div>
                <div className="c-right">
                    <img
                        src={base_url + "img/icon/ilustration.svg"}
                        className="ilustration"
                    />
                </div>
            </article>
        </div>
    );
}
