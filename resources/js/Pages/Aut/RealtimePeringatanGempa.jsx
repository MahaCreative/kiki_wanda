import React, { useEffect, useRef, useState } from "react";
import { MapContainer, Marker, TileLayer, GeoJSON } from "react-leaflet";
import dataJson from "../indonesia-prov.json";
export default function RealtimePeringatanGempa({ notifGempa, setNotifGempa }) {
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
    useEffect(() => {
        const fetchDataGEmpa = async () => {
            try {
                const response = await axios
                    .get("api/get-peringatan-gempa")
                    .then((response) => {
                        setNotifGempa(response.data);
                    }); // Ganti URL_API_ANDA dengan URL endpoint API Anda
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchDataGEmpa();

        const interval = setInterval(fetchDataGEmpa, 1000); // Memanggil fetchData setiap 5 detik
        return () => clearInterval(interval);
    }, []);
    const mapRef = useRef(null);
    const [zoom, setzoom] = useState(5);
    useEffect(() => {
        // useEffect lainnya

        // Memanggil flyTo jika notifGempa berubah
        if (notifGempa.length > 0 && mapRef.current) {
            const latestNotif = notifGempa[notifGempa.length - 1];
            setzoom(10);
            mapRef.current.flyTo([latestNotif.lat, latestNotif.long], 10);
        }

        // useEffect lainnya
    }, [notifGempa]); // useEffect ini hanya dijalankan ketika notifGempa berubah

    return (
        <>
            <MapContainer
                ref={mapRef} // Menghubungkan ref ke MapContainer
                style={{ width: "100%", height: "100vw", zIndex: 70 }}
                center={{ lat: -2.004105, lng: 118.026812 }}
                zoom={zoom}
                scrollWheelZoom={true}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {notifGempa.length > 0 &&
                    notifGempa.map((item) => (
                        <Marker position={[item.lat, item.long]}></Marker>
                    ))}
                <GeoJSON
                    style={style}
                    data={dataJson.features}
                    onEachFeature={onEachData}
                />
            </MapContainer>
        </>
    );
}
