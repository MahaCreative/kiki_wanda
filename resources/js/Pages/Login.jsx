import InputText from "@/Components/InputText";
import { useForm } from "@inertiajs/react";
import React, { useState } from "react";

export default function Login({ setModalRegister, setModalLogin }) {
    const { data, setData, post, reset, errors } = useForm({
        email: "",
        password: "",
        password_confirmation: "",
    });
    const loginHandler = () => {
        setModalLogin(false);
        setTimeout(() => {
            setModalRegister(true);
        }, 500);
    };
    const submitHandler = (e) => {
        e.preventDefault();
        post(route("login"), {
            onFinish: () => {},
        });
    };
    return (
        <div className="w-full">
            <form
                onSubmit={submitHandler}
                action=""
                className="flex gap-3 flex-col my-3"
            >
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
                    Login
                </button>

                <button
                    type="button"
                    onClick={loginHandler}
                    className="w-full bg-white text-pink-500 font-bold font-fira text-xl  py-2 rounded-md"
                >
                    Register Akun
                </button>
            </form>
        </div>
    );
}
