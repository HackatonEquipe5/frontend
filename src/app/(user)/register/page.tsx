"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createUser } from "@/api/userApi";
import Link from "next/link";

export default function RegisterPage() {
    const router = useRouter();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!firstName || !lastName || !email || !password) {
            setError("Veuillez remplir tous les champs.");
            return;
        }

        try {
            const userData = { firstName, lastName, email, password };
            const createdUser = await createUser(userData);

            if (createdUser) {
                setSuccessMessage("Inscription réussie ! Redirection en cours...");
                setError(""); // Nettoyer l'erreur en cas de succès

                setTimeout(() => {
                    router.push("/login");
                }, 2000); // Redirection après 2 secondes
            }
        } catch (err: any) {
            setError(err?.message || "Échec de l'inscription. Veuillez réessayer.");
        }
    };

    return (
        <div>
            <div className="mb-4">
                <Link href="/">
                    <span className="text-yellow-500">Accueil</span>
                </Link>
                <span className="mx-2">/</span>
                <span>S'inscrire</span>
            </div>

            <h1 className="text-3xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-[#f5e0c3] to-[#c49a6c]">
                S'inscrire
            </h1>

            <div className="flex items-center justify-center">
                <div className="max-w-sm w-full bg-[#4d3220] p-6 rounded-2xl shadow-lg">

                    {/* Formulaire d'inscription */}
                    <form onSubmit={handleRegister}>
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

                        {/* Champ Mot de passe */}
                        <div className="mb-6">
                            <label htmlFor="password" className="block text-sm text-gray-300 mb-2">Mot de passe</label>
                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-2 rounded-lg bg-[#4d3220] border border-gray-500 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                placeholder="Entrez votre mot de passe"
                            />
                        </div>

                        {/* Message d'erreur */}
                        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

                        {/* Message de succès */}
                        {successMessage && <p className="text-green-500 text-sm mb-4">{successMessage}</p>}

                        {/* Bouton d'inscription */}
                        <button
                            type="submit"
                            className="w-full py-2 rounded-lg bg-yellow-500 hover:bg-yellow-600 text-black font-semibold transition"
                        >
                            S'inscrire
                        </button>
                    </form>

                    <div className="mt-4 text-center text-white">
                        <p>Vous avez déjà un compte ? <a href="/login" className="text-yellow-500 hover:underline">Se connecter</a></p>
                    </div>
                </div>
            </div>
        </div>
    );
}
