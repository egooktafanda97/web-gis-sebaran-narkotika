import React, {
    useEffect,
    useState,
    useCallback,
    useRef,
    forwardRef,
} from "react";
import {
    GoogleMap,
    useJsApiLoader,
    Polygon,
    Marker,
    Rectangle,
    InfoWindow,
} from "@react-google-maps/api";
import "./style.scss";
import { base_url } from "../../constant/constant";
import { ECard, ECartTable } from "../../components/Card/Card";
import { mozambique } from "../../constant/dataMap.js";
import useDynamicRefs from "use-dynamic-refs";
import Swal from "sweetalert2";
import axios from "axios";
import BarCart from "../../components/Chart/BarCart";
import { useLocation } from "react-router";
import { useReactToPrint } from "react-to-print";
import PropTypes from "prop-types";
import moment from "moment";
export default function DetailTersangka() {
    const location = useLocation();
    const getLocationParams = () => {
        const url = location.pathname.substr(1).split("/");
        return url;
    };
    const RefPrint = useRef(null);
    const [getlocation, setLocation] = useState(getLocationParams());
    const [getData, setdata] = useState([]);
    useEffect(() => {
        const getdata = async () => {
            const getData = await axios.get(
                base_url + "api/tersangkaById/" + getlocation[1]
            );
            setdata(getData.data);
        };
        getdata();
    }, []);
    const handlePrint = useReactToPrint({
        content: () => RefPrint.current,
    });
    return (
        <div className="row mt-3">
            <div className="col-md-8 mb-1">
                <ECard
                    title={
                        <div className="text-right">
                            <button
                                className="btn btn-secondary btn-sm"
                                onClick={handlePrint}
                            >
                                <i className="fa fa-print"></i>
                            </button>
                        </div>
                    }
                >
                    <DetailData data={getData} />
                    <div
                        style={{
                            display: "none",
                        }}
                    > <DetailDataPrint data={getData} ref={RefPrint} /></div>
                   
                </ECard>
            </div>
            <div className="col-md-4 mb-1">
                {/* <ECard></ECard> */}
                <MapsComponent />
            </div>
        </div>
    );
}

