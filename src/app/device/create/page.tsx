"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createDevice } from "@/api/deviceApi"; // Correct API import

export default function CreateMachine() {
    const router = useRouter();
    const [name, setName] = useState("");
    const [location, setLocation] = useState(""); // Ajout du champ location
    const [isFavorite, setIsFavorite] = useState(false); // Ajout du champ isFavorite
    const [status, setStatus] = useState("Éteinte");
    const [image, setImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState("");
    const [error, setError] = useState<string>(""); // State to handle errors

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

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validation basique du formulaire
        if (!name || !location || !image) {
            setError("Veuillez remplir tous les champs.");
            return;
        }

        try {
            const deviceData = { name, location, isFavorite, image };

            // Envoi de la requête d'ajout à l'API via la fonction createDevice
            const createdDevice = await createDevice(deviceData);

            if (createdDevice) {
                // Redirige vers la page du dashboard après une création réussie
                router.push("/dashboard");
            }
        } catch (err: any) {
            setError(err?.message || "Échec de la création. Veuillez réessayer.");
        }
    };

    return (
        <div>
            <div className="max-w-lg mx-auto bg-[#3a2414] p-6 rounded-2xl shadow-lg">
                <h1 className="text-2xl font-bold text-center">Créer une machine</h1>

                {/* Affichage de l'erreur */}
                {error && (
                    <div className="text-red-500 text-center mb-4">{error}</div>
                )}

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
                    <span className="text-gray-300">Emplacement :</span>
                    <input
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
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
                        Créer
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
