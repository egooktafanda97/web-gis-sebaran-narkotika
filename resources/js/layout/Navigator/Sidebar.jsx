import React, { Component, useEffect } from "react";
import { Title, Logo, Versi, base_url } from "../../constant/constant";
import {
    Router,
    Route,
    Link,
    Switch,
    NavLink,
    useHistory,
    useLocation,
} from "react-router-dom";
import $ from "jquery";
const Sidebar = (props) => {
    return (
        <aside className="sidebar">
            <div className="S-Header">
                <img src={Logo} className="Logo" />
                <h5 className="title">{Title}</h5>
            </div>
            <div className="S-Main-Top">
                <div className="S-Main-Panel">
                    <div
                        style={{
                            width: "100%",
                            height: "100%",
                            display: "flex",
                            // justifyContent: "center",
                            alignItems: "flex-end",
                        }}
                    >
                        <span
                            style={{
                                background: "rgba(255,255,255,0.5)",
                                width: "100%",
                                paddingLeft: 10,
                                fontWeight: "bold",
                                fontSize: 10,
                            }}
                        >
                            Kepolisian Republik Indonesia
                            <br />
                            Polres Kabupaten Kuantan Singingi
                        </span>
                    </div>
                </div>
            </div>
            <div className="S-Main">
                <div className="S-Main-Nav">
                    <h5 className="menu">Menu</h5>
                    <div className="S-Main-Container">
                        <ul>
                            <li
                                className={
                                    useLocation().pathname == "/Dashboard"
                                        ? "active"
                                        : ""
                                }
                            >
                                <NavLink to="/Dashboard">
                                    <span className="las la-igloo"></span>
                                    <span>Dasboard</span>
                                </NavLink>
                            </li>
                            <li
                                className={
                                    useLocation().pathname == "/Tersangka"
                                        ? "active"
                                        : ""
                                }
                            >
                                <NavLink to="/Tersangka">
                                    <span className="las la-user-lock"></span>
                                    <span>Tersangka</span>
                                </NavLink>
                            </li>
                            <li
                                className={
                                    useLocation().pathname == "/Lapor"
                                        ? "active"
                                        : ""
                                }
                            >
                                <NavLink to="/Lapor">
                                    <span className="las la-file-alt"></span>
                                    <span>Lapor</span>
                                    <span className="fa fa-bell"></span>
                                </NavLink>
                            </li>
                            <li
                                className={
                                    useLocation().pathname == "/News"
                                        ? "active"
                                        : ""
                                }
                            >
                                <NavLink to="/News">
                                    <span className="lar la-newspaper la-2x"></span>
                                    <span>Berita</span>
                                </NavLink>
                            </li>
                            <li
                                className={
                                    useLocation().pathname == "/Laporan"
                                        ? "active"
                                        : ""
                                }
                            >
                                <NavLink to="/Laporan">
                                    <span className="las la-file"></span>
                                    <span>Laporan</span>
                                </NavLink>
                            </li>
                            <li
                                className={
                                    useLocation().pathname == "/Logout"
                                        ? "active"
                                        : ""
                                }
                            >
                                <a
                                style={{
                                    cursor:'pointer'
                                }}
                                    onClick={() => {
                                        window.location.href = base_url+'logout'
                                    }}
                                >
                                    <span className="las la-sign-out-alt"></span>
                                    <span>Logout</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="S-footer">
                <p
                    style={{
                        color: "#fff",
                        margin: 0,
                        padding: 0,
                    }}
                >
                    Versi {Versi}
                </p>
            </div>
        </aside>
    );
};

export default Sidebar;

//bahan item

// {
/* <ul>
<li className="active">
    <a>
        <span className="las la-igloo"></span>
        <span>Dasboard</span>
    </a>
    <ul>
        <li>
            <a>
                <span className="las la-angle-right"></span>
                <span>Dasboard</span>
            </a>
        </li>
        <li className="active">
            <a>
                <span className="las la-angle-right"></span>
                <span>Dasboard</span>
            </a>
        </li>
    </ul>
</li>
<li>
    <a>
        <span className="las la-igloo"></span>
        <span>Dasboard</span>
    </a>
</li>
<li>
    <a>
        <span className="las la-igloo"></span>
        <span>Dasboard</span>
    </a>
</li>
<li>
    <a>
        <span className="las la-igloo"></span>
        <span>Dasboard</span>
    </a>
</li>
<li>
    <a>
        <span className="las la-igloo"></span>
        <span>Dasboard</span>
    </a>
</li>
<li>
    <a>
        <span className="las la-igloo"></span>
        <span>Dasboard</span>
    </a>
</li>
<li>
    <a>
        <span className="las la-igloo"></span>
        <span>Dasboard</span>
    </a>
</li>
<li>
    <a>
        <span className="las la-igloo"></span>
        <span>Dasboard</span>
    </a>
</li>
</ul> */
// }
