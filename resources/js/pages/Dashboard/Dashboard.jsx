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
import { ECard, ECardMsg, ECartTable } from "../../components/Card/Card";
import { mozambique } from "../../constant/dataMap.js";
import useDynamicRefs from "use-dynamic-refs";
import Swal from "sweetalert2";
import axios from "axios";
import BarCart from "../../components/Chart/BarCart";
import Circle from "../../components/Chart/Circle";
import MapsSebaran from "./Sebaran";
import MultyLine from "../../components/Chart/MultyLine";
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
const Dashboard = () => {
    const [chartDataPerTahun, setChartDataPerTahun] = useState(null);
    const [loading, setLoading] = useState(false);
    const [dataset, setDataSet] = useState(null);
    const [getTahun, setTahun] = useState([]);
    const hendleChartDataPerTahun = (data) => {
        setChartDataPerTahun(data);
    };
    useEffect(() => {
        const getData = async () => {
            setLoading(true);
            try {
                const get = await axios.get(base_url + "api/getAllKasus");
                setLoading(false);
                const compileData = [];
                get.data.reponse.map((result, i) => {
                    // console.log(result);
                    compileData.push({
                        label: result.kecamatan,
                        bgLine: colors[i],
                        data: result.jumlah,
                    });
                });
                setDataSet(compileData);
                setTahun(get.data.tahun);
            } catch (e) {
                console.log(e.message);
            }
        };
        getData();
    }, []);
    const dataSet = [
        {
            label: "l",
            bgLine: "red",
            data: [9, 8, 7, 6, 5, 4, 3, 2, 1],
        },
    ];
    return (
        <div className="row">
            <div className="col-lg-8 mb-1">
                <ECard
                    style={{
                        height: 500,
                    }}
                >
                    <MapsSebaran dataCallback={hendleChartDataPerTahun} />
                    <div
                        style={{
                            position: "relative",
                            top: -150,
                            display: "inline-block",
                        }}
                    >
                        <div
                            style={{
                                background: "rgba(255,255,255,0.5)",
                                padding: 5,
                                display: "inline-block",
                                marginLeft: 5,
                            }}
                        >
                            <Deskripsi
                                ColorMarker={`red`}
                                keyProps={"Kasus Tertinggi "}
                                keyStyle={{
                                    fontSize: 10,
                                }}
                            />
                            <Deskripsi
                                ColorMarker={`yellow`}
                                keyProps={"Kasus Sedang"}
                                keyStyle={{
                                    fontSize: 10,
                                }}
                            />
                            <Deskripsi
                                ColorMarker={`blue`}
                                keyProps={"kasus Terendah"}
                                keyStyle={{
                                    fontSize: 10,
                                }}
                            />
                            <Deskripsi
                                ColorMarker={`green`}
                                keyProps={"Belum Ada Kasus"}
                                keyStyle={{
                                    fontSize: 10,
                                }}
                            />
                        </div>
                    </div>
                </ECard>
                <ECard className="mt-5" title="chart penyalah gunaan narkotoka dari tahun 2015">
                    <MultyLine
                        dataSet={dataset != null ? dataset : []}
                        label={getTahun}
                    />
                </ECard>
            </div>
            <div className="col-lg-4 mb-1">
                <ECard>
                    <ECartTable title="Garfik" visible={true}>
                        {chartDataPerTahun != null ? (
                            <>
                                <BarCart
                                    label={chartDataPerTahun.tahun}
                                    value={chartDataPerTahun.jumlah}
                                />
                                <ECardMsg>
                                    Pada Tahun{" "}
                                    {
                                        chartDataPerTahun.tahun[
                                            chartDataPerTahun.tahun.length - 1
                                        ]
                                    }{" "}
                                    terdapat{" "}
                                    {
                                        chartDataPerTahun.jumlah[
                                            chartDataPerTahun.jumlah.length - 1
                                        ]
                                    }{" "}
                                    kasus penyalah gunaan narkotika di kecamatan{" "}
                                    {
                                        chartDataPerTahun.kecamatan[
                                            chartDataPerTahun.kecamatan.length -
                                                1
                                        ]
                                    }
                                </ECardMsg>
                            </>
                        ) : (
                            ""
                        )}
                    </ECartTable>
                </ECard>
            </div>
        </div>
    );
};

const Deskripsi = (props) => {
    return (
        <div
            style={{
                display: "block",
                marginBottom: 5,
                background: "transparet",
                paddingLeft: 2,
            }}
        >
            <div>
                <span
                    style={{
                        width: 10,
                        height: 10,
                        background: props.ColorMarker,
                        display: "inline-block",
                        marginRight: 5,
                    }}
                ></span>
                <span
                    style={
                        props.keyStyle != undefined
                            ? props.keyStyle
                            : { fontWeight: "bold", fontSize: 8 }
                    }
                >
                    {props.keyProps}
                </span>
            </div>
        </div>
    );
};

export default Dashboard;
