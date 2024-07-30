import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Face, Face2, Group } from "@mui/icons-material";
import React, { useState } from "react";
import RealtimePeringatanGempa from "../RealtimePeringatanGempa";
import RealtimePermintaanBantuan from "./RealtimePermintaanBantuan";

export default function Index(props) {
    const user = props.user;
    const countUser = props.countUser;
    const countAdmin = props.countAdmin;
    const countGempa = props.countGempa;
    const [notifGempa, setNotifGempa] = useState([]);
    return (
        <div className="px-4 py-2">
            <div className="grid grid-cols-2 gap-3">
                <div className="bg-pink-500 flex justify-between px-2 py-2 items-center rounded-md">
                    <div className="text-4xl text-white leading-3">
                        <Face color="inherit" fontSize="inherit" />
                    </div>
                    <div className="text-xl text-white font-bold text-right">
                        <h3>{countUser}</h3>
                        <p className="text-xs">Jumlah User Terdaftar</p>
                    </div>
                </div>
                <div className="bg-pink-500 flex justify-between px-2 py-2 items-center rounded-md">
                    <div className="text-4xl text-white leading-3">
                        <Group color="inherit" fontSize="inherit" />
                    </div>
                    <div className="text-xl text-white font-bold text-right">
                        <h3>{countAdmin}</h3>
                        <p className="text-xs">Jumlah Admin Terdaftar</p>
                    </div>
                </div>
                <div className="bg-pink-500 flex col-span-2 justify-between px-2 py-2 items-center rounded-md">
                    <div className="text-4xl text-white leading-3">
                        <Group color="inherit" fontSize="inherit" />
                    </div>
                    <div className="text-xl text-white font-bold text-right">
                        <h3>{countGempa}</h3>
                        <p className="text-xs">Jumlah Gempa Hari Ini</p>
                    </div>
                </div>
            </div>
            <div className="py-2 px-4 rounded-md bg-white w-full my-3">
                <h3>Informasi Gempa</h3>
                <RealtimePeringatanGempa
                    notifGempa={notifGempa}
                    setNotifGempa={setNotifGempa}
                />
            </div>
            <div className="py-2 px-4 rounded-md bg-white w-full my-3">
                <h3>Informasi Gempa</h3>
                <RealtimePermintaanBantuan
                    notifGempa={notifGempa}
                    setNotifGempa={setNotifGempa}
                />
            </div>
        </div>
    );
}
Index.layout = (page) => <Authenticated children={page} />;
