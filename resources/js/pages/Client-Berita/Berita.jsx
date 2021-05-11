import React, { useEffect, useState } from "react";
import { ECard, ECardMsg, ECartTable } from "../../components/Card/Card";
import ListNews from "../../components/Object/List-News";
import { base_url } from "../../constant/constant";
import ReadMoreReact from "read-more-react";
import moment from "moment";
const { htmlToText } = require("html-to-text");
export default function Berita() {
    const [getAll, setAll] = useState([]);
    useEffect(() => {
        const getAllBerita = async () => {
            const get = await axios.post(base_url + "api/News", {
                case: "get",
            });
            // console.log(get.data);
            setAll(get.data);
        };
        getAllBerita();
    }, []);
    return (
        <div className="Contatent_container">
            <div className="TopBar">
                <div className="Icon-Menu">
                    <span className="las la-bars"></span>
                </div>
                <h4>Berita</h4>
            </div>

            <article
                className="Client-Contents-Pelaporan"
                style={{ paddingTop: 80 }}
            >
                <div className="container-fluid">
                    <div className="row">
                        {getAll.map((item, i) => {
                            const textss = htmlToText(item.content, {
                                wordwrap: 130,
                            });
                            return (
                                <div className="col-md-6" key={i}>
                                    <ListNews
                                        leftReference={
                                            <>
                                                <div style={{ fontSize: 14 }}>
                                                    {moment(
                                                        item.updated_at
                                                    ).day()}
                                                    {moment(
                                                        item.updated_at
                                                    ).format("YYYY-MM-DD")}
                                                    <i className="fa fa-calendar"></i>
                                                </div>
                                                <div style={{ fontSize: 14 }}>
                                                    {item.view}
                                                    {" "}
                                                    <i className="fa fa-eye"></i>
                                                </div>
                                            </>
                                        }
                                        thm={
                                            base_url +
                                            "img/Berita/" +
                                            item.thumbnail
                                        }
                                        title={
                                            <a
                                                href={`${base_url}Berita/${item.id}`}
                                            >
                                                {item.title}
                                            </a>
                                        }
                                        intro={
                                            <ReadMoreReact
                                                text={textss}
                                                max={300}
                                                readMoreText="..."
                                            />
                                        }
                                    />
                                </div>
                            );
                        })}
                    </div>
                </div>
            </article>
        </div>
    );
}
