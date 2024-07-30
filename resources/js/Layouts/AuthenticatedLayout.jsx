import { useState } from "react";
import { Link, usePage } from "@inertiajs/react";
import { Close, Logout, Widgets } from "@mui/icons-material";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
export default function Authenticated({ children }) {
    const [open, setOpen] = useState(false);
    const { auth } = usePage().props;
    return (
        <div className="h-[844px] w-[390px] bg-slate-950 relative overflow-y-auto">
            <div className="flex justify-between items-center py-3 px-4">
                <h3 className="text-white font-bold">Dashboard</h3>
                <div className="flex gap-3">
                    {auth.user.role == "admin" && (
                        <button
                            onClick={() => setOpen(true)}
                            className="text-white active:bg-slate-800 p-2 rounded-md leading-3"
                        >
                            <Widgets color="inherit" fontSize="inherit" />
                        </button>
                    )}
                    <Link
                        as="button"
                        href={route("logout")}
                        className="text-white active:bg-slate-800 p-2 rounded-md leading-3"
                    >
                        <Logout color="inherit" fontSize="inherit" />
                    </Link>
                </div>
            </div>
            <div
                className={`${
                    open ? "w-[80%]" : "w-0"
                } transition-all overflow-hidden duration-300 ease-in-out absolute z-[999] top-0 right-0  bg-slate-950/90 backdrop-blur-sm h-screen`}
            >
                <div className="w-full h-full ">
                    <div className="flex justify-end py-2 px-4">
                        <button
                            onClick={() => setOpen(false)}
                            className="text-white active:bg-slate-800 p-2 rounded-md leading-3 text-xl"
                        >
                            <Close color="inherit" fontSize="inherit" />
                        </button>
                    </div>
                    <div className="py-4">
                        <Link
                            href={route("dashboard")}
                            className="my-3 text-white w-full block px-4 py-2 active:bg-slate-800 active:text-white"
                        >
                            Dashboard
                        </Link>
                        <Link
                            href={route("data-admin")}
                            className="my-3 text-white w-full block px-4 py-2 active:bg-slate-800 active:text-white"
                        >
                            Data Admin
                        </Link>
                        <Link
                            href={route("data-gempa")}
                            className="my-3 text-white w-full block px-4 py-2 active:bg-slate-800 active:text-white"
                        >
                            Data Gempa
                        </Link>
                        <Link
                            href={route("data-permintaan-bantuan")}
                            className="my-3 text-white w-full block px-4 py-2 active:bg-slate-800 active:text-white"
                        >
                            Data Permintaan Bantuan
                        </Link>
                    </div>
                </div>
            </div>
            {children}
        </div>
    );
}
