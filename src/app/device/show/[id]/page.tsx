"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { fetchDeviceById, deleteDeviceById } from "@/api/deviceApi";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faTrash } from "@fortawesome/free-solid-svg-icons";

export default function MachineView() {
    const router = useRouter();
    const { id } = useParams();
    const [device, setDevice] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [isDeleting, setIsDeleting] = useState<boolean>(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (!id) {
                    console.error("Aucun ID de machine n'est spécifié.");
                    setLoading(false);
                    return;
                }
                const device = await fetchDeviceById(id as string);
                setDevice(device);
                setLoading(false);
            } catch (error) {
                console.error("Erreur lors de la récupération des données de la machine", error);
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    const handleDelete = async () => {
        if (!id) return;
        if (!window.confirm("Êtes-vous sûr de vouloir supprimer cette machine ?")) return;

        setIsDeleting(true);
        try {
            await deleteDeviceById(id as string);
            router.push("/"); // Redirection après suppression
        } catch (error) {
            console.error("Erreur lors de la suppression de la machine", error);
        } finally {
            setIsDeleting(false);
        }
    };

    if (loading) {
        return <div className="text-center text-gray-300">Chargement...</div>;
    }

    if (!device) {
        return <div className="text-center text-red-500">Aucune donnée disponible pour cette machine.</div>;
    }

    return (
        <div>
            <div className="mb-4">
                <Link href="/">
                    <span className="text-yellow-500">Accueil</span>
                </Link>
                <span className="mx-2">/</span>
                <span>{device.name}</span>
            </div>

            <h1 className="text-3xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-[#f5e0c3] to-[#c49a6c]">
                {device.name}
            </h1>

            <div className="max-w-2xl mx-auto bg-[#3a2414] p-6 rounded-2xl shadow-lg">
                {/* Image + Nom */}
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <Image
                            src={device.image ?? "/blank/device.webp"}
                            alt={device.name}
                            width={100}
                            height={100}
                            className="rounded-lg"
                        />
                        <div>
                            <h1 className="text-2xl font-bold">{device.name}</h1>
                        </div>
                    </div>

                    {device.isFavorite && (
                        <p className="bg-yellow-500 rounded-2xl py-1 px-3">
                            <FontAwesomeIcon icon={faHeart} className="text-red-500" /> Fait partie des favoris
                        </p>
                    )}
                </div>

                {/* Localisation */}
                <div className="mt-6">
                    <h2 className="text-lg font-semibold mb-2">Localisation :</h2>
                    <p>{device.location}</p>
                </div>

                {/* ID de l'appareil */}
                <div className="mt-6">
                    <h2 className="text-lg font-semibold mb-2">ID de l'appareil</h2>
                    <p>{device.id_device}</p>
                </div>

                {/* Bouton Modifier */}
                <button
                    onClick={() => router.push(`/device/edit/${device._id}`)}
                    className="mt-6 w-full cursor-pointer bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-2 rounded-lg transition"
                >
                    Modifier
                </button>

                {/* Bouton Supprimer */}
                <button
                    onClick={handleDelete}
                    className="mt-4 w-full flex items-center justify-center gap-2 cursor-pointer bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded-lg transition"
                    disabled={isDeleting}
                >
                    <FontAwesomeIcon icon={faTrash} />
                    {isDeleting ? "Suppression..." : "Supprimer"}
                </button>
            </div>
        </div>
    );
}
