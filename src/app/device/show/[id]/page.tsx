"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { fetchDeviceById } from "@/api/deviceApi";
import Link from "next/link";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHeart} from "@fortawesome/free-solid-svg-icons";

export default function MachineView() {
    const router = useRouter();
    const { id } = useParams();  // Utilisation de useParams pour récupérer l'ID de la machine
    const [device, setDevice] = useState<any>(null);
    const [status, setStatus] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(true);

    // Définition des couleurs selon l'état de la machine
    const statusColors: { [key: string]: string } = {
        "Éteinte": "bg-gray-500",
        "En marche": "bg-green-500",
        "Coule du café": "bg-orange-500",
        "En maintenance": "bg-red-500",
    };

    // Utilisation de useEffect pour récupérer les données de la machine
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Vérifie si l'ID est valide avant d'effectuer l'appel
                if (!id) {
                    console.error("Aucun ID de machine n'est spécifié.");
                    setLoading(false);
                    return;
                }
                const device = await fetchDeviceById(id as string);
                setDevice(device);
                // setStatus(device.status);
                setLoading(false);
            } catch (error) {
                console.error("Erreur lors de la récupération des données de la machine", error);
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    if (loading) {
        return (
            <div className="text-center text-gray-300">Chargement...</div>
        );
    }

    if (!device) {
        return (
            <div className="text-center text-red-500">Aucune donnée disponible pour cette machine.</div>
        );
    }

    return (
        <div>
            <div className="mb-4">
                <Link href="/">
                    <span className="text-yellow-500">Accueil</span>
                </Link>
                <span className="mx-2">/</span>
                <span>{ device.name }</span>
            </div>

            <div className="max-w-2xl mx-auto bg-[#3a2414] p-6 rounded-2xl shadow-lg">
                {/* Image + Nom */}
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <Image src={device.image ?? "/blank/device.webp"} alt={device.name} width={100} height={100} className="rounded-lg" />
                        <div>
                            <h1 className="text-2xl font-bold">{device.name}</h1>
                            <p className="text-gray-300 text-sm">Ajoutée le {device.dateAdded}</p>
                        </div>
                    </div>

                    {device.isFavorite && (
                        <p className="bg-yellow-500 rounded-2xl py-1 px-3"><FontAwesomeIcon icon={faHeart} className="text-red-500" /> Fait partie des favoris</p>
                    )}
                </div>

                {/* location */}
                <div className="mt-6">
                    <h2 className="text-lg font-semibold mb-2">Localisation :</h2>
                    <p>
                        {device.location}
                    </p>
                </div>

                {/* État de la machine
                <div className="mt-6">
                    <h2 className="text-lg font-semibold mb-2">État actuel :</h2>
                    <div className={`inline-block px-4 py-2 rounded-full text-sm font-medium ${statusColors[status]}`}>
                        {status}
                    </div>
                </div>

                 Dernières actions
                <div className="mt-6">
                    <h2 className="text-lg font-semibold mb-2">Dernières actions :</h2>
                    <ul className="space-y-2">
                        {device.actions?.map((action: { id: number; text: string; time: string }) => (
                            <li key={action.id} className="flex justify-between bg-[#4d3220] p-2 rounded-lg">
                                <span>{action.text}</span>
                                <span className="text-gray-300 text-sm">{action.time}</span>
                            </li>
                        ))}
                    </ul>
                </div>*/}

                {/* Bouton Modifier */}
                <button
                    onClick={() => router.push(`/device/edit/${device._id}`)}
                    className="mt-6 w-full cursor-pointer bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-2 rounded-lg transition"
                >
                    Modifier
                </button>

            </div>
        </div>
    );
}
