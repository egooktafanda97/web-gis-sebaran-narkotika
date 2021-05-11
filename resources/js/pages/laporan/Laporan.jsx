import React, { useState, useEffect } from "react";
import ECard from "../../components/Card/Ecard";
import Table from "../../components/Table/Tables";
import axios from "axios";
import { base_url } from "../../constant/constant";

import { makeStyles } from "@material-ui/core/styles";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import { genDelete } from "../../Helpers/Axios-gen";
import { If, Then, ElseIf, Else } from "react-if-elseif-else-render";
import Swal from "sweetalert2";
export default function componentName() {
    const [nav, setNav] = useState("tersangka");
    return (
        <div className="">
            <ECard>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li
                            className={`breadcrumb-item ${
                                nav == "tersangka" ? "active" : ""
                            }`}
                        >
                            <a
                                style={{ cursor: "pointer" }}
                                onClick={() => {
                                    setNav("tersangka");
                                }}
                            >
                                Tersangka
                            </a>
                        </li>
                        <li
                            className={`breadcrumb-item ${
                                nav == "lapor" ? "active" : ""
                            }`}
                        >
                            <a
                                style={{ cursor: "pointer" }}
                                onClick={() => {
                                    setNav("lapor");
                                }}
                            >
                                Laporan Masyarakat
                            </a>
                        </li>
                    </ol>
                </nav>
                <If condition={nav == "tersangka"}>
                    <Then>
                        <Tersangka />
                    </Then>
                    <ElseIf condition={nav == "lapor"}>
                        <LaporanMasyarakat />
                    </ElseIf>
                </If>
            </ECard>
        </div>
    );
}

function LaporanMasyarakat() {
    const [getAllData, setAllData] = useState(null);
    const [getData, setData] = useState([]);
    const [getSearch, setSearch] = useState(null);
    const TableHeader = [
        "Nama Pelapor",
        "Tangal",
        "Nama Tersangka",
        "Kecamatan",
        "Desa",
        "Jenis Narkotika",
        "Action",
    ];
    useEffect(() => {
        axgetAllData();
    }, []);
    const hendelDelete = (id) => {
        const _id = {
            id: id,
            case: "delete",
        };
        genDelete("api/Pelaporan", _id, Funcresponse);
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
                    window.location.reload();
                }
            });
        }
    };
    const axgetAllData = async () => {
        try {
            const casesData = 2;
            const getData = await axios.get(
                base_url +
                    "api/getPelaporAllData/" +
                    casesData +
                    "/" +
                    (getSearch != null ? getSearch : "")
            );
            console.log(getData);
            let com = [];
            getData.data.map((item) => {
                const obj = {
                    nama: item.nama,
                    tanggal: item.taggal,
                    atas_nama: item.atas_nama,
                    kecamatan: item.nama_kec,
                    desa: item.nama_desa,
                    jenis_narkotika: item.jenis_narkotika,
                    action: (
                        <>
                            <button
                                onClick={() => {
                                    hendelDelete(item.id);
                                }}
                                data-id={item.id}
                                className="btn btn-danger btn-sm mr-1"
                            >
                                <i className="fa fa-trash"></i>
                            </button>
                        </>
                    ),
                };
                com.push(obj);
            });
            setData(com);
            setAllData(getData.data);
        } catch (error) {
            console.error(error);
        }
    };
    const hendleOnChange = (val) => {
        setSearch(val);
    };
    return (
        <ECard title="Laporan Masyarakat">
            <div className="w-100 text-right">
                <Search
                    onChange={hendleOnChange}
                    BtnOnClick={() => {
                        {
                            getSearch != null && axgetAllData();
                        }
                    }}
                />
                <a
                    target="_blank"
                    href={
                        base_url +
                        "laporan-pelapor/" +
                        (getSearch == null ? "" : getSearch)
                    }
                    className="btn btn-success btn-sm"
                >
                    <i className="fa fa-print"></i>
                </a>
            </div>
            <Table
                allData={getAllData}
                data={getData}
                colorHead={{
                    backgroundColor: "#264653",
                    color: "#fff",
                }}
                Header={TableHeader}
            />
        </ECard>
    );
}

function Tersangka(props) {
    const [getData, setData] = useState([]);
    const [allData, setAllData] = useState([]);
    const [getSearch, setSearch] = useState(null);
    const TableHeader = [
        "Nama",
        "Kecamatan",
        "Desa",
        "Jenis Narkotika",
        "Action",
    ];
    useEffect(() => {
        getAllData();
    }, []);
    const hendelDelete = (id) => {
        const _id = {
            id: id,
            case: "delete",
        };
        genDelete("api/tersangka", _id, Funcresponse);
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
                    window.location.reload();
                }
            });
        }
    };
    const getAllData = async (search = null) => {
        const getData = await axios.post(
            base_url + "api/tersangka",
            search != null
                ? {
                      cari: search,
                  }
                : null
        );
        let com = [];
        console.log(getData.data);
        getData.data.map((item) => {
            const obj = {
                nama: item.nama,
                kecamatan: item.nama_kec,
                desa: item.nama_desa,
                jenis_narkotika: item.jenis_narkotika,
                action: (
                    <>
                        <button
                            onClick={() => {
                                window.location.href =
                                    base_url + "Detailtersangka/" + item.id;
                            }}
                            data-id={item.id}
                            className="btn btn-info btn-sm mr-1"
                        >
                            <i className="fa fa-eye"></i>
                        </button>
                        <button
                            onClick={() => {
                                hendelDelete(item.id);
                            }}
                            data-id={item.id}
                            className="btn btn-danger btn-sm mr-1"
                        >
                            <i className="fa fa-trash"></i>
                        </button>
                    </>
                ),
            };
            com.push(obj);
        });
        setAllData(getData.data);
        setData(com);
    };
    const hendleOnChange = (val) => {
        setSearch(val);
    };
    return (
        <ECard>
            <div className="w-100 text-right">
                <Search
                    onChange={hendleOnChange}
                    BtnOnClick={() => {
                        {
                            getSearch != null && getAllData(getSearch);
                        }
                    }}
                />
                <a
                    target="_blank"
                    href={
                        base_url +
                        "tersangka-print/" +
                        (getSearch == null ? "" : getSearch)
                    }
                    className="btn btn-success btn-sm"
                >
                    <i className="fa fa-print"></i>
                </a>
            </div>
            <Table
                allData={allData}
                data={getData}
                colorHead={{
                    backgroundColor: "#264653",
                    color: "#fff",
                }}
                Header={TableHeader}
            />
        </ECard>
    );
}

function Search(props) {
    const useStyles = makeStyles((theme) => ({
        containers: {
            border: "1px solid #ccc",
            display: "inline-block",
            boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px;",
            marginBottom: 10,
            borderRadius: 5,
            marginRight: 5,
        },
        input: {
            marginLeft: theme.spacing(1),
            flex: 1,
        },
        iconButton: {
            padding: 5,
        },
    }));
    const classes = useStyles();
    return (
        <div className={classes.containers}>
            <InputBase
                onChange={(e) => {
                    props.onChange(e.target.value);
                }}
                className={classes.input}
                placeholder="Search"
                inputProps={{ "aria-label": "search google maps" }}
            />
            <IconButton
                type="submit"
                className={classes.iconButton}
                aria-label="search"
                onClick={() => {
                    props.BtnOnClick();
                }}
            >
                <SearchIcon />
            </IconButton>
        </div>
    );
}
