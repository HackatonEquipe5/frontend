"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {fetchCurrentUser, updateUser} from "@/api/userApi";
import Link from "next/link";

export default function EditProfilePage() {
    const router = useRouter();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        // Récupérer les données de l'utilisateur au chargement de la page
        const fetchUserData = async () => {
            try {
                const userData = await fetchCurrentUser();
                setFirstName(userData.firstName);
                setLastName(userData.lastName);
                setEmail(userData.email);
            } catch (err: any) {
                setError("Impossible de charger les informations de l'utilisateur.");
            }
        };

        fetchUserData();
    }, []);

    const handleUpdateProfile = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!firstName || !lastName || !email) {
            setError("Veuillez remplir tous les champs.");
            return;
        }

        try {
            const userData = { firstName, lastName, email, ...(password && { password }) };

            const updatedUser = await updateUser(userData);

            if (updatedUser) {
                router.push("/account");
            }
        } catch (err: any) {
            setError(err?.message || "Échec de la mise à jour. Veuillez réessayer.");
        }
    };

    return (
        <div>
            <div className="mb-4">
                <Link href="/">
                    <span className="text-yellow-500">Accueil</span>
                </Link>
                <span className="mx-2">/</span>
                <span>Mon Compte</span>
            </div>

            <h1 className="text-3xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-[#f5e0c3] to-[#c49a6c]">
                Modifier mon compte
            </h1>

            <div className="max-w-lg mx-auto bg-[#3a2414] p-6 rounded-2xl shadow-lg">
                {/* Formulaire de modification */}
                <form onSubmit={handleUpdateProfile}>
                    {/* Champ Prénom */}
                    <div className="mb-4">
                        <label htmlFor="firstName" className="block text-sm text-gray-300 mb-2">Prénom</label>
                        <input
                            id="firstName"
                            type="text"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            className="w-full px-4 py-2 rounded-lg bg-[#4d3220] border border-gray-500 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                            placeholder="Entrez votre prénom"
                        />
                    </div>

                    {/* Champ Nom */}
                    <div className="mb-4">
                        <label htmlFor="lastName" className="block text-sm text-gray-300 mb-2">Nom</label>
                        <input
                            id="lastName"
                            type="text"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            className="w-full px-4 py-2 rounded-lg bg-[#4d3220] border border-gray-500 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                            placeholder="Entrez votre nom"
                        />
                    </div>

                    {/* Champ Email */}
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm text-gray-300 mb-2">Email</label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 rounded-lg bg-[#4d3220] border border-gray-500 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                            placeholder="Entrez votre email"
                        />
                    </div>

                    {/* Champ Mot de passe (optionnel) */}
                    <div className="mb-6">
                        <label htmlFor="password" className="block text-sm text-gray-300 mb-2">Nouveau mot de passe</label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 rounded-lg bg-[#4d3220] border border-gray-500 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                            placeholder="Entrez un nouveau mot de passe (optionnel)"
                        />
                    </div>

                    {/* Message d'erreur */}
                    {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

                    {/* Bouton de mise à jour */}
                    <button
                        type="submit"
                        className="w-full py-2 rounded-lg bg-yellow-500 hover:bg-yellow-600 text-black font-semibold transition"
                    >
                        Mettre à jour
                    </button>
                </form>

                <div className="mt-4 text-center text-white">
                    <p>Cliquez ici pour vous <a href="/logout" className="text-red-600">déconnecter</a></p>
                </div>
            </div>
        </div>
    );
}
