import React, { useState, useEffect } from "react";
import { useLocation } from "react-router";
import queryString from "query-string";
import { ECard, ECardMsg, ECartTable } from "../../components/Card/Card";
import { base_url } from "../../constant/constant";
import {
    postAxiosFromData,
    postAxiosFromDataCallBack,
} from "../../Helpers/Axios-gen";
import {
    Router,
    Route,
    Link,
    Switch,
    NavLink,
    useHistory,
} from "react-router-dom";
import moment from "moment";

export default function DetailPelaporan(props) {
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

    // ////////////////////////////////////////
    const hendlerCallBack = (response) => {
        window.location.href = base_url + "Finish/" + getLocationParams()[1];
    };

    const finish = () => {
        const formData = new FormData();
        formData.append("status", 1);
        formData.append("id", getLocationParams()[1]);
        formData.append("case", "update");
        formData.append("seendEmail", true);
        postAxiosFromDataCallBack(
            "api/Pelaporan",
            formData,
            hendlerCallBack,
            false
        );
    };
    return (
        <div className="Contatent_container">
            <div className="TopBar">
                <div className="Icon-Menu">
                    <span className="las la-bars"></span>
                </div>
                <h4>Detail Laporan</h4>
            </div>
            {console.log(data)}
            <article
                className="Client-Contents-Pelaporan"
                style={{ paddingTop: 100 }}
            >
                <div className="" style={{ width: "100%", margin: 0 }}>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-8">
                                <ECard>
                                    <div
                                        className="text-center pb-1"
                                        style={{
                                            borderBottom: "1px solid #ccc",
                                        }}
                                    >
                                        <h6 className="m-0">
                                            KEPOLISIAN NEGARA REPUBLIK INDONESIA
                                        </h6>
                                        <h6 className="m-0">DAERAH RIAU</h6>
                                        <h6 className="m-0">
                                            RESOR KUANTAN SINGINGI
                                        </h6>
                                    </div>
                                    <div className="header-rep text-center mt-3">
                                        <h6 className="m-0">
                                            <strong
                                                style={{
                                                    borderBottom:
                                                        "1px solid #ccc",
                                                }}
                                            >
                                                LAPORAN INSFORMASI
                                            </strong>
                                        </h6>
                                        <h6 className="m-0">
                                            Nomor : R/LI/-/XI/
                                            {new Date().getFullYear()}
                                            /Sat Res Narkoba
                                        </h6>
                                    </div>
                                    <div className="hal text-left">
                                        <p className="m-0">Bidang : KAM</p>
                                        <p className="m-0">
                                            Hal : Peredaran dan penyalahgunaan
                                            NARKOTIKA
                                        </p>
                                    </div>
                                    <br />
                                    <div className="pendahuluan">
                                        <h6>
                                            <strong>I. PENDAHULUAN</strong>
                                        </h6>
                                        <div
                                            style={{
                                                width: "100%",
                                                paddingLeft: 20,
                                            }}
                                        >
                                            <table>
                                                <tbody>
                                                    <tr>
                                                        <td width="30%">
                                                            1. Sumber Baket
                                                        </td>
                                                        <td width="1%"></td>
                                                        <td width="40%"></td>
                                                    </tr>
                                                    <tr>
                                                        <td
                                                            width="30%"
                                                            style={{
                                                                paddingLeft: 20,
                                                            }}
                                                        >
                                                            a. Nama
                                                        </td>
                                                        <td width="1%">:</td>
                                                        <td width="40%">
                                                            {data.nama}
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td
                                                            width="30%"
                                                            style={{
                                                                paddingLeft: 20,
                                                            }}
                                                        >
                                                            b. Alamat
                                                        </td>
                                                        <td width="1%">:</td>
                                                        <td width="40%">
                                                            {data.alamat}
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td width="30%">
                                                            2. Cara mendapatkan
                                                            baket
                                                        </td>
                                                        <td width="1%">:</td>
                                                        <td width="40%">
                                                            Media Online /
                                                            Pelaporan Online
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td width="30%">
                                                            3. Hubungan Dengan
                                                            Sumber
                                                        </td>
                                                        <td width="1%">:</td>
                                                        <td width="40%">
                                                            {data.hubungan}
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td width="30%">
                                                            2. Waktu Dan Tempat
                                                        </td>
                                                        <td width="1%">:</td>
                                                        <td width="40%">
                                                            {data.tempat_lapor}{" "}
                                                            {moment(
                                                                data.updated_at
                                                            ).format(
                                                                "YYYY-MM-DD"
                                                            )}
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td width="30%">
                                                            2. Nilai
                                                        </td>
                                                        <td width="1%">:</td>
                                                        <td width="40%">
                                                            {data.nilai}
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <div className="fakta mt-4">
                                        <h6>
                                            <strong>II. Fakta Fakta</strong>
                                        </h6>
                                        <div
                                            style={{
                                                width: "100%",
                                                paddingLeft: 20,
                                            }}
                                        >
                                            <table>
                                                <tbody>
                                                    <tr>
                                                        <td
                                                            width="5%"
                                                            valign="top"
                                                        >
                                                            1.
                                                        </td>
                                                        <td
                                                            width="95%"
                                                            valign="top"
                                                        >
                                                            Pada hari ...
                                                            tanggal{" "}
                                                            {data.taggal}{" "}
                                                            sekitar pukul{" "}
                                                            {data.pukul} WIB
                                                            berdasarkan
                                                            informasi dari
                                                            sumber bahwa di
                                                            daerah kuansing ada
                                                            pelaku di duga
                                                            penyalah gunaan
                                                            narkotika jenis{" "}
                                                            <strong>
                                                                {
                                                                    data.jenis_narkotika
                                                                }
                                                            </strong>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td
                                                            width="5%"
                                                            valign="top"
                                                        >
                                                            2.
                                                        </td>
                                                        <td
                                                            width="95%"
                                                            valign="top"
                                                        >
                                                            Sumber menjelaskan
                                                            bahwa pelaku adalah
                                                            sdr {data.atas_nama}{" "}
                                                            desa{" "}
                                                            {data.nama_desa}{" "}
                                                            kecamatan{" "}
                                                            {data.nama_kec}{" "}
                                                            kabupaten Kuantan
                                                            Singingi
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            <br />
                                            <strong>
                                                Keterangan Tambahan :
                                            </strong>
                                            <br />
                                            <div
                                                dangerouslySetInnerHTML={{
                                                    __html:
                                                        data.keterangan_tambahan,
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div className="pendapat mt-4">
                                        <h6>
                                            <strong>
                                                II. PENDAPAT PELAPOR
                                            </strong>
                                        </h6>
                                        <div
                                            style={{
                                                width: "100%",
                                                paddingLeft: 20,
                                            }}
                                        >
                                            <div
                                                dangerouslySetInnerHTML={{
                                                    __html: data.pendapat,
                                                }}
                                            />
                                        </div>
                                    </div>
                                </ECard>
                            </div>
                            <div className="col-md-4">
                                <ECard title="Data Pelapor">
                                    <Deskripsi
                                        keyProps="NIK"
                                        valueProps={data.nik}
                                        bg={null}
                                    />
                                    <Deskripsi
                                        keyProps="Nama"
                                        valueProps={data.nama}
                                        bg={null}
                                    />
                                    <Deskripsi
                                        keyProps="Alamat"
                                        valueProps={data.alamat}
                                        bg={null}
                                    />
                                    <Deskripsi
                                        keyProps="Jenis Klamin"
                                        valueProps={data.jekel}
                                        bg={null}
                                    />
                                    <Deskripsi
                                        keyProps="Email"
                                        valueProps={data.email}
                                        bg={null}
                                    />
                                    <Deskripsi
                                        keyProps="Nomor Telepon"
                                        valueProps={data.no_hp}
                                        bg={null}
                                    />
                                    <div className="mt-5 text-right">
                                        {data.status == 0 ? (
                                            <>
                                                <NavLink
                                                    to={{
                                                        pathname: "/Pelaporan",
                                                    }}
                                                    className="btn btn-danger btn-sm mr-1"
                                                >
                                                    Batal
                                                </NavLink>
                                                <NavLink
                                                    to={{
                                                        pathname: "/Pelaporan",
                                                        state: {
                                                            id: data.id,
                                                        },
                                                    }}
                                                    className="btn btn-success btn-sm mr-1"
                                                >
                                                    Edit
                                                </NavLink>
                                                <button
                                                    onClick={finish}
                                                    className="btn btn-primary btn-sm mr-1"
                                                >
                                                    Kirim
                                                </button>
                                            </>
                                        ) : (
                                            <NavLink
                                                to={{
                                                    pathname: "/Pelaporan",
                                                }}
                                                className="btn btn-secondary btn-sm mr-1"
                                            >
                                                Kembali
                                            </NavLink>
                                        )}
                                    </div>
                                </ECard>
                            </div>
                        </div>
                    </div>
                </div>
            </article>
        </div>
    );
}

const Deskripsi = (props) => {
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "space-between",
                borderBottom: "1px solid #ccc",
                marginBottom: 5,
                background: props.bg != null ? props.bg : "#fff",
                paddingLeft: 5,
            }}
        >
            <div>
                <span
                    style={
                        props.keyStyle != undefined
                            ? props.keyStyle
                            : { fontWeight: "bold", fontSize: 10 }
                    }
                >
                    {props.keyProps}
                </span>
            </div>
            <span style={{ fontWeight: "bold", fontSize: 10 }}>
                {props.valueProps}
            </span>
        </div>
    );
};
