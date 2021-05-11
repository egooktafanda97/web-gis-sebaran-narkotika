import { Button, FormGroup, TextField } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { ECard } from "../../components/Card/Card";
import CEditor from "../../components/Editor/CEditor";
import Form from "react-bootstrap/Form";
import { genDelete, postAxiosFromData } from "../../Helpers/Axios-gen";
import $ from "jquery";
import ReadMoreReact from "read-more-react";
import moment from "moment";
import Swal from "sweetalert2";
const { htmlToText } = require("html-to-text");
import {
    Router,
    Route,
    Link,
    Switch,
    NavLink,
    useHistory,
} from "react-router-dom";
import axios from "axios";
import { base_url } from "../../constant/constant";
export default function ListNews() {
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
    const hendelDelete = (id) => {
        const _id = {
            id: id,
            case: "delete",
        };
        genDelete("api/News", _id, Funcresponse);
    };
    const Funcresponse = (res) => {
        console.log(res);
        if (res.data.status == 200) {
            Swal.fire({
                icon: "success",
                title: "Good Job",
                text: "Berhasil",
                confirmButtonText: "Ok",
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.reload();
                }
            });
        } else {
            Swal.fire({
                icon: "error",
                title: "Oops..!",
                text: res.data.msg,
                confirmButtonText: "Ok",
            }).then((result) => {
                if (result.isConfirmed) {
                    // window.location.reload();
                }
            });
        }
    };
    return (
        <div className="container-filuid">
            <div className="mb-3 text-right">
                <NavLink to="/EntryNews" className="btn btn-info btn-sm">
                    <span>Entry</span>
                </NavLink>
            </div>
            {getAll.map((items, i) => {
                const textss = htmlToText(items.content, {
                    wordwrap: 130,
                });
                // console.log(items);

                return (
                    <Template
                        key={i}
                        judul={items.title}
                        tanggal={moment(items.updated_at).format("YYYY-MM-DD")}
                        article={textss}
                        thm={base_url + "img/Berita/" + items.thumbnail}
                        action={
                            <>
                                <button
                                    className="btn btn-success btn-sm mr-1"
                                    onClick={() => {
                                        window.location.href =
                                            base_url + "EntryNews/" + items.id;
                                    }}
                                >
                                    <i className="fa fa-edit"></i>
                                </button>
                                <button
                                    className="btn btn-info btn-sm mr-1"
                                    onClick={() => {
                                        window.location.href =
                                            base_url + "Berita/" + items.id;
                                    }}
                                >
                                    <i className="fa fa-eye"></i>
                                </button>
                                <button
                                    className="btn btn-danger btn-sm mr-1"
                                    onClick={() => {
                                        hendelDelete(items.id);
                                    }}
                                >
                                    <i className="fa fa-trash"></i>
                                </button>
                            </>
                        }
                    />
                );
            })}
        </div>
    );
}

const Template = (props) => {
    return (
        <ECard className="mb-2">
            <div className="container-fluid w-100">
                <div>
                    <div className="row">
                        <div className="col-4">
                            <img src={props.thm} style={{ width: "100%" }} />
                        </div>
                        <div className="col-8">
                            <div style={{ fontSize: 20, fontWeight: "bold" }}>
                                {props.judul}
                            </div>
                            <div
                                style={{
                                    fontSize: 10,
                                    borderBottom: "1px solid #ccc",
                                }}
                            >
                                {props.tanggal}
                            </div>
                            <div>
                                <ReadMoreReact
                                    text={props.article}
                                    max={300}
                                    readMoreText="..."
                                />
                            </div>

                            <div className="mt-3 text-right">
                                {props.action}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </ECard>
    );
};
