import Authenticated from "@/Layouts/AuthenticatedLayout";
import { router } from "@inertiajs/react";
import { Add, Close, Delete } from "@mui/icons-material";
import React, { useState } from "react";

import Form from "./Form";
import { Modal } from "@mui/material";

export default function Index(props) {
    const users = props.users;
    const [modalTambah, setModalTambah] = useState(false);
    const deleteHandler = (item) => {
        router.delete(route("data-admin.destroy", { id: item.id }));
    };
    return (
        <div className="py-3 px-4 rounded-md">
            <Modal
                open={modalTambah}
                onClose={() => setModalTambah(false)}
                className="relative z-50"
            >
                <div className="fixed inset-0   w-screen   p-4 bg-white">
                    <div className="flex gap-3 justify-between items-center">
                        <h3 className="text-pink-500">Tambah Admin</h3>
                        <button
                            onClick={() => setModalTambah(false)}
                            className="border border-gray-500 py-2 px-2 rounded-md text-pink-500"
                        >
                            <Close color="inherit" fontSize="inherit" />
                        </button>
                    </div>
                    <Form />
                </div>
            </Modal>
            <div className="flex justify-between items-center my-2">
                <h1 className="text-2xl font-bold text-white">Data Admin</h1>
                <button
                    onClick={() => setModalTambah(true)}
                    className="py-2 px-2 tracking-tighter leading-3 text-white rounded-md bg-blue-500 active:bg-blue-700"
                >
                    <Add color="inherit" fontSize="inherit" />
                </button>
            </div>
            {users.map((item, key) => (
                <div className="my-2 py-2 px-2 bg-white rounded-md flex justify-between items-center">
                    <div>
                        <h3>{item.firstname + " " + item.lastname}</h3>
                        <h3>{item.phone}</h3>
                    </div>
                    <button
                        onClick={() => deleteHandler(item)}
                        className="py-2 px-2 tracking-tighter leading-3 text-white rounded-md bg-red-500 active:bg-red-700"
                    >
                        <Delete color="inherit" fontSize="inherit" />
                    </button>
                </div>
            ))}
        </div>
    );
}
Index.layout = (page) => <Authenticated children={page} />;
