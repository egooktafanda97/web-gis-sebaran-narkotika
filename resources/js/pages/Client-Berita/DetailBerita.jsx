import React, { useState, useEffect } from "react";
import { ECard, ECardMsg, ECartTable } from "../../components/Card/Card";
import { base_url } from "../../constant/constant";
import { useLocation } from "react-router";
import moment from "moment";
export default function DetailBerita() {
    const location = useLocation();
    const getLocationParams = () => {
        const url = location.pathname.substr(1).split("/");
        return url;
    };
    const [loading, setLoading] = useState(false);
    const [berita, setListData] = useState(null);
    const [allBerita, setAllBerita] = useState([]);
    useEffect(() => {
        getBerita();
        getAllBerita();
    }, []);
    const getBerita = async () => {
        const getData = await axios.get(
            base_url + `api/allBerita/${getLocationParams()[1]}`
        );
        setListData(getData.data);
        console.log(getData.data);
    };
    const getAllBerita = async () => {
        setLoading(true);
        try {
            const get_ = await axios.post(base_url + "api/News", {
                case: "get",
            });
            
            setLoading(false);
            setAllBerita(get_.data);
        } catch (e) {
            setLoading(true);
        }
    };
    return (
        <div className="Contatent_container">
            <div className="TopBar">
                <div className="Icon-Menu">
                    <span className="las la-bars"></span>
                </div>
                <h4>Title</h4>
            </div>

            <article
                className="Client-Contents-Pelaporan"
                style={{ paddingTop: 80 }}
            >
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-8">
                            {berita != null && (
                                <ECard>
                                    <div className="imgs">
                                        <img
                                            src={`${base_url}img/Berita/${berita.thumbnail}`}
                                            style={{ width: "100%" }}
                                        />
                                    </div>
                                    <div className="Berita-title">
                                        <div className="title-text">
                                            <h4>{berita.title}</h4>
                                        </div>
                                        <small>20 oktoer 2020</small>
                                    </div>
                                    <hr />
                                    <div>
                                        <div>
                                            <div
                                                dangerouslySetInnerHTML={{
                                                    __html: berita.content,
                                                }}
                                            />
                                        </div>
                                    </div>
                                </ECard>
                            )}
                        </div>
                        <div className="col-md-4">
                            <ECard title="Semua Berita">
                                {allBerita.map((all, i) => {
                                    return loading === true ? (
                                        <div>Loading ...</div>
                                    ) : (
                                        <div key={i}>
                                            <a href={`${base_url}Berita/${all.id}`}>
                                                <p
                                                    style={{
                                                        margin: 0,
                                                        padding: 0,
                                                        fontWeight: "bold",
                                                    }}
                                                >
                                                    {all.title}
                                                </p>
                                            </a>
                                            <small>
                                                {moment(
                                                    all.created_at
                                                ).format("YYYY-MM-DD HH:mm")}
                                            </small>
                                            <hr />
                                        </div>
                                    );
                                })}
                            </ECard>
                        </div>
                    </div>
                </div>
            </article>
        </div>
    );
}
