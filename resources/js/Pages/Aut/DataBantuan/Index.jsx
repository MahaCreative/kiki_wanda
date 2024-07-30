import InputText from "@/Components/InputText";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import React, { useState } from "react";
import DataGempa from "./DataBantuan";

export default function Index(props) {
    const [params, setParams] = useState({
        dari_tanggal: "",
        sampai_tanggal: "",
    });
    const bantuan = props.bantuan;

    return (
        <div className="py-2 px-2">
            <div className="flex justify-between items-center">
                <InputText
                    className="bg-white"
                    type="date"
                    label={"Dari Tanggal"}
                    onChange={(e) =>
                        setParams({ ...params, dari_tanggal: e.target.value })
                    }
                />
                <InputText
                    className="bg-white"
                    type="date"
                    label={"Sampai Tanggal"}
                    onChange={(e) =>
                        setParams({ ...params, sampai_tanggal: e.target.value })
                    }
                />
            </div>

            <div className="my-3 bg-white py-2 px-4 rounded-md">
                <h3>Data Permintaan Bantuan</h3>
                <DataGempa bantuan={bantuan} />
            </div>
        </div>
    );
}

Index.layout = (page) => <Authenticated children={page} />;
