import InputText from "@/Components/InputText";
import { useForm } from "@inertiajs/react";
import React from "react";

export default function Form({ setModal }) {
    const { data, setData, post, reset, errors } = useForm({
        firstname: "",
        lastname: "",

        phone: "",
        address: "",

        kode_perangkat: "",
        email: "",
        password: "",
        password_confirmation: "",
    });
    const submit = (e) => {
        e.preventDefault();
        post(route("data-admin.create"));
    };
    return (
        <form onSubmit={submit}>
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
                Simpan
            </button>
        </form>
    );
}
