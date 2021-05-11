import { FormGroup, TextField } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { ECard } from "../../components/Card/Card";
import CEditor from "../../components/Editor/CEditor";
import Form from "react-bootstrap/Form";
import { postAxiosFromData } from "../../Helpers/Axios-gen";
import $ from "jquery";
import { useLocation } from "react-router";
import axios from "axios";
import { base_url } from "../../constant/constant";

export default function News() {
    const location = useLocation();
    const getLocationParams = () => {
        const url = location.pathname.substr(1).split("/");
        return url;
    };
    const [content, setContent] = useState(null);
    const [img, setImg] = useState(null);
    const [edit, setEdit] = useState(null);
    const [editor, setEditor] = useState(null);
    const [id, setId] = useState(null);
    const getValKet = (NewData) => {
        setContent(NewData);
    };
    const sub = () => {
        event.preventDefault();
        const formData = new FormData(event.target);
        formData.append("content", content);
        formData.append("case", $("#entry").data("case"));
        if (id != null) {
            formData.append("id", id);
        }
        // for (let [key, value] of formData.entries()) {
        //     console.log(`${key}: ${value}`);
        // }
        postAxiosFromData("api/News", formData, true);
    };
    const imgUpload = (e) => {};
    useEffect(() => {
        if (getLocationParams()[1] != undefined) {
            getBerita();
        }
    }, []);
    const getBerita = async () => {
        try {
            const getData = await axios.get(
                base_url + `api/allBerita/${getLocationParams()[1]}`
            );
            $("[name='title']").val(getData.data.title);
            const btn = $("#entry");
            btn.text("Edit");
            btn.removeClass("btn-primary");
            btn.addClass("btn-success");
            btn.attr("data-case", "update");
            $("[name='thumbnail]").attr("required", "false");
            setEditor(getData.data.content);
            setId(getData.data.id);
        } catch (e) {
            console.log(e.message);
        }
    };
    return (
        <div className="row">
            <div className="col-lg-12 mb-1">
                <Form id="forms" onSubmit={sub}>
                    <ECard
                        title={
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    paddingBottom: 5,
                                }}
                            >
                                <div>Entry Berita</div>
                                <div>
                                    <button
                                        className="btn btn-primary btn-sm"
                                        id="entry"
                                        data-case="insert"
                                    >
                                        Entry
                                    </button>
                                </div>
                            </div>
                        }
                    >
                        <div className="row" style={{ marginBottom: 10 }}>
                            <div className="col-md-8">
                                <FormGroup>
                                    <TextField
                                        type="text"
                                        name="title"
                                        label="Judul"
                                        variant="outlined"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        required
                                    />
                                </FormGroup>
                            </div>
                            <div className="col-md-4">
                                <FormGroup>
                                    <TextField
                                        onChange={imgUpload}
                                        type="file"
                                        name="thumbnail"
                                        label="Thumbnail"
                                        variant="outlined"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        // required
                                    />
                                </FormGroup>
                            </div>
                        </div>
                        <br />
                        <CEditor
                            HendlerVal={getValKet}
                            val={editor != null ? editor : ""}
                        />
                    </ECard>
                </Form>
            </div>
        </div>
    );
}

