import React, { useState, useEffect } from "react";
import axios from "axios";
import { base_url } from "../../constant/constant";
import { ECard, ECartTable } from "../../components/Card/Card";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import moment from "moment";
import Form from "react-bootstrap/Form";
import $ from "jquery";
import {
    genDelete,
    postAxiosFromData,
    postAxiosFromDataCallBack,
} from "../../Helpers/Axios-gen";

export default function Lapor() {
    const [getCase, setCase] = useState(1);
    const caseClick = (cases) => {
        setCase(cases);
    };
    return (
        <>
            <div className="row">
                <div className="col-md-12">
                    <ECard className="mb-2 text-left">
                        <button
                            className="btn btn-info btn-sm mr-1"
                            onClick={() => {
                                caseClick(1);
                            }}
                        >
                            Laporan Masuk
                        </button>
                        <button
                            className="btn btn-info btn-sm mr-1"
                            onClick={() => {
                                caseClick(3);
                            }}
                        >
                            Laporan Tidak Valid
                        </button>
                        <button
                            className="btn btn-info btn-sm mr-1"
                            onClick={() => {
                                caseClick(2);
                            }}
                        >
                            Laporan Di Terima
                        </button>
                    </ECard>
                </div>
            </div>
            <MsgLaporan cases={getCase} />
        </>
    );
}
function MsgLaporan(props) {
    const [getAllData, setAllData] = useState(null);
    useEffect(() => {
        getAllDataFunc(props.cases);
    }, [props.cases]);
    const getAllDataFunc = (cases) => {
        const axgetAllData = async () => {
            try {
                const casesData = cases != null ? cases : 1;
                const getData = await axios.get(
                    base_url + "api/getPelaporAllData/" + casesData
                );
                setAllData(getData.data);
            } catch (error) {
                console.error(error);
            }
        };
        return axgetAllData();
    };
    return (
        <>
            {getAllData != null
                ? getAllData.map((its, i) => {
                      return (
                          <ECard className="mb-2" key={i}>
                              <ECartTable
                                  title={
                                      <>
                                          <div
                                              style={{
                                                  marginBottom: 5,
                                              }}
                                          >
                                              {its.nama}
                                          </div>

                                          <div
                                              style={{
                                                  fontSize: 10,
                                                  fontWeight: "bold",
                                              }}
                                          >
                                              Kode : {its.kode}
                                          </div>
                                      </>
                                  }
                                  henlerParent={() => {
                                      if (its.msg == 0) {
                                          const formData = new FormData();
                                          formData.append("id", its.id);
                                          postAxiosFromDataCallBack(
                                              "api/updateOpenMsg",
                                              formData,
                                              (response) => {},
                                              true
                                          );
                                          getAllDataFunc(props.cases);
                                      }
                                  }}
                                  action={
                                      <div className="mr-2">
                                          <span className="mr-2">
                                              {" "}
                                              {moment(its.updated_at).format(
                                                  "YYYY-MM-DD"
                                              )}
                                          </span>
                                          <i
                                              className="fa fa-bell mr-1"
                                              style={{
                                                  color:
                                                      its.msg == 0
                                                          ? "red"
                                                          : "#ccc",
                                              }}
                                          ></i>
                                      </div>
                                  }
                              >
                                  <DetailPelaporan
                                      data={its}
                                      cases={props.cases}
                                      updateData={getAllDataFunc}
                                  />
                              </ECartTable>
                          </ECard>
                      );
                  })
                : ""}
        </>
    );
}

const DetailPelaporan = (props) => {
    const [show, setShow] = useState(false);
    const [getIdItems, setIdItems] = useState(null);
    const [upStatus, setUpStatus] = useState(null);
    const data = props.data;
    return (
        <div className="Contatent_container">
            <article className="Client-Contents-Pelaporan">
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
                                </ECard>
                                {props.cases == 1 && (
                                    <ECard
                                        title="Action"
                                        className="mt-3 text-center"
                                    >
                                        <button
                                            className="btn btn-info btn-sm mb-3 w-100"
                                            onClick={() => {
                                                setShow(true);
                                                setIdItems(data.id);
                                                setUpStatus(3);
                                            }}
                                        >
                                            Laporan Tidak Valid
                                        </button>
                                        <br />
                                        <button
                                            className="btn btn-info btn-sm mb-3 w-100"
                                            onClick={() => {
                                                setShow(true);
                                                setIdItems(data.id);
                                                setUpStatus(2);
                                            }}
                                        >
                                            Laporan Diterima
                                        </button>
                                        <br />
                                    </ECard>
                                )}
                                {props.cases > 1 && (
                                    <ECard
                                        title="Action"
                                        className="mt-3 text-center"
                                    >
                                        <button
                                            className="btn btn-info btn-sm mb-3 w-100"
                                            onClick={() => {
                                                setShow(true);
                                                const _id = {
                                                    id: data.id,
                                                    case: "delete",
                                                };
                                                genDelete(
                                                    "api/Pelaporan",
                                                    _id,
                                                    Funcresponse
                                                );
                                                setUpStatus(3);
                                            }}
                                        >
                                            Delete
                                        </button>
                                    </ECard>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </article>
            {/* modal */}
            <Modal
                show={show}
                onHide={() => {
                    setShow(false);
                    setIdItems(null);
                    setUpStatus(null);
                }}
                dialogClassName="modal-90w"
                aria-labelledby="example-custom-modal-styling-title"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-custom-modal-styling-title">
                        Tinggalkan pesan
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Pesan</Form.Label>
                        <Form.Control as="textarea" rows={3} name="msgs" />
                    </Form.Group>
                    <Modal.Footer>
                        <Button variant="secondary">Close</Button>
                        <Button
                            variant="primary"
                            onClick={() => {
                                const formData = new FormData();
                                formData.append("id", getIdItems);
                                formData.append(
                                    "pesan",
                                    document.querySelector("[name='msgs']")
                                        .value
                                );
                                formData.append("status", upStatus);
                                formData.append("casesUpdate","modal")
                                postAxiosFromData(
                                    "api/updateStatus",
                                    formData,
                                    true
                                );
                            }}
                        >
                            Comfirmasi
                        </Button>
                    </Modal.Footer>
                </Modal.Body>
            </Modal>
        </div>
    );
};

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
