import React, { Component, useState, useEffect, useRef } from "react";
import TextField from "@material-ui/core/TextField";
import { ECard, ECardMsg, ECartTable } from "../../components/Card/Card";
import Form from "react-bootstrap/Form";
import "./style.scss";
import { base_url } from "../../constant/constant";
import CEditor from "../../components/Editor/CEditor";
import { useLocation } from "react-router-dom";
import {
    postAxiosFromData,
    postAxiosFromDataCallBack,
} from "../../Helpers/Axios-gen";
import { times } from "lodash-es";
import {
    Router,
    Route,
    Link,
    Switch,
    NavLink,
    useHistory,
} from "react-router-dom";

const styleTextFild = {
    width: "100%",
    marginBottom: "1rem",
};
export default function Pelaporan(props) {
    let location = useLocation();
    const [state, setState] = useState({ kecamatan: [] });
    const [stateDesa, setStateDesa] = useState([]);
    const [fakta, setFakta] = useState(null);
    const [pendapat, setPendapat] = useState(null);
    const [dataEdit, setDataEdit] = useState(null);

    const [ketTambahan, setKetTambahan] = useState(null);
    const [pendapatPelapor, setPendapatPelapor] = useState(null);

    useEffect(() => {
        const facth = async () => {
            const result = await axios.get(base_url + "api/getKecamtan");
            setState({ kecamatan: result.data });
        };
        if (location.state != null) {
            const getDataById = async (id) => {
                try {
                    const getData = await axios.post(
                        base_url + "api/getPelaporById",
                        {
                            id: id,
                        }
                    );
                    setKetTambahan(getData.data.keterangan_tambahan);
                    setPendapatPelapor(getData.data.pendapat);
                    setInput(getData.data);
                    setDataEdit(getData.data);
                } catch (error) {
                    console.error(error);
                }
            };
            getDataById(location.state.id);
        }
        facth();
    }, []);
    const setInput = (data) => {
        $('[name="nik"]').val(data.nik);
        $('[name="nama"]').val(data.nama);
        $('[name="jekel"]').val(data.jekel);
        $('[name="alamat"]').val(data.alamat);
        $('[name="no_hp"]').val(data.no_hp);
        $('[name="hubungan"]').val(data.hubungan);

        $('[name="tempat_lapor"]').val(data.tempat_lapor);
        $('[name="nilai"]').val(data.nilai);
        $('[name="taggal"]').val(data.taggal);
        $('[name="pukul"]').val(data.pukul);
        $('[name="email"]').val(data.email);
        $('[name="atas_nama"]').val(data.atas_nama);

        $('[name="alamat_terduga"]').val(data.alamat_terduga);

        $('[name="jenis_narkotika"]').val(data.jenis_narkotika);

        const btn = $("#btn-saves");
        btn.text("edit");
        btn.attr("data-case", "update");
        btn.removeClass("btn-primary");
        btn.addClass("btn-success");
        const times = setInterval(() => {
            $('[name="kecamatan"]').val(data.kecamatan);
            getDesa(data.kecamatan, () => {
                $('[name="desa"]').val(data.desa);
            });
            clearInterval(times);
        }, 1000);
        console.log($("#test"));
    };
    const dataKecamatan = () => {
        return state.kecamatan.map((person, i) => (
            <option key={i} value={person.id_kec}>
                {person.nama}
            </option>
        ));
    };
    const getDesa = (event, funcs) => {
        const data = {
            id_kec: event.target == undefined ? event : event.target.value,
        };
        axios.post(base_url + "api/getDesa", data).then((res) => {
            setStateDesa(res.data);
            funcs();
        });
    };
    const hendlerCallBack = (data) => {
        window.location.href = base_url + "Pelaporan/" + data.data;
    };
    const sub = (event) => {
        event.preventDefault();
        const getCaseBtn = document
            .querySelector("#btn-saves")
            .getAttribute("data-case");
        const formData = new FormData(event.target);
        formData.append("keterangan_tambahan", fakta);
        formData.append("pendapat", pendapat);
        formData.append("case", getCaseBtn);
        if (location.state != null) {
            formData.append("id", location.state.id);
        }
        // for (let [key, value] of formData.entries()) {
        //     console.log(`${key}: ${value}`);
        // }

        postAxiosFromDataCallBack(
            "api/Pelaporan",
            formData,
            hendlerCallBack,
            false
        );
    };

    const getValKet = (val) => {
        setFakta(val);
    };
    const getValPendapat = (val) => {
        setPendapat(val);
    };
    const batal = () => {
        window.location.reload();
    };
    return (
        <div className="Contatent_container">
            {/* {console.log(dataEdit)} */}
            <div className="TopBar">
                <div className="Icon-Menu">
                    <span className="las la-bars"></span>
                </div>
                <h4>Lapor</h4>
            </div>
            <article
                className="Client-Contents-Pelaporan"
                style={{ paddingTop: 70 }}
            >
                <div className="" style={{ width: "100%", margin: 0 }}>
                    <Form onSubmit={sub} id="forms">
                        <ECard title="Form Pelaporan">
                            <div className="row">
                                <div className="col-md-6">
                                    <h5 style={{ fontWeight: "bold" }}>
                                        I. Pendahuluan
                                    </h5>
                                    <ECardMsg title="Catatan">
                                        <p>
                                            Isi data diri anda, semua data yang
                                            anda kirim bersifat rahasia.
                                        </p>
                                    </ECardMsg>
                                    <br />

                                    <TextField
                                        name="nik"
                                        label="NIK KTP"
                                        variant="outlined"
                                        style={styleTextFild}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        required
                                    />
                                    <TextField
                                        name="nama"
                                        label="Nama Lengkap"
                                        variant="outlined"
                                        style={styleTextFild}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        required
                                    />
                                    <TextField
                                        type="email"
                                        name="email"
                                        label="Email"
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
                                            name="jekel"
                                            required
                                        >
                                            <option value="">
                                                Jenis Klamin
                                            </option>
                                            <option value="Laki-Laki">
                                                Laki-Laki
                                            </option>
                                            <option value="Perempuan">
                                                Perempuan
                                            </option>
                                        </Form.Control>
                                    </Form.Group>
                                    <TextField
                                        name="alamat"
                                        label="Alamat"
                                        variant="outlined"
                                        style={styleTextFild}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        required
                                    />
                                    <TextField
                                        name="no_hp"
                                        label="Nomor Telepon"
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
                                            name="hubungan"
                                            required
                                        >
                                            <option value="">Hubungan</option>
                                            <option value="Hubungan Keluarga">
                                                Hubungan Keluarga
                                            </option>
                                            <option value="-">-</option>
                                        </Form.Control>
                                    </Form.Group>
                                    <TextField
                                        name="tempat_lapor"
                                        label="Tempat Pelaporan"
                                        variant="outlined"
                                        style={styleTextFild}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        required
                                    />
                                    <TextField
                                        name="nilai"
                                        label="Nilai"
                                        variant="outlined"
                                        style={styleTextFild}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        required
                                    />
                                    <br />

                                    <h5 style={{ fontWeight: "bold" }}>
                                        II. Fakta Fakta
                                    </h5>
                                    <ECardMsg title="Catatan">
                                        <p>Data terduga</p>
                                    </ECardMsg>
                                    <br />
                                    <TextField
                                        type="date"
                                        name="taggal"
                                        label="Pada Tanggal"
                                        variant="outlined"
                                        style={styleTextFild}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        required
                                    />
                                    <TextField
                                        type="time"
                                        name="pukul"
                                        label="Pukul"
                                        variant="outlined"
                                        style={styleTextFild}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        required
                                    />

                                    <TextField
                                        name="atas_nama"
                                        label="Atas Nama Sdr."
                                        variant="outlined"
                                        style={styleTextFild}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        required
                                    />
                                    <TextField
                                        name="alamat_terduga"
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
                                            <option>Pilih Desa</option>
                                            {stateDesa.map((item, i) => (
                                                <option
                                                    key={i}
                                                    value={item.id_kel}
                                                >
                                                    {item.nama}
                                                </option>
                                            ))}
                                        </Form.Control>
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Control
                                            as="select"
                                            name="jenis_narkotika"
                                            required
                                        >
                                            <option value="">
                                                Jenis Narkotika
                                            </option>
                                            <option value="Sabu">Sabu</option>
                                            <option value="Ganja">Ganja</option>
                                        </Form.Control>
                                    </Form.Group>
                                    <br />
                                    <ECardMsg title="Cara pengisian keterangan tambahan">
                                        <p>
                                            jika ada tambahan untuk menjelaskan
                                            terduga isi di bawah ini dalam
                                            bentuk list 1,2,3
                                        </p>
                                    </ECardMsg>

                                    <label>Keterangan Tambahan</label>
                                    <br />
                                    <CEditor
                                        HendlerVal={getValKet}
                                        val={
                                            ketTambahan != null
                                                ? ketTambahan
                                                : null
                                        }
                                    />
                                </div>
                                <div className="col-md-6">
                                    <br />
                                    <h5 style={{ fontWeight: "bold" }}>
                                        III. Pendapat Pelapor
                                    </h5>
                                    <ECardMsg title="Pendapat Pelapor">
                                        <p>
                                            Isi di bawah ini dalam bentuk list
                                            1,2,3
                                        </p>
                                    </ECardMsg>
                                    <br />
                                    <CEditor
                                        HendlerVal={getValPendapat}
                                        val={
                                            pendapatPelapor != null
                                                ? pendapatPelapor
                                                : null
                                        }
                                    />
                                    <div className="text-center  mt-2">
                                        <NavLink
                                            className="btn btn-secondary btn-sm mr-1"
                                            style={{ width: "48%" }}
                                            to={{
                                                pathname: "/Pelaporan",
                                            }}
                                            onClick={() => {
                                                window.location.reload();
                                            }}
                                        >
                                            Batal
                                        </NavLink>
                                        <button
                                            id="btn-saves"
                                            className="btn btn-primary btn-sm"
                                            data-case="insert"
                                            style={{ width: "48%" }}
                                        >
                                            Kirim Laporan
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </ECard>
                    </Form>
                </div>
            </article>
        </div>
    );
}