const DetailDataPrint = forwardRef((props, ref) => {
    const [isReady, setReady] = useState(false);
    const [getData, setData] = useState(null);
    useEffect(() => {
        setData(props.data);
    }, [props.data, setData, getData]);

    const componentData = () => {
        let result_ = [];
        if (getData != null) {
            result_ = [
                {
                    key: "Nama",
                    val: getData.nama,
                },
                {
                    key: "Tempat Tanggal Lahir",
                    val: getData.tempat_lahir + " " + getData.tanggal_lahir,
                },
                {
                    key: "Agama",
                    val: getData.agama,
                },
                {
                    key: "Pekerjaan",
                    val: getData.pekerjaan,
                },
                {
                    key: "Status",
                    val: getData.status,
                },
                {
                    key: "Pendidikan",
                    val: getData.pendidikan,
                },
                {
                    key: "kewarganegaraan",
                    val: getData.kewarganegaraan,
                },
                {
                    key: "Alamat",
                    val: getData.alamat,
                },
                {
                    key: "kecamatan",
                    val: getData.nama_kec,
                },
                {
                    key: "Desa",
                    val: getData.nama_desa,
                },
                {
                    key: "Jenis Narkotika",
                    val: getData.jenis_narkotika,
                },
                {
                    key: "Tanggal Penahanan",
                    val: getData.tgl_penahanan,
                },
                {
                    key: "Keterangan",
                    val: getData.keterangan,
                },
            ];
        }
        return result_;
    };
    const tbDetail = (dataImport) => {
        const StyleSet = {
            tdKey: {
                width: "30%",
                paddingTop: 5,
                paddingBottom: 5,
                fontWeight: "bold",
                fontSize: 30,
            },
            ttk: {
                width: "2%",
                paddingTop: 5,
                paddingBottom: 5,
                fontSize: 30,
            },
            tdVal: {
                paddingLeft: 3,
                paddingTop: 5,
                paddingBottom: 5,
                fontSize: 30,
            },
        };
        return (
            <table style={{ width: "100%" }}>
                <thead>
                    {dataImport.length > 0 &&
                        dataImport.map((keyVal, i) => (
                            <tr
                                key={i}
                                style={{ borderBottom: "1px solid #ccc" }}
                            >
                                <td valign="top" style={StyleSet.tdKey}>
                                    {keyVal.key}
                                </td>
                                <td valign="top" style={StyleSet.ttk}>
                                    :
                                </td>
                                <td valign="top" style={StyleSet.tdVal}>
                                    {keyVal.val}
                                </td>
                            </tr>
                        ))}
                </thead>
            </table>
        );
    };

    const tbHeader = (dataImport) => {
        const StyleSet = {
            tdKey: {
                width: "35%",
                paddingTop: 5,
                paddingBottom: 5,
                fontWeight: "bold",
                fontSize: 20,
            },
            ttk: {
                width: "2%",
                paddingTop: 5,
                paddingBottom: 5,
                fontSize: 20,
            },
            tdVal: {
                paddingLeft: 3,
                paddingTop: 5,
                paddingBottom: 5,
                fontSize: 20,
            },
        };
        return (
            <table style={{ width: "100%" }}>
                <thead>
                    {dataImport.length > 0 &&
                        dataImport.map((keyVal, i) => (
                            <tr key={i}>
                                <td valign="top" style={StyleSet.tdKey}>
                                    {keyVal.key}
                                </td>
                                <td valign="top" style={StyleSet.ttk}>
                                    :
                                </td>
                                <td valign="top" style={StyleSet.tdVal}>
                                    {keyVal.val}
                                </td>
                            </tr>
                        ))}
                </thead>
            </table>
        );
    };
    const Style = {
        fontHeadr: {
            fontSize: 35,
        },
        fontcontent: {
            fontSize: 30,
        },
    };
    return (
        <div ref={ref} className="mt-5">
            <div
                className="text-center pb-1"
                style={{
                    borderBottom: "1px solid #ccc",
                }}
            >
                <h6 className="m-0" style={Style.fontHeadr}>
                    <strong>KEPOLISIAN NEGARA REPUBLIK INDONESIA</strong>
                </h6>
                <h6 className="m-0" style={Style.fontHeadr}>
                    <strong>DAERAH RIAU</strong>
                </h6>
                <h6 className="m-0" style={Style.fontHeadr}>
                    <strong>RESOR KUANTAN SINGINGI</strong>
                </h6>
            </div>
            <div className="header-rep text-center mt-3">
                <h6 className="m-0">
                    <strong
                        style={{
                            borderBottom: "1px solid #ccc",
                            fontSize: 30,
                        }}
                    >
                        LAPORAN PENYALAH GUNAAN NARKOTIKA
                    </strong>
                </h6>
            </div>
            <br />
            <div
                className="header-rep text-left mt-3"
                style={Style.fontcontent}
            >
                {tbHeader([
                    {
                        key: "Surat Perintah Penyidik",
                        val:
                            getData != null
                                ? getData.surat_perintah_penyidik
                                : "-",
                    },
                    {
                        key: "Surat Perintah Penahanan",
                        val:
                            getData != null
                                ? getData.surat_perintah_penahanan
                                : "-",
                    },
                ])}
            </div>
            <br />
            <div className="data-penyalahgunaan" style={{ marginLeft: 20 }}>
                {tbDetail(componentData())}
                <div className="text-right" style={{ marginTop: 150 }}>
                    <span style={{ fontSize: 30 }}>
                        Teluk Kuantan {moment(new Date()).format("DD/MM/YYYY")}
                    </span>
                </div>
            </div>
        </div>
    );
});

