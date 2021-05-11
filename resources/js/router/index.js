import React, { Component } from "react";
import { HashRouter, Router, Route, Link, Switch } from "react-router-dom";

import Dashboard from "../pages/Dashboard/Dashboard";
import BaseLayout from "../layout/Layout-base/Lay-sidebar";
import Kasus from "../pages/Kasus/InputKasus";
import Tersangka from "../pages/Tersangka/Tersangka";
import DetailTersangka from "../pages/Tersangka/DetailTersangka";
import Lapor from "../pages/Lapor/Lapor";
import Laporan from "../pages/Laporan/Laporan";

import UserLayout from "../layout/User-Page/Layout";

import ClientHome from "../pages/Client-Home/Home";
import Sebaran from "../pages/Client-Sebaran/Sebaran";
import Pelaporan from "../pages/Client-Pelaporan/Pelaporan";
import DetailPelaporan from "../pages/Client-Pelaporan/DetailPelaporan";
import Finish from "../pages/Client-Pelaporan/finish";

import Berita from "../pages/Client-Berita/Berita";
import DetailBerita from "../pages/Client-Berita/DetailBerita"
import Profile from "../pages/Client-Profile/Profile";
import News from "../pages/News/ListNews";
import Entry from "../pages/News/News";

/////page ////
export default function index() {
    return (
        <>
            <Switch>
                <Route path="/Dashboard">
                    <BaseLayout>
                        <Dashboard />
                    </BaseLayout>
                </Route>
                <Route path="/Tersangka">
                    <BaseLayout>
                        <Tersangka />
                    </BaseLayout>
                </Route>
                <Route path="/Detailtersangka/:id">
                    <BaseLayout>
                        <DetailTersangka />
                    </BaseLayout>
                </Route>
                <Route path="/Lapor">
                    <BaseLayout>
                        <Lapor />
                    </BaseLayout>
                </Route>
                <Route path="/News">
                    <BaseLayout>
                        <News />
                    </BaseLayout>
                </Route>
                <Route path="/Laporan">
                    <BaseLayout>
                        <Laporan />
                    </BaseLayout>
                </Route>
                <Route path="/EntryNews">
                    <BaseLayout>
                        <Entry />
                    </BaseLayout>
                </Route>

                {/*/////// User /////////*/}
                <Route exact path="/">
                    <UserLayout>
                        <ClientHome />
                    </UserLayout>
                </Route>
                <Route exact path="/Home">
                    <UserLayout>
                        <ClientHome />
                    </UserLayout>
                </Route>
                <Route exact path="/Sebaran">
                    <UserLayout>
                        <Sebaran />
                    </UserLayout>
                </Route>
                <Route exact path="/Pelaporan">
                    <UserLayout>
                        <Pelaporan />
                    </UserLayout>
                </Route>
                <Route exact path="/Pelaporan/:id">
                    <UserLayout>
                        <DetailPelaporan />
                    </UserLayout>
                </Route>
                <Route exact path="/Finish/:id">
                    <UserLayout>
                        <Finish />
                    </UserLayout>
                </Route>
                <Route exact path="/Berita">
                    <UserLayout>
                        <Berita />
                    </UserLayout>
                </Route>
                <Route exact path="/Berita/:id">
                    <UserLayout>
                        <DetailBerita />
                    </UserLayout>
                </Route>
                <Route exact path="/profile">
                    <UserLayout>
                        <Profile />
                    </UserLayout>
                </Route>
                {/* //////////////////// */}
            </Switch>
        </>
    );
}
