import { Link, Head, useForm } from "@inertiajs/react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import { useState } from "react";
import { Modal } from "@mui/material";
import { Close } from "@mui/icons-material";
import Register from "./Register";
import Login from "./Login";

export default function Welcome() {
    const [modalRegister, setModalRegister] = useState(false);
    const [modalLogin, setModalLogin] = useState(false);
    const { data, setData, post, reset, errors } = useForm({
        firstname: "",
        lastname: "",
        long: "",
        lat: "",
        phone: "",
        address: "",
        city: "",
        kode_perangkat: "",
        email: "",
        password: "",
    });
    const loginHandler = () => {
        setModalRegister(false);
        setTimeout(() => {
            setModalLogin(true);
        }, 500);
    };
    return (
        <>
            <Head />

            <div className="py-3 bg-pink-500 w-full fixed ">
                <h3 className="font-medium tracking-tighter text-white text-xl ml-6">
                    MontEartquake
                </h3>
            </div>
            <div className="bg-black font-fira  w-[390px] px-4 h-[844px] overflow-y-auto overflow-x-hidden tracking-tighter">
                <Modal
                    open={modalRegister}
                    onClose={() => setModalRegister(false)}
                    className="relative z-50"
                >
                    <div className="fixed inset-0   w-screen   p-4 bg-white">
                        <div className="flex gap-3 justify-between items-center">
                            <h3 className="text-pink-500">Register Akun</h3>
                            <button
                                onClick={() => setModalRegister(false)}
                                className="border border-gray-500 py-2 px-2 rounded-md text-pink-500"
                            >
                                <Close color="inherit" fontSize="inherit" />
                            </button>
                        </div>
                        <Register
                            setModalLogin={setModalLogin}
                            setModalRegister={setModalRegister}
                        />
                    </div>
                </Modal>
                <Modal
                    open={modalLogin}
                    onClose={() => setModalLogin(false)}
                    className="relative z-50"
                >
                    <div className="fixed inset-0   w-screen   p-4 bg-white">
                        <div className="flex gap-3 justify-between items-center">
                            <h3 className="text-pink-500">Login Akun</h3>
                            <button
                                onClick={() => setModalLogin(false)}
                                className="border border-gray-500 py-2 px-2 rounded-md text-pink-500"
                            >
                                <Close color="inherit" fontSize="inherit" />
                            </button>
                        </div>
                        <Login
                            setModalLogin={setModalLogin}
                            setModalRegister={setModalRegister}
                        />
                    </div>
                </Modal>
                <div className="w-full h-[555px] flex items-center justify-center relative">
                    <div className="absolute top-0 left-0 bg-gradient-to-b from-black-90 via-black/70 to-black-20 w-full h-full"></div>
                    <img src="image/bg-1.png" alt="" className="w-[85%]" />
                </div>
                <h3 className="text-pink-500 text-center font-bold font-fira text-xl my-6">
                    Monitoring Gempa
                </h3>
                <p className="text-white font-thin text-left">
                    Dapatkan notifikasi realtime peringatan gempa melalui
                    WhatsApp anda. Dan Minta Bantuan Langsung Kepada Kami
                </p>
                <button
                    onClick={() => setModalRegister(true)}
                    className="w-full bg-pink-500 text-white font-bold font-fira text-xl mt-6 py-2 rounded-md"
                >
                    Daftar Sekarang
                </button>
                <button
                    type="button"
                    onClick={loginHandler}
                    className="w-full bg-white text-pink-500 font-bold font-fira text-xl mt-3 py-2 rounded-md"
                >
                    Login Sekarang
                </button>
            </div>
        </>
    );
}
