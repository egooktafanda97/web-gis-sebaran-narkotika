import React, {
    Component,
    useState,
    useEffect,
    useRef,
    forwardRef,
} from "react";
import Table from "react-bootstrap/Table";
import { base_url } from "../../constant/constant";

const ComponetPrint = forwardRef((props, ref) => {
    const [allData, setAllData] = useState([]);
    useEffect(() => {
        const getAllData = async () => {
            const getData = await axios.post(base_url + "api/tersangka");
            setAllData(getData.data);
        };
        getAllData();
    }, []);

    return (
        <div ref={ref} className="container mt-4">
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
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Nama</th>
                        <th>Tempat Tanggal Lahir</th>
                        <th>Agama</th>
                        <th>Pekerjaan</th>
                        <th>Kecamatan</th>
                        <th>Desa</th>
                        <th>Jenis Narkotika</th>
                        <th>Keterangan</th>
                    </tr>
                </thead>
                <tbody>
                    {allData.map((_item, i) => {
                        const no = i + 1;
                        return (
                            <tr key={i}>
                                <td>{no}</td>
                                <td>{_item.nama}</td>
                                <td>{_item.tempat_lahir}</td>
                                <td>{_item.agama}</td>
                                <td>{_item.pekerjaan}</td>
                                <td>{_item.nama_kec}</td>
                                <td>{_item.nama_desa}</td>
                                <td>{_item.jenis_narkotika}</td>
                                <td>{_item.keterangan}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
        </div>
    );
});

export default ComponetPrint;
