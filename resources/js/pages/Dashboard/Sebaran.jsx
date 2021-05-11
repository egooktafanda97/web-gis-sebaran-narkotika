import React, { useEffect, useState, useCallback, useRef } from "react";
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
import Circle from "../../components/Chart/Circle";
const containerStyle = {
    width: "100%",
    height: "450px",
};

function hexToRgbA(hex, opacity) {
    var c;
    if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
        c = hex.substring(1).split("");
        if (c.length == 3) {
            c = [c[0], c[0], c[1], c[1], c[2], c[2]];
        }
        c = "0x" + c.join("");
        return (
            "rgba(" +
            [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(",") +
            "," +
            opacity +
            ")"
        );
    }
    throw new Error("Bad Hex");
}

const colors = [
    "#FF6633",
    "#FFB399",
    "#FF33FF",
    "#FFFF99",
    "#00B3E6",
    "#E6B333",
    "#3366E6",
    "#999966",
    "#99FF99",
    "#B34D4D",
    "#80B300",
    "#809900",
    "#E6B3B3",
    "#6680B3",
    "#66991A",
];

export default function Sebaran(props) {
    const { isLoaded } = useJsApiLoader({
        id: "google-map-script",
        googleMapsApiKey: "AIzaSyD_tAQD36pKp9v4at5AnpGbvBUsLCOSJx8",
    });
    const [map, setMap] = useState(null);
    const [hovers, setHovers] = useState(null);
    const polygonRef = useRef(null);
    const [getRef, setRef] = useDynamicRefs();
    const [kecamatan, setKecamatan] = useState([]);
    const [bgDes, setBgDes] = useState(null);
    const [mapActives, setMapActives] = useState(null);
    const [dataKecamatan, setDataKecamatan] = useState([]);
    const [chartDataPerTahun, setChartDataPerTahun] = useState(null);
    const [chartDataPerKec, setChartDataPerKec] = useState(null);
    const [aritmatika, setAritmatika] = useState(null);
    // ////////////////////////////////////////////////////////////////////////////////////////////////

    const center = { lat: -0.49928625086774725, lng: 101.53676257465202 };
    const options = {
        fillColor: "lightblue",
        fillOpacity: 1,
        strokeColor: "red",
        strokeOpacity: 0.5,
        strokeWeight: 2,
        zIndex: 999,
    };

    const onLoad = useCallback(function callback(map) {
        const bounds = new window.google.maps.LatLngBounds();
        setMap(map);
    }, []);
    const onUnmount = useCallback(function callback(map) {
        setMap(null);
    }, []);

    const onMarkerClick = (evt) => {
        console.log(evt);
    };

    const handleMove = (e, _i, data) => {
        setHovers(data);
        getRef(_i).current.state.polygon.setOptions({
            fillColor: colors[_i == "zero" ? 0 : _i],
            fillOpacity: 1,
            strokeColor: "red",
            zIndex: 999999,
        });
        setBgDes(colors[_i == "zero" ? 0 : _i]);
        setMapActives(_i == "zero" ? 0 : _i);
        // if (hovers != null && hovers.data.id_kec != data.data.id_kec) {
        //     dataPerTahun(data.data.id_kec);
        // }
    };
    const polygonClick = (e, i, data) => {
        dataPerTahun(data.data.id_kec);
    };
    const handleOut = (e, i) => {
        setBgDes(null);
        setMapActives(null);
        // setChartDataPerTahun(null);
        getRef(i).current.state.polygon.setOptions({
            fillColor: i == "zero" ? colors[0] : colors[i],
            strokeColor: "white",
        });
        console.log(getRef);
    };

    useEffect(() => {
        const data_z = [];
        mozambique.features.map((items, i__) => {
            const getJumlahKaus = async (id_kec) => {
                const counts = await axios.post(
                    base_url + "api/getJumlahKaus",
                    {
                        id_kec: id_kec,
                    }
                );
                data_z.push({ jml: counts.data, data: items });
            };
            getJumlahKaus(items.properties.ID);
        });
        setDataKecamatan(data_z);

        const dataPerKec = async () => {
            const getData = await axios.get("api/getJumlahPengguna");
            // setChartDataPerKec(getData.data);
            const keyData = [];
            const valData = [];
            getData.data.map((d, is) => {
                keyData.push(d.kecamatan);
                valData.push(d.jumlah);
            });
            setChartDataPerKec({ kecamatan: keyData, jumlah: valData });
        };
        dataPerKec();
    }, []);

    const dataPerTahun = (kec_id) => {
        const getData = async (id_kec) => {
            const get = await axios.get(
                base_url + "api/getJumlahKaus_pertahun/" + id_kec
            );
            const tahun = [];
            const jml = [];
            const kec = [];
            get.data.forEach((element) => {
                tahun.push(element.tahun);
                jml.push(element.jumlah);
                kec.push(element.kecamatan);
            });
            // console.log({ tahun: tahun, jumlah: jml });
            setChartDataPerTahun({ tahun: tahun, jumlah: jml });
            props.dataCallback({ tahun: tahun, jumlah: jml, kecamatan: kec });
        };
        getData(kec_id);
    };
    const Maths = (get) => {
        let jml = [];
        dataKecamatan.forEach((element) => {
            jml.push(element.jml);
        });
        switch (get) {
            case "max":
                return jml.length > 0 ? Math.max(...jml) : [];
                break;
            case "min":
                break;
            case "rate":
                var _jml = [Math.max(...jml), Math.min(...jml)];
                var avg;
                var sum;
                if (_jml.length) {
                    sum = _jml.reduce(function (a, b) {
                        return a + b;
                    });
                    avg = sum / _jml.length;
                }
                return avg;
                break;
            default:
                break;
        }
    };
    const swal = () => {
        Swal.fire({
            title: "Please Wait !",
            html: "Loading....",
            didOpen: () => {
                Swal.showLoading();
            },
        });
    };

    return isLoaded ? (
        <div>
            {Swal.close()}
            <GoogleMap
                id="marker-example"
                mapContainerStyle={containerStyle}
                zoom={9}
                center={center}
                onLoad={onLoad}
                onUnmount={onUnmount}
            >
                {dataKecamatan.map((_its, i) => {
                    const items = _its.data;
                    if (true) {
                        const bounds = new window.google.maps.LatLngBounds();
                        const objItem = [];
                        const polygonCoords = [];
                        items.geometry.coordinates[0].map((it2, i_) => {
                            objItem.push({
                                lat: it2[1],
                                lng: it2[0],
                            });
                            polygonCoords.push(
                                new window.google.maps.LatLng(it2[1], it2[0])
                            );
                        });
                        for (var io = 0; io < polygonCoords.length; io++) {
                            bounds.extend(polygonCoords[io]);
                        }
                        const propsData = {
                            data: {
                                Mapbounds: {
                                    lat: bounds.getCenter().lat(),
                                    lng: bounds.getCenter().lng(),
                                },
                                NamaKec: items.properties.KECAMATAN,
                                id_kec: items.properties.ID,
                            },
                        };
                        return (
                            <span key={i}>
                                {hovers != null && i == 1 ? (
                                    <Marker
                                        onClick={onMarkerClick}
                                        visible={false}
                                        position={hovers.data.Mapbounds}
                                    >
                                        <InfoWindow
                                            options={{
                                                disableAutoPan: true,
                                            }}
                                            position={hovers.data.Mapbounds}
                                        >
                                            <div>
                                                <span
                                                    style={{
                                                        fontSize: 8,
                                                    }}
                                                >
                                                    {hovers.data.NamaKec}
                                                </span>
                                            </div>
                                        </InfoWindow>
                                    </Marker>
                                ) : (
                                    ""
                                )}

                                <Polygon
                                    ref={setRef(i == 0 ? "zero" : i)}
                                    onClick={(e) => {
                                        polygonClick(
                                            e,
                                            i == 0 ? "zero" : i,
                                            propsData
                                        );
                                    }}
                                    onMouseMove={(e) => {
                                        handleMove(
                                            e,
                                            i == 0 ? "zero" : i,
                                            propsData
                                        );
                                    }}
                                    onMouseOut={(e) => {
                                        handleOut(e, i == 0 ? "zero" : i);
                                    }}
                                    onLoad={onLoad}
                                    paths={objItem}
                                    options={{
                                        fillColor:
                                            _its.jml == Maths("max")
                                                ? "red"
                                                : _its.jml >= Maths("rate") &&
                                                  _its.jml < Maths("max")
                                                ? "yellow"
                                                : _its.jml < Maths("rate") &&
                                                  _its.jml > 0
                                                ? "blue"
                                                : _its == 0
                                                ? "green"
                                                : "green",
                                        fillOpacity: 0.5,
                                        strokeColor: "white",
                                        strokeOpacity: 1,
                                        strokeWeight: 2,
                                        zIndex: 999,
                                    }}
                                />
                            </span>
                        );
                    }
                })}
            </GoogleMap>
        </div>
    ) : (
        <>{swal()}</>
    );
}