const DetailData = (props) => {
    const [isReady, setReady] = useState(false);
    const [getData, setData] = useState(null);
    useEffect(() => {
        setData(props.data);
    }, [props.data, setData, getData]);

    const componentData = () => {
        let result_ = [];
        if (getData != null) {
            result_ = [
                {
                    key: "Nama",
                    val: getData.nama,
                },
                {
                    key: "Tempat Tanggal Lahir",
                    val: getData.tempat_lahir + " " + getData.tanggal_lahir,
                },
                {
                    key: "Agama",
                    val: getData.agama,
                },
                {
                    key: "Pekerjaan",
                    val: getData.pekerjaan,
                },
                {
                    key: "Status",
                    val: getData.status,
                },
                {
                    key: "Pendidikan",
                    val: getData.pendidikan,
                },
                {
                    key: "kewarganegaraan",
                    val: getData.kewarganegaraan,
                },
                {
                    key: "Alamat",
                    val: getData.alamat,
                },
                {
                    key: "kecamatan",
                    val: getData.nama_kec,
                },
                {
                    key: "Desa",
                    val: getData.nama_desa,
                },
                {
                    key: "Jenis Narkotika",
                    val: getData.jenis_narkotika,
                },
                {
                    key: "Tanggal Penahanan",
                    val: getData.tgl_penahanan,
                },
                {
                    key: "Keterangan",
                    val: getData.keterangan,
                },
            ];
        }
        return result_;
    };
    const tbDetail = (dataImport) => {
        const StyleSet = {
            tdKey: {
                width: "30%",
                paddingTop: 5,
                paddingBottom: 5,
                fontWeight: "bold",
            },
            ttk: {
                width: "2%",
                paddingTop: 5,
                paddingBottom: 5,
            },
            tdVal: {
                paddingLeft: 3,
                paddingTop: 5,
                paddingBottom: 5,
            },
        };
        return (
            <table style={{ width: "100%" }}>
                <thead>
                    {dataImport.length > 0 &&
                        dataImport.map((keyVal, i) => (
                            <tr
                                key={i}
                                style={{ borderBottom: "1px solid #ccc" }}
                            >
                                <td valign="top" style={StyleSet.tdKey}>
                                    {keyVal.key}
                                </td>
                                <td valign="top" style={StyleSet.ttk}>
                                    :
                                </td>
                                <td valign="top" style={StyleSet.tdVal}>
                                    {keyVal.val}
                                </td>
                            </tr>
                        ))}
                </thead>
            </table>
        );
    };

    const tbHeader = (dataImport) => {
        const StyleSet = {
            tdKey: {
                width: "35%",
                paddingTop: 5,
                paddingBottom: 5,
                fontWeight: "bold",
            },
            ttk: {
                width: "2%",
                paddingTop: 5,
                paddingBottom: 5,
            },
            tdVal: {
                paddingLeft: 3,
                paddingTop: 5,
                paddingBottom: 5,
            },
        };
        return (
            <table style={{ width: "100%" }}>
                <thead>
                    {dataImport.length > 0 &&
                        dataImport.map((keyVal, i) => (
                            <tr key={i}>
                                <td valign="top" style={StyleSet.tdKey}>
                                    {keyVal.key}
                                </td>
                                <td valign="top" style={StyleSet.ttk}>
                                    :
                                </td>
                                <td valign="top" style={StyleSet.tdVal}>
                                    {keyVal.val}
                                </td>
                            </tr>
                        ))}
                </thead>
            </table>
        );
    };

    return (
        <div className="mt-5">
            <div
                className="text-center pb-1"
                style={{
                    borderBottom: "1px solid #ccc",
                }}
            >
                <h6 className="m-0">
                    <strong>KEPOLISIAN NEGARA REPUBLIK INDONESIA</strong>
                </h6>
                <h6 className="m-0">
                    <strong>DAERAH RIAU</strong>
                </h6>
                <h6 className="m-0">
                    <strong>RESOR KUANTAN SINGINGI</strong>
                </h6>
            </div>
            <div className="header-rep text-center mt-3">
                <h6 className="m-0">
                    <strong
                        style={{
                            borderBottom: "1px solid #ccc",
                            fontSize: 12,
                        }}
                    >
                        LAPORAN PENYALAH GUNAAN NARKOTIKA
                    </strong>
                </h6>
            </div>
            <br />
            <div className="header-rep text-left mt-3">
                {tbHeader([
                    {
                        key: "Surat Perintah Penyidik",
                        val:
                            getData != null
                                ? getData.surat_perintah_penyidik
                                : "-",
                    },
                    {
                        key: "Surat Perintah Penahanan",
                        val:
                            getData != null
                                ? getData.surat_perintah_penahanan
                                : "-",
                    },
                ])}
            </div>
            <br />
            <div className="data-penyalahgunaan" style={{ marginLeft: 20 }}>
                {tbDetail(componentData())}
            </div>
        </div>
    );
};

