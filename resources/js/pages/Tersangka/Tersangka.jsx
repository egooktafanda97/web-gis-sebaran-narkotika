import React, { Component, useState, useEffect, useRef } from "react";
import { ECard } from "../../components/Card/Card";
import Table from "../../components/Table/Tables";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { base_url } from "../../constant/constant";
import { DataPekerjaan, Pendidikan } from "../../constant/StaticData";
import LiveSearch from "../../components/Input/Live-Search";
import Swal from "sweetalert2";
import $ from "jquery";
import { genDelete, postAxios } from "../../Helpers/Axios-gen";

import { useReactToPrint } from "react-to-print";
import PropTypes from "prop-types";
import ComponentPrint from "./ComponetPrint";

const Tersangka = () => {
    // const [count, setCount] = useState(0);
    const [state, setState] = useState({ kecamatan: [], result: [] });
    const [stateDesa, setStateDesa] = useState([]);
    const [getData, setData] = useState([]);
    const [allData, setAllData] = useState([]);
    const [eDesa, setEdesa] = useState(null);
    const [kode, setKode] = useState([]);

    const [listGroup, setListGroup] = useState(null);
    const [entryShow, setEntryShow] = useState(true);
    const [tableShow, setTableShow] = useState(false);
    const RefPrint = useRef(null);

    const TableHeader = [
        "Nama",
        "Kecamatan",
        "Desa",
        "Jenis Narkotika",
        "Action",
    ];
    const styleTextFild = {
        width: "100%",
        marginBottom: "1rem",
    };

    const onclickEdit = (param) => {
        const form = document.querySelector("#forms");
        const btn = document.querySelector("#btn-saves");
        btn.innerHTML = "Edit";
        btn.classList.remove("btn-primary");
        btn.classList.add("btn-success");
        btn.setAttribute("data-case", "update");
        scroll();
        const nameElemet = [];
        [].forEach.call(
            form.querySelectorAll(
                'input[type="hidden"],input[type="text"],input[type="date"],select,textarea'
            ),
            (e) => {
                // console.log(e.name);
                nameElemet.push(e.name);
            }
        );

        nameElemet.forEach((it, inp) => {
            for (const [key, val] of Object.entries(param)) {
                if (key == it && key) {
                    switch (it) {
                        case "desa":
                            setEdesa(it);
                            // console.log(
                            //     document.querySelector("[name='" + it + "']")
                            // );
                            break;
                        case "kecamatan":
                            $("[name='" + it + "']").val(val);
                            getDesa(
                                document.querySelector("[name='" + it + "']")
                            );
                            break;
                        default:
                            $("[name='" + it + "']").val(val);
                            break;
                    }
                }
            }
        });
    };

    const groupBy = function (xs, key) {
        return xs.reduce(function (rv, x) {
            (rv[x[key]] = rv[x[key]] || []).push(x);
            return rv;
        }, {});
    };
    useEffect(() => {
        const getPelapor = async () => {
            try {
                const pelapor = await axios.get(
                    base_url + "api/getPelaporAllData"
                );
                setKode(pelapor.data);
            } catch (error) {
                console.error(error);
            }
        };
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
        const getAllData = async () => {
            const getData = await axios.post(base_url + "api/tersangka");
            let com = [];
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
                                    onclickEdit(item);
                                    setEntryShow(false);
                                    setTableShow(true);
                                }}
                                data-id={item.id}
                                className="btn btn-success btn-sm mr-1"
                            >
                                <i className="fa fa-edit"></i>
                            </button>
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
            getPelapor();
            setAllData(getData.data);
            setData(com);
            setListGroup(groupBy(getData.data, "jenis_narkotika"));
        };

        const facth = async () => {
            const result = await axios.get(base_url + "api/getKecamtan");
            setState({ ...state, kecamatan: result.data });
        };
        facth();
        getAllData();
    }, []);

    const dataKecamatan = () => {
        return state.kecamatan.map((person, i) => (
            <option key={i} value={person.id_kec}>
                {person.nama}
            </option>
        ));
    };
    const getDesa = (event) => {
        const data = {
            id_kec:
                event.target == undefined ? event.value : event.target.value,
        };

        axios.post(base_url + "api/getDesa", data).then((res) => {
            setStateDesa(res.data);
        });
    };

    const sub = (event) => {
        event.preventDefault();
        const getCaseBtn = document
            .querySelector("#btn-saves")
            .getAttribute("data-case");
        postAxios("api/tersangka", event, getCaseBtn, true);
    };
    const scroll = () => {
        const section = document.querySelector(".card-form-input");
        section.scrollIntoView({ behavior: "smooth", block: "start" });
    };
    const handlePrint = useReactToPrint({
        content: () => RefPrint.current,
    });
    return (
        <div className="row mt-3">
            <div className="col-lg-12 mb-5" hidden={tableShow}>
                <ECard
                    title={
                        <>
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                }}
                            >
                                <span>Data</span>{" "}
                                <div>
                                    <button
                                        className="btn btn-primary btn-sm"
                                        onClick={() => {
                                            setEntryShow(false);
                                            setTableShow(true);
                                        }}
                                    >
                                        Entry
                                    </button>
                                </div>
                            </div>
                        </>
                    }
                >
                    <div className="w-100 text-right mb-1">
                        <button
                            onClick={handlePrint}
                            className="btn btn-secondary btn-sm"
                        >
                            <i className="fa fa-print"></i>
                        </button>
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

                <div style={{ display: "none" }}>
                    <ComponentPrint ref={RefPrint} />
                </div>
            </div>

            <div className="col-lg-12 mb-1" hidden={entryShow}>
                <ECard
                    title={
                        <>
                            <button
                                className="btn btn-secondary btn-sm text-center"
                                style={{ borderRadius: "50%" }}
                                onClick={() => {
                                    setEntryShow(true);
                                    setTableShow(false);
                                }}
                            >
                                <i className="fa fa-arrow-left"></i>
                            </button>
                            <span className="ml-3">Form Entry</span>
                        </>
                    }
                    className="card-form-input"
                >
                    <Form onSubmit={sub} id="forms">
                        <input type="hidden" name="id" />
                        <div className="row">
                            <div className="col-md-6">
                                <Form.Group>
                                    <Form.Control
                                        as="select"
                                        name="kode_pelapor"
                                    >
                                        <option value="">Kode Laporan</option>
                                        {kode.map((itmes, i) => (
                                            <option key={i} value={itmes.kode}>
                                                {itmes.kode}
                                                {" | "}
                                                {itmes.atas_nama}
                                            </option>
                                        ))}
                                    </Form.Control>
                                </Form.Group>
                                <span
                                    style={{
                                        position: "relative",
                                        top: -20,
                                        fontSize: 9,
                                        color: "green",
                                    }}
                                >
                                    <i>
                                        *boleh di kosongkan jika tidak ada
                                        laporan masyarakat*
                                    </i>
                                </span>

                                <TextField
                                    name="nama"
                                    label="Nama"
                                    variant="outlined"
                                    style={styleTextFild}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    required
                                />
                                <TextField
                                    name="tempat_lahir"
                                    label="Tempat Lahir"
                                    variant="outlined"
                                    style={styleTextFild}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    required
                                />
                                <TextField
                                    type="date"
                                    name="tanggal_lahir"
                                    label="Tanggal Lahir"
                                    defaultValue={new Date()
                                        .toISOString()
                                        .substring(0, 10)}
                                    variant="outlined"
                                    style={styleTextFild}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    required
                                />
                                <Form.Group>
                                    <Form.Control
                                        as="select"
                                        name="agama"
                                        required
                                    >
                                        <option value="">Pilih Agama</option>
                                        <option value="Islam">Islam</option>
                                        <option value="Kristen">Kristen</option>
                                        <option value="Hindu">Hindu</option>
                                        <option value="Budha">Budha</option>
                                        <option value="Konghucu">
                                            Konghucu
                                        </option>
                                    </Form.Control>
                                </Form.Group>

                                <Form.Group>
                                    <Form.Control
                                        as="select"
                                        name="pekerjaan"
                                        required
                                    >
                                        <option value="">
                                            Pilih Pekerjaan
                                        </option>
                                        {DataPekerjaan.map((itmes, i) => (
                                            <option key={i} value={itmes.nama}>
                                                {itmes.nama}
                                            </option>
                                        ))}
                                    </Form.Control>
                                </Form.Group>

                                <Form.Group>
                                    <Form.Control
                                        as="select"
                                        name="status"
                                        required
                                    >
                                        <option value="">Status</option>
                                        <option value="kawin">Kawin</option>
                                        <option value="Lajang">Lajang</option>
                                    </Form.Control>
                                </Form.Group>

                                <Form.Group>
                                    <Form.Control
                                        as="select"
                                        name="pendidikan"
                                        required
                                    >
                                        <option value="">
                                            Pilih pendidikan
                                        </option>
                                        {Pendidikan.map((itmes, i) => (
                                            <option key={i} value={itmes.nama}>
                                                {itmes.nama}
                                            </option>
                                        ))}
                                    </Form.Control>
                                </Form.Group>

                                <Form.Group>
                                    <Form.Control
                                        as="select"
                                        name="kewarganegaraan"
                                        required
                                    >
                                        <option value="">
                                            Kewarga Negaraan
                                        </option>
                                        <option value="kawin">WNI</option>
                                        <option value="Lajang">WNA</option>
                                    </Form.Control>
                                </Form.Group>
                                <TextField
                                    type="text"
                                    name="alamat"
                                    label="Alamat"
                                    variant="outlined"
                                    style={styleTextFild}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    required
                                />

                                <Form.Group>
                                    <Form.Control
                                        as="select"
                                        onChange={getDesa.bind(this)}
                                        name="kecamatan"
                                        required
                                    >
                                        <option value="">
                                            Pilih Kecamatan
                                        </option>
                                        {dataKecamatan()}
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Control
                                        as="select"
                                        name="desa"
                                        disabled={
                                            stateDesa == undefined
                                                ? true
                                                : false
                                        }
                                        required
                                    >
                                        {stateDesa != undefined ? (
                                            stateDesa.map((item, i) => (
                                                <option
                                                    key={i}
                                                    value={item.id_kel}
                                                >
                                                    {item.nama}
                                                </option>
                                            ))
                                        ) : (
                                            <option>Pilih Desa</option>
                                        )}
                                    </Form.Control>
                                </Form.Group>
                            </div>
                            <div className="col-md-6">
                                <TextField
                                    type="text"
                                    name="surat_perintah_penyidik"
                                    label="Surat Perintah Penyidik"
                                    variant="outlined"
                                    style={styleTextFild}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    required
                                />

                                <TextField
                                    type="file"
                                    name="scan_surat_perintah_penyidik"
                                    label="Scan Surat Perintah Penynameik"
                                    variant="outlined"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    style={styleTextFild}
                                />
                                <span
                                    style={{
                                        position: "relative",
                                        top: -20,
                                        fontSize: 9,
                                        color: "green",
                                    }}
                                >
                                    <i>*boleh di kosongkan*</i>
                                </span>

                                <TextField
                                    type="text"
                                    name="surat_perintah_penahanan"
                                    label="Surat Perintah Penahanan"
                                    variant="outlined"
                                    style={styleTextFild}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    required
                                />

                                <TextField
                                    type="file"
                                    name="scan_surat_perintah_penahanan"
                                    label="Scan Surat Perintah Penahanan"
                                    variant="outlined"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    style={styleTextFild}
                                />
                                <span
                                    style={{
                                        position: "relative",
                                        top: -20,
                                        fontSize: 9,
                                        color: "green",
                                    }}
                                >
                                    <i>*boleh di kosongkan*</i>
                                </span>

                                <LiveSearch
                                    place="jenis narkotika yang di salah gunakan"
                                    label="Jenis Narkotika"
                                    name="jenis_narkotika"
                                    groupList={listGroup}
                                />
                                <TextField
                                    type="date"
                                    name="tgl_penahanan"
                                    label="Tanggal Penahanan"
                                    defaultValue={new Date()
                                        .toISOString()
                                        .substring(0, 10)}
                                    variant="outlined"
                                    style={styleTextFild}
                                />
                                <Form.Group>
                                    <Form.Label>Keterangan</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={3}
                                        name="keterangan"
                                    />
                                </Form.Group>
                                <span
                                    style={{
                                        position: "relative",
                                        top: -20,
                                        fontSize: 9,
                                        color: "green",
                                    }}
                                >
                                    <i>*boleh di kosongkan*</i>
                                </span>
                            </div>
                        </div>
                        <Form.Group className="text-right">
                            <a
                                className="btn btn-warning btn-sm mr-1"
                                onClick={() => window.location.reload()}
                            >
                                batal
                            </a>
                            <button
                                className="btn btn-primary btn-sm"
                                data-case="insert"
                                id="btn-saves"
                            >
                                Simpan
                            </button>
                        </Form.Group>
                    </Form>
                </ECard>
            </div>
        </div>
    );
};

export default Tersangka;
