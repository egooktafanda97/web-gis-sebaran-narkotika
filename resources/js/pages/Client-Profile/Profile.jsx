import React from "react";
import ECard from "../../components/Card/Ecard";
import ECardMsg from "../../components/Card/ECardMsg";

export default function Profile() {
    return (
        <div className="Contatent_container">
            <div className="TopBar">
                <div className="Icon-Menu">
                    <span className="las la-bars"></span>
                </div>
                <h4>Profile Sat Resnarkoba</h4>
            </div>
            <article
                className="Client-Contents-Pelaporan"
                style={{ paddingTop: 100 }}
            >
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <ECard>
                                <img
                                    src="http://127.0.0.1:8000/img/icon/polri.jpg"
                                    className="w-100"
                                />
                            </ECard>
                            <ECard
                                title="Struktur Organisasi SAT RESNARKOBA"
                                style={{ marginTop: 20 }}
                            >
                                <img
                                    src="http://127.0.0.1:8000/img/icon/S-organisasi.png"
                                    className="w-100"
                                />
                            </ECard>
                        </div>
                        <div className="col-md-6">
                            <ECard>
                                <h4>
                                    <b>SATRESNARKOBA</b>
                                </h4>
                                <ECardMsg>
                                    <div style={{ fontSize: 14 }}>
                                        <p>
                                            Satuan Reserse Narkotika,
                                            Psikotropika dan Obat Berbahaya yang
                                            selanjutnya disingkat Satresnarkoba
                                            adalah unsur pelaksana tugas pokok
                                            fungsi reserse narkoba pada tingkat
                                            Polres yang berada di bawah
                                            Kapolres. Satresnarkoba bertugas
                                            melaksanakan pembinaan fungsi
                                            penyelidikan, penyidikan, pengawasan
                                            penyidikan tindak pidana
                                            penyalahgunaan dan peredaran gelap
                                            Narkoba berikut prekursornya, serta
                                            pembinaan dan penyuluhan dalam
                                            rangka pencegahan dan rehabilitasi
                                            korban penyalahgunaan Narkoba
                                        </p>
                                        <p>
                                            Dalam melaksanakan tugas,
                                            Satresnarkoba menyelenggarakan
                                            fungsi:
                                        </p>
                                        <div
                                            style={{
                                                marginLeft: 30,
                                                marginTop: 10,
                                                marginBottom: 10,
                                            }}
                                        >
                                            <ol>
                                                <li>
                                                    penyelidikan dan penyidikan
                                                    tindak pidana penyalahgunaan
                                                    dan peredaran gelap Narkoba,
                                                    dan prekursor;&nbsp;
                                                </li>
                                                <li>
                                                    pembinaan dan penyuluhan
                                                    dalam rangka pencegahan dan
                                                    rehabilitasi korban
                                                    penyalahgunaan Narkoba;
                                                </li>
                                                <li>
                                                    pengawasan terhadap
                                                    pelaksanaan penyelidikan dan
                                                    penyidikan tindak pidana
                                                    penyalahgunan Narkoba yang
                                                    dilakukan oleh unit reskrim
                                                    Polsek dan Satresnarkoba
                                                    Polres; dan
                                                </li>
                                                <li>
                                                    penganalisisan kasus beserta
                                                    penanganannya, serta
                                                    mengkaji efektivitas
                                                    pelaksanaan tugas
                                                    Satresnarkoba.&nbsp;
                                                </li>
                                            </ol>
                                        </div>
                                        <p>
                                            Satresnarkoba dalam melaksanakan
                                            tugas dibantu oleh:
                                        </p>
                                        <div
                                            style={{
                                                marginLeft: 30,
                                                marginTop: 10,
                                                marginBottom: 10,
                                            }}
                                        >
                                            <ol>
                                                <li>
                                                    Urusan Pembinaan Operasional
                                                    (Urbinopsnal), yang bertugas
                                                    melakukan pembinaan dan
                                                    pengawasan terhadap
                                                    administrasi serta
                                                    pelaksanaan penyelidikan dan
                                                    penyidikan tindak pidana
                                                    Narkoba, pembinaan dan
                                                    penyuluhan dalam rangka
                                                    pencegahan dan rehabilitasi
                                                    korban penyalahgunaan
                                                    Narkoba serta menganalisis
                                                    penanganan kasus dan
                                                    mengevaluasi efektivitas
                                                    pelaksanaan tugas
                                                    Satresnarkoba;
                                                </li>
                                                <li>
                                                    Urusan Administrasi dan
                                                    Ketatausahaan (Urmintu),
                                                    yang bertugas
                                                    menyelenggarakan kegiatan
                                                    administrasi dan
                                                    ketatausahaan; dan
                                                </li>
                                                <li>
                                                    Unit, terdiri dari paling
                                                    banyak 3 (tiga) Unit, yang
                                                    bertugas melakukan
                                                    penyelidikan dan penyidikan
                                                    tindak pidana penyalahgunaan
                                                    dan peredaran gelap Narkoba
                                                    dan prekursor di daerah
                                                    hukum Polres.
                                                </li>
                                            </ol>
                                        </div>
                                    </div>
                                </ECardMsg>
                            </ECard>
                            <ECard style={{ marginTop: 10 }}>
                                <ECardMsg>
                                    {" "}
                                    <h4>
                                        <strong>VISI</strong>
                                    </h4>
                                    <p>
                                        Polri yang mampu menjadi pelindung
                                        Pengayom dan Pelayan Masyarakat yang
                                        selalu dekat dan bersama-sama
                                        masyarakat, serta sebagai penegak hukum
                                        yang profesional dan proposional yang
                                        selalu menjunjung tinggi supermasi hukum
                                        dan hak azasi manusia, Pemelihara
                                        keamanan dan ketertiban serta mewujudkan
                                        keamanan dalam negeri dalam suatu
                                        kehidupan nasional yang demokratis dan
                                        masyarakat yang sejahtera.
                                    </p>
                                </ECardMsg>
                                <br />
                                <ECardMsg>
                                    <h4>
                                        <strong>Misi</strong>
                                    </h4>
                                    <p>
                                        <span
                                            style={{
                                                fontFamily: "Times New Roman",
                                                fontSize: 16,
                                            }}
                                        >
                                            Berdasarkan uraian Visi sebagaimana
                                            tersebut di atas, selanjutnya uraian
                                            tentang jabaran Misi Polri kedepan
                                            adalah sebagai berikut :
                                        </span>
                                    </p>
                                    <ul
                                        style={{
                                            paddingLeft: 30,
                                        }}
                                    >
                                        <li>
                                            <span
                                                style={{
                                                    fontFamily: "Calibri",
                                                    fontSize: "11,0000pt",
                                                }}
                                            >
                                                Memberikan perlindungan,
                                                pengayoman dan pelayanan kepada
                                                masyarakat (meliputi aspek
                                                security, surety, safety dan
                                                peace) sehingga masyarakat bebas
                                                dari gangguan fisik maupun
                                                psykis.
                                            </span>
                                            <span
                                                style={{
                                                    fontFamily: "Calibri",
                                                    fontSize: "11,0000pt",
                                                }}
                                            ></span>
                                        </li>
                                        <li>
                                            <span
                                                style={{
                                                    fontFamily: "Calibri",
                                                    fontSize: "11,0000pt",
                                                }}
                                            >
                                                Memberikan bimbingan kepada
                                                masyarakat melalui upaya
                                                preemtif dan preventif yang
                                                dapat meningkatkan kesadaran dan
                                                kekuatan serta kepatuhan hukum
                                                masyarakat (Law abiding
                                                Citizenship).
                                            </span>
                                        </li>
                                        <li>
                                            <span
                                                style={{
                                                    fontFamily: "Calibri",
                                                    fontSize: "11,0000pt",
                                                }}
                                            >
                                                Menegakkan hukum secara
                                                profesional dan proporsional
                                                dengan menjunjung tinggi
                                                supremasi hukum dan hak azasi
                                                manusia menuju kepada adanya
                                                kepastian hukum dan rasa
                                                keadilan.
                                            </span>
                                        </li>
                                        <li>
                                            <span
                                                style={{
                                                    fontFamily: "Calibri",
                                                    fontSize: "11,0000pt",
                                                }}
                                            >
                                                Memelihara keamanan dan
                                                ketertiban masyarakat dengan
                                                tetap memperhatikan norma -
                                                norma dan nilai nilai yang
                                                berlaku dalam bingkai integritas
                                                wilayah hukum Negara Kesatuan
                                                Republik Indonesia.
                                            </span>
                                        </li>
                                        <li>
                                            <span
                                                style={{
                                                    fontFamily: "Calibri",
                                                    fontSize: "11,0000pt",
                                                }}
                                            >
                                                Mengelola sumber daya manusia
                                                Polri secara profesional dalam
                                                mencapai tujuan Polri yaitu
                                                terwujudnya keamanan dalam
                                                negeri sehingga dapat mendorong
                                                meningkatnya gairah kerja guna
                                                mencapai kesejahteraan
                                                masyarakat.
                                            </span>
                                        </li>
                                        <li>
                                            <span
                                                style={{
                                                    fontFamily: "Calibri",
                                                    fontSize: "11,0000pt",
                                                }}
                                            >
                                                Meningkatkan upaya konsolidasi
                                                kedalam (internal Polri) sebagai
                                                upaya menyamakan Visi dan Misi
                                                Polri kedepan.
                                            </span>
                                        </li>
                                        <li>
                                            <span
                                                style={{
                                                    fontFamily: "Calibri",
                                                    fontSize: "11,0000pt",
                                                }}
                                            >
                                                Memelihara soliditas institusi
                                                Polri dari berbagai pengaruh
                                                external yang sangat merugikan
                                                organisasi.
                                            </span>
                                        </li>
                                        <li>
                                            <span
                                                style={{
                                                    fontFamily: "Calibri",
                                                    fontSize: "11,0000pt",
                                                }}
                                            >
                                                Melanjutkan operasi pemulihan
                                                keamanan di beberapa wilayah
                                                konflik guna menjamin keutuhan
                                                Negara Kesatuan Republik
                                                Indonesia.
                                            </span>
                                        </li>
                                        <li>
                                            <span
                                                style={{
                                                    fontFamily: "Calibri",
                                                    fontSize: "11,0000pt",
                                                }}
                                            >
                                                Meningkatkan kesadaran hukum dan
                                                kesadaran berbangsa dari
                                                masyarakat yang berBhinneka
                                                Tunggal Ika.
                                            </span>
                                        </li>
                                    </ul>
                                </ECardMsg>
                            </ECard>
                        </div>
                    </div>
                </div>
            </article>
        </div>
    );
}
