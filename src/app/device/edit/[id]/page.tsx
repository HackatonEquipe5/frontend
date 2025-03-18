"use client";

import { useState, useEffect } from "react";
import {useParams, useRouter} from "next/navigation";
import { fetchDeviceById, updateDevice } from "@/api/deviceApi";
import Link from "next/link";
import {UpdateDeviceModel} from "@/models";

export default function EditMachine() {
    const router = useRouter();
    const [machine, setMachine] = useState<any | null>(null);
    const [name, setName] = useState("");
    const [dateAdded, setDateAdded] = useState("");
    const [location, setLocation] = useState("");
    const [isFavorite, setIsFavorite] = useState(false);
    const [image, setImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState("");

    const { id } = useParams();

    useEffect(() => {
        if (id) {
            const fetchMachine = async () => {
                try {
                    const device = await fetchDeviceById(id as string);
                    setMachine(device);

                    setName(device.name);
                    setLocation(device.location);
                    setIsFavorite(device.isFavorite);
                    setImagePreview(device.image);
                } catch (err) {
                    console.error("Erreur lors de la récupération des données :", err);
                }
            };

            fetchMachine();
        }
    }, [id]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null;
        if (file) {
            setImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                if (reader.result) {
                    setImagePreview(reader.result as string);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSave = async () => {
        try {
            const updatedDeviceData: UpdateDeviceModel = {
                name,
                location,
                isFavorite,
                image: image ? URL.createObjectURL(image) : imagePreview,
            };

            const updatedDevice = await updateDevice(id as string, updatedDeviceData);

            if (updatedDevice) {
                router.push("/device/show/" + id);
            } else {
                console.error("Échec de la sauvegarde");
            }
        } catch (err) {
            console.error("Erreur lors de la sauvegarde des données :", err);
        }
    };

    if (!machine) {
        return <div>Chargement...</div>;
    }

    return (
        <div>
            <div className="mb-4">
                <Link href="/">
                    <span className="text-yellow-500">Accueil</span>
                </Link>
                <span className="mx-2">/</span>
                <span>{name}</span>
            </div>

            <div className="max-w-lg mx-auto bg-[#3a2414] p-6 rounded-2xl shadow-lg">
                <h1 className="text-2xl font-bold text-center">Modifier la machine</h1>

                {/* Nom */}
                <label className="block mt-4">
                    <span className="text-gray-300">Nom de la machine :</span>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full p-2 mt-1 rounded bg-[#4d3220] text-white border border-gray-600 focus:border-yellow-500 focus:ring focus:ring-yellow-500/50"
                    />
                </label>

                {/* Location */}
                <label className="block mt-4">
                    <span className="text-gray-300">Localisation :</span>
                    <input
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="w-full p-2 mt-1 rounded bg-[#4d3220] text-white border border-gray-600 focus:border-yellow-500 focus:ring focus:ring-yellow-500/50"
                    />
                </label>

                <label className="block mt-4">
                    <span className="text-gray-300">Favori :</span>
                    <input
                        type="checkbox"
                        checked={isFavorite}
                        onChange={(e) => setIsFavorite(e.target.checked)}
                        className="w-full p-2 mt-1 rounded bg-[#4d3220] text-white border border-gray-600 focus:border-yellow-500 focus:ring focus:ring-yellow-500/50"
                    />
                </label>

                {/* Image de la machine */}
                <label className="block mt-4">
                    <span className="text-gray-300">Image de la machine :</span>
                    <input
                        type="file"
                        onChange={handleImageChange}
                        accept="image/*"
                        className="w-full p-2 mt-1 rounded bg-[#4d3220] text-white border border-gray-600 focus:border-yellow-500 focus:ring focus:ring-yellow-500/50"
                    />
                </label>

                {/* Aperçu de l'image */}
                {imagePreview && (
                    <div className="mt-4 text-center">
                        <img
                            src={imagePreview}
                            alt="Aperçu de l'image"
                            className="w-32 h-32 object-cover rounded-full mx-auto"
                        />
                    </div>
                )}

                {/* Boutons */}
                <div className="mt-6 flex gap-4">
                    <button
                        onClick={handleSave}
                        className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-2 rounded-lg transition"
                    >
                        Sauvegarder
                    </button>
                    <button
                        onClick={() => router.push("/")}
                        className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 rounded-lg transition"
                    >
                        Annuler
                    </button>
                </div>
            </div>
        </div>
    );
}