// ////////////// maps Komponent /////////////////////////////
function MapsComponent() {
    const containerStyle = {
        width: "100%",
        height: "250px",
    };
    const location = useLocation();
    const getLocationParams = () => {
        const url = location.pathname.substr(1).split("/");
        return url;
    };
    const [getlocation, setLocation] = useState(getLocationParams());
    const [getData, setdata] = useState([]);
    const { isLoaded } = useJsApiLoader({
        id: "google-map-script",
        googleMapsApiKey: "AIzaSyD_tAQD36pKp9v4at5AnpGbvBUsLCOSJx8",
    });
    const [map, setMap] = useState(null);
    const center = { lat: -0.49928625086774725, lng: 101.53676257465202 };
    const onLoad = useCallback(function callback(map) {
        const bounds = new window.google.maps.LatLngBounds();
        setMap(map);
    }, []);
    const onUnmount = useCallback(function callback(map) {
        setMap(null);
    }, []);
    const handleOut = (e, i) => {};
    useEffect(() => {
        const getdata = async () => {
            const getData = await axios.get(
                base_url + "api/tersangkaById/" + getlocation[1]
            );
            mozambique.features.map((items, i_) => {
                if (items.properties.ID == getData.data.kecamatan) {
                    setdata({
                        data: getData.data,
                        polygon: items.geometry.coordinates[0],
                        dataMap: items,
                    });
                }
            });
        };
        getdata();
    }, []);
    const polygons = () => {
        const bounds = new window.google.maps.LatLngBounds();
        const objItem = [];
        const polygonCoords = [];
        getData.polygon.map((it2, i__) => {
            objItem.push({
                lat: it2[1],
                lng: it2[0],
            });
            polygonCoords.push(new window.google.maps.LatLng(it2[1], it2[0]));
        });
        return [objItem, polygonCoords];
    };
    return isLoaded ? (
        <ComponentMap
            kecamatan={
                getData.dataMap != undefined &&
                getData.dataMap.properties.KECAMATAN
            }
            containerStyle={containerStyle}
            center={center}
            onLoad={onLoad}
            onUnmount={onUnmount}
            path={getData.data != undefined && polygons()[1]}
        />
    ) : (
        <></>
    );
}

const ComponentMap = (props) => {
    return (
        <ECard title={props.kecamatan}>
            <GoogleMap
                id="marker-example"
                mapContainerStyle={props.containerStyle}
                zoom={8}
                center={props.center}
                onLoad={props.onLoad}
                onUnmount={props.onUnmount}
            >
                <Polygon
                    onLoad={props.onLoad}
                    paths={props.path}
                    options={{
                        fillColor: "red",
                        fillOpacity: 0.5,
                        strokeColor: "white",
                        strokeOpacity: 1,
                        strokeWeight: 2,
                        zIndex: 999,
                    }}
                />
            </GoogleMap>
        </ECard>
    );
};

const ComponetDeskripsi = (props) => {};
