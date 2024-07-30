import Authenticated from "@/Layouts/AuthenticatedLayout";

import React, { useEffect, useRef, useState } from "react";

import HighchartsReact from "highcharts-react-official";
import HighchartsExporting from "highcharts/modules/exporting";
import HighchartsAccessibility from "highcharts/modules/accessibility";
import Highcharts from "highcharts";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import RealtimePeringatanGempa from "../RealtimePeringatanGempa";
// Aktifkan modul ekspor
HighchartsExporting(Highcharts);
// Aktifkan modul aksesibilitas jika diperlukan
HighchartsAccessibility(Highcharts);
export default function DashboarUser(props) {
    const [dataGempa, setDataGempa] = useState([]);
    const [notifGempa, setNotifGempa] = useState([]);

    const user = props.user;

    useEffect(() => {
        const fetchData = async () => {
            try {
                let params = {
                    user_id: user.id,
                };
                const response = await axios
                    .get("api/get-data", { params })
                    .then((response) => {
                        setDataGempa(response.data);
                    }); // Ganti URL_API_ANDA dengan URL endpoint API Anda
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();

        const interval = setInterval(fetchData, 2000); // Memanggil fetchData setiap 5 detik
        return () => clearInterval(interval); // Membersihkan interval saat komponen dibongkar
    }, []);

    const chartOptions = {
        chart: {
            type: "line",
            events: {
                load: function () {
                    const series = this.series[0];
                    setInterval(() => {
                        if (dataGempa.length > 0) {
                            const latestData = dataGempa[dataGempa.length - 1];

                            series.addPoint(
                                [
                                    new Date(latestData.created_at).getTime(),
                                    parseFloat(latestData.data_gempa),
                                ],
                                true,
                                true
                            );
                        }
                    }, 2000);
                },
            },
        },
        time: {
            useUTC: false,
        },
        title: {
            text: "Real-time Data Gempa",
        },
        // xAxis: {
        //     type: "datetime",
        //     tickInterval: 60 * 1000, // Per minute
        // },
        yAxis: {
            title: {
                text: "Data Gempa",
            },
        },
        xAxis: {
            type: "datetime",
            tickInterval: 60 * 1000, // Per minute
            labels: {
                formatter: function () {
                    return new Date(this.value).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                    });
                },
            },
        },

        series: [
            {
                name: "Data Gempa",
                data: dataGempa.map((item) => [
                    new Date(item.created_at).getTime(),
                    parseFloat(item.data_gempa),
                ]),
            },
        ],
    };

    return (
        <div className="px-4 py-5">
            <div className="bg-pink-500 py-2 px-4 rounded-md my-3">
                <h3 className="text-white font-bold">
                    Hy, <span className="capitalize">{user.firstname}</span>
                </h3>
                <p className="text-white font-bold">
                    Kode Perangkat: {user.kode_perangkat}
                </p>
                <p className="text-white text-xs">
                    Masukkan kode diatas ke perangkat anda, untuk mulai melihat
                    data realtime getaran di lokasi anda
                </p>
            </div>
            <div className="py-2 px-4 rounded-md bg-white w-full ">
                <HighchartsReact
                    highcharts={Highcharts}
                    options={chartOptions}
                />
            </div>
            <div className="py-2 px-4 rounded-md bg-white w-full my-3">
                <h3>Informasi Gempa</h3>
                <RealtimePeringatanGempa
                    notifGempa={notifGempa}
                    setNotifGempa={setNotifGempa}
                />
            </div>
        </div>
    );
}
DashboarUser.layout = (page) => <Authenticated children={page} />;
