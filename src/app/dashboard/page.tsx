"use client";

import { useEffect, useState } from "react";
import { fetchDevices } from "@/api/deviceApi";
import { fetchUsers } from "@/api/userApi";
import {Device, User} from "@/models";
import Image from "next/image";
import Link from "next/link";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHeart} from "@fortawesome/free-solid-svg-icons";

export default function Dashboard() {
    const [devices, setDevices] = useState<Device[]>([]);
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function loadDevices() {
            try {
                const data = await fetchDevices();
                setDevices(data);
            } catch (err: string | any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        loadDevices();
    }, []);

    useEffect(() => {
        async function loadUsers() {
            try {
                const data = await fetchUsers();
                setUsers(data);
            } catch (err: string | any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        loadUsers();
    }, []);

    if (loading) {
        return <div className="text-center h-full w-full p-5 bg-[#3a2414] rounded-2xl">Loading...</div>;
    }

    if (error) {
        return <div className="text-center h-full w-full p-5 bg-[#3a2414] rounded-2xl">Error: {error}</div>;
    }

    return (
        <div>
            <div className="mb-4">
                <Link href="/">
                    <span className="text-yellow-500">Accueil</span>
                </Link>
                <span className="mx-2">/</span>
                <span>Mon dashboard</span>
            </div>

            <h1 className="text-3xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-[#f5e0c3] to-[#c49a6c]">
                Mon dashboard
            </h1>

            {/* devices à café */}
            <div className="py-12 px-10 grid grid-cols-4">
                <div>
                    <h4 className="text-3xl font-bold mb-6">Machines à Café</h4>
                    <p className="text-gray-300 font-medium italic">La liste de vos devices à café</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-5 col-span-3">
                    {devices.map((device) => (
                        <Link key={device._id} href={`/device/show/${device._id}`} className="group">
                            <div className="bg-[#3a2414] p-4 rounded-2xl shadow-lg hover:scale-105 transition-transform cursor-pointer flex justify-center group-hover:bg-[#5a3c24]">
                                <div className="grid grid-cols-2 gap-10">
                                    <Image src={device.image ?? "/blank/device.webp"} alt={device.name} width={100} height={50} className="rounded-lg" />
                                    <div className="content-center">
                                        <h2 className="text-xl font-semibold mt-3 group-hover:text-yellow-400">{device.name}</h2>
                                        <p className="text-gray-300 text-sm">Ajoutée le {device.dateAdded}</p>
                                    </div>
                                </div>
                                {device.isFavorite && (
                                    <FontAwesomeIcon icon={faHeart} className="text-red-500" />
                                )}
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Utilisateurs */}
            <div className="py-12 px-10 grid grid-cols-4">
                <div>
                    <h4 className="text-3xl font-bold mb-6">Utilisateurs</h4>
                    <p className="text-gray-300 font-medium italic">Les utilisateurs ayant accès à vos appareils</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-5 col-span-3">
                    {users.map((user, key) => (
                        <Link href={`/profile/${user._id}`} key={key}>
                            <div className="bg-[#3a2414] p-4 rounded-2xl content-center shadow-lg hover:scale-105 transition-transform grid grid-cols-2 cursor-pointer">
                                <Image src="/blank/user.webp" alt={user.firstName} width={100} height={50} className="rounded-lg" />
                                <div className="content-center">
                                    <h2 className="text-xl font-semibold mt-3">{user.firstName} {user.lastName}</h2>
                                    <p className="text-gray-300 text-sm">{user.email}</p>
                                    <p className="text-gray-300 text-sm">Ajoutée le </p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
