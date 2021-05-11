import React, { useState, useEffect } from "react";
import { useLocation } from "react-router";
import queryString from "query-string";
import { ECard, ECardMsg, ECartTable } from "../../components/Card/Card";
import { base_url } from "../../constant/constant";
import {
    Router,
    Route,
    Link,
    Switch,
    NavLink,
    useHistory,
} from "react-router-dom";
import moment from "moment";

export default function Finish(props) {
    const location = useLocation();
    const getLocationParams = () => {
        const url = location.pathname.substr(1).split("/");
        return url;
    };
    const [data, setData] = useState([]);
    useEffect(() => {
        const getDataById = async (id) => {
            try {
                const getData = await axios.post(
                    base_url + "api/getPelaporById",
                    {
                        id: id,
                    }
                );
                setData(getData.data);
            } catch (error) {
                console.error(error);
            }
        };
        getDataById(getLocationParams()[1]);
    }, []);

    return (
        <div className="Contatent_container">
            <div className="TopBar">
                <div className="Icon-Menu">
                    <span className="las la-bars"></span>
                </div>
            </div>
            <article
                className="Client-Contents-Pelaporan"
                style={{ paddingTop: 200 }}
            >
                <div className="" style={{ width: "100%", margin: 0 }}>
                    <div
                        className="container-fluid"
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <div
                            className="col-md-6"
                            style={{
                                width: "100%",
                            }}
                        >
                            <ECardMsg
                                style={{ background: "#cef1ce" }}
                                childStyle={{ fontSize: 20 }}
                                titleStyle={{
                                    fontSize: 20,
                                    fontWeight: "bold",
                                }}
                            >
                                <p style={{ fontSize: 13 }}>
                                    Laporan anda tlah kami terima , anda dapat
                                    melihat nya kembali lewat email yang kami
                                    kirim,
                                </p>
                                <p style={{ fontSize: 13 }}>
                                    Selanjutnya kami akan memberikan respon
                                    laporan anda ke email pelapor <br />
                                    <strong>Kode Laporan : {data.kode}</strong>
                                </p>
                            </ECardMsg>
                        </div>
                    </div>
                </div>
            </article>
        </div>
    );
}
