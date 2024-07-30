import InputText from "@/Components/InputText";
import { useForm } from "@inertiajs/react";
import React, { useState } from "react";
import {
    MapContainer,
    Marker,
    Popup,
    TileLayer,
    useMapEvents,
    GeoJSON,
} from "react-leaflet";
import Swal from "sweetalert2";
import dataJson from "./indonesia-prov.json";
import * as turf from "@turf/turf";
function LocationMarker({ data, setData }) {
    const [position, setPosition] = useState(null);
    const map = useMapEvents({
        click(e) {
            map.locate();
        },
        locationfound(e) {
            setPosition(e.latlng);
            map.flyTo(e.latlng, map.getZoom());

            const point = turf.point([e.latlng.lng, e.latlng.lat]);
            let foundProvince = null;
            let foundKab = null;
            for (let feature of dataJson.features) {
                // Pastikan feature.geometry adalah objek yang valid
                if (feature.geometry) {
                    let isInPolygon = false;

                    if (feature.geometry.type === "Polygon") {
                        const polygon = turf.polygon(
                            feature.geometry.coordinates
                        );
                        isInPolygon = turf.booleanPointInPolygon(
                            point,
                            polygon
                        );
                    } else if (feature.geometry.type === "MultiPolygon") {
                        for (let coords of feature.geometry.coordinates) {
                            const polygon = turf.polygon(coords);
                            if (turf.booleanPointInPolygon(point, polygon)) {
                                isInPolygon = true;
                                break;
                            }
                        }
                    }

                    if (isInPolygon) {
                        foundProvince = feature.properties.NAME_1; // Sesuaikan dengan nama properti provinsi Anda
                        foundKab = feature.properties.NAME_2; // Sesuaikan dengan nama properti kabupaten Anda
                        break;
                    }
                }
            }
            setData({
                ...data,
                provinsi: foundProvince,
                kabupaten: foundKab,
                lat: e.latlng.lat,
                long: e.latlng.lng,
            });
        },
    });

    return position === null ? null : (
        <Marker position={position}>
            <Popup>You are here</Popup>
        </Marker>
    );
}
export default function Register({ setModalRegister, setModalLogin }) {
    const { data, setData, post, reset, errors } = useForm({
        firstname: "",
        lastname: "",
        long: "",
        lat: "",
        phone: "",
        address: "",
        provinsi: "",
        kabupaten: "",
        kode_perangkat: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    const loginHandler = () => {
        setModalRegister(false);
        setTimeout(() => {
            setModalLogin(true);
        }, 500);
    };
    const register = (e) => {
        e.preventDefault();
        post(route("register"), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                setModalRegister(false);
            },
            onError: () => {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Gagal melakukan pendaftaran, cek kembali isian anda",
                    showClass: {
                        popup: "my-custom-popup",
                    },
                });
            },
        });
    };
    const kabupatenSulawesi = [
        // Sulawesi Utara
        "Bolaang Mongondow",
        "Bolaang Mongondow Selatan",
        "Bolaang Mongondow Timur",
        "Bolaang Mongondow Utara",
        "Kepulauan Sangihe",
        "Kepulauan Siau Tagulandang Biaro",
        "Kepulauan Talaud",
        "Minahasa",
        "Minahasa Selatan",
        "Minahasa Tenggara",
        "Minahasa Utara",
        // Gorontalo
        "Boalemo",
        "Bone Bolango",
        "Gorontalo",
        "Gorontalo Utara",
        "Pohuwato",
        // Sulawesi Tengah
        "Banggai",
        "Banggai Kepulauan",
        "Banggai Laut",
        "Buol",
        "Donggala",
        "Morowali",
        "Morowali Utara",
        "Parigi Moutong",
        "Poso",
        "Sigi",
        "Tojo Una-Una",
        "Tolitoli",
        // Sulawesi Barat
        "Majene",
        "Mamasa",
        "Mamuju",
        "Mamuju Tengah",
        "Pasangkayu",
        "Polewali Mandar",
        // Sulawesi Selatan
        "Bantaeng",
        "Barru",
        "Bone",
        "Bulukumba",
        "Enrekang",
        "Gowa",
        "Jeneponto",
        "Kepulauan Selayar",
        "Luwu",
        "Luwu Timur",
        "Luwu Utara",
        "Maros",
        "Pangkajene dan Kepulauan",
        "Pinrang",
        "Sidenreng Rappang",
        "Sinjai",
        "Soppeng",
        "Takalar",
        "Tana Toraja",
        "Toraja Utara",
        "Wajo",
        // Sulawesi Tenggara
        "Bombana",
        "Buton",
        "Buton Selatan",
        "Buton Tengah",
        "Buton Utara",
        "Kolaka",
        "Kolaka Timur",
        "Kolaka Utara",
        "Konawe",
        "Konawe Kepulauan",
        "Konawe Selatan",
        "Konawe Utara",
        "Muna",
        "Muna Barat",
        "Wakatobi",
    ];

    // Fungsi untuk menghasilkan warna acak
    const randomColor = () => {
        const letters = "0123456789ABCDEF";
        let color = "#";
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };

    // Buat objek yang menyimpan warna untuk setiap kabupaten
    const kabupatenColors = {};
    kabupatenSulawesi.forEach((kabupaten) => {
        kabupatenColors[kabupaten] = randomColor();
    });
    const [selectedProvince, setSelectedProvince] = useState(null);

    const onEachData = (dataJson, layer) => {
        let nama = dataJson.properties;

        layer.bindPopup(nama.NAME_1);
        layer.on({
            click: (e) => {},
        });
    };
    const getColor = (d) => {
        return kabupatenColors[d] || "blue";
    };

    const style = (feature) => {
        return {
            fillColor: getColor(feature.properties.NAME_2),
            weight: 2,
            opacity: 1,
            color: "#fff",
            dashArray: "3",
            fillOpacity: 0.7,
        };
    };
    return (
        <div className="w-full h-screen overflow-y-auto">
            <h3 className="my-3 text-red-500">Please Active Your Location</h3>
            <MapContainer
                style={{ width: "100%", height: "50vw", zIndex: 70 }}
                center={{ lat: -2.004105, lng: 118.026812 }}
                zoom={5}
                scrollWheelZoom={true}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <LocationMarker setData={setData} data={data} />
                <GeoJSON
                    style={style}
                    data={dataJson.features}
                    onEachFeature={onEachData}
                />
            </MapContainer>
            <form onSubmit={register} className="flex gap-3 flex-col my-3">
                <div className="grid grid-cols-2 gap-3">
                    <InputText
                        className="w-full"
                        title={"firstname"}
                        name={"firstname"}
                        value={data.firstname}
                        errors={errors.firstname}
                        onChange={(e) =>
                            setData({
                                ...data,
                                [e.target.name]: e.target.value,
                            })
                        }
                    />
                    <InputText
                        className="w-full"
                        title={"lastname"}
                        name={"lastname"}
                        value={data.lastname}
                        errors={errors.lastname}
                        onChange={(e) =>
                            setData({
                                ...data,
                                [e.target.name]: e.target.value,
                            })
                        }
                    />
                    <InputText
                        className="w-full"
                        title={"WhatsApp Number"}
                        name={"phone"}
                        value={data.phone}
                        errors={errors.phone}
                        onChange={(e) =>
                            setData({
                                ...data,
                                [e.target.name]: e.target.value,
                            })
                        }
                    />
                    <InputText
                        className="w-full"
                        title={"Alamat"}
                        name={"address"}
                        value={data.address}
                        errors={errors.address}
                        onChange={(e) =>
                            setData({
                                ...data,
                                [e.target.name]: e.target.value,
                            })
                        }
                    />
                    <InputText
                        className="w-full"
                        disabled
                        title={"Latitude"}
                        name={"lat"}
                        value={data.lat}
                        errors={errors.lat}
                        onChange={(e) =>
                            setData({
                                ...data,
                                [e.target.name]: e.target.value,
                            })
                        }
                    />
                    <InputText
                        disabled
                        className="w-full"
                        title={"Longtitdue"}
                        name={"long"}
                        value={data.long}
                        errors={errors.long}
                        onChange={(e) =>
                            setData({
                                ...data,
                                [e.target.name]: e.target.value,
                            })
                        }
                    />
                </div>

                <InputText
                    className="w-full"
                    type="email"
                    title={"email"}
                    name={"email"}
                    value={data.email}
                    errors={errors.email}
                    onChange={(e) =>
                        setData({ ...data, [e.target.name]: e.target.value })
                    }
                />
                <InputText
                    className="w-full"
                    type="password"
                    title={"password"}
                    name={"password"}
                    value={data.password}
                    errors={errors.password}
                    onChange={(e) =>
                        setData({ ...data, [e.target.name]: e.target.value })
                    }
                />
                <InputText
                    className="w-full"
                    type="password"
                    title={"Konfirmasi Password"}
                    name={"password_confirmation"}
                    value={data.password_confirmation}
                    errors={errors.password_confirmation}
                    onChange={(e) =>
                        setData({ ...data, [e.target.name]: e.target.value })
                    }
                />

                <button className="w-full bg-pink-500 text-white font-bold font-fira text-xl py-2 rounded-md">
                    Daftar Sekarang
                </button>

                <button
                    type="button"
                    onClick={loginHandler}
                    className="w-full bg-white text-pink-500 font-bold font-fira text-xl  py-2 rounded-md"
                >
                    Login Jika Punya Akun
                </button>
            </form>
        </div>
    );
}
