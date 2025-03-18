"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginUser } from "@/api/userApi";
import Link from "next/link";

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email || !password) {
            setError("Veuillez remplir tous les champs.");
            return;
        }

        try {
            const token = await loginUser(email, password);

            if (token) {
                localStorage.setItem("jwt_token", token);
                setSuccessMessage("Connexion réussie ! Redirection en cours...");

                setTimeout(() => {
                    router.push("/dashboard");
                }, 2000);
            } else {
                setError("Échec de la connexion. Veuillez vérifier vos identifiants.");
            }
        } catch (err) {
            setError("Échec de la connexion. Veuillez vérifier vos identifiants.");
        }
    };

    return (
        <div>
            <div className="mb-4">
                <Link href="/">
                    <span className="text-yellow-500">Accueil</span>
                </Link>
                <span className="mx-2">/</span>
                <span>Se connecter</span>
            </div>
            <div className="flex items-center justify-center min-h-screen bg-[#3a2414] p-6">
                <div className="max-w-sm w-full bg-[#4d3220] p-6 rounded-2xl shadow-lg">
                    <h1 className="text-3xl font-bold text-center text-white mb-6">Connexion</h1>

                    {successMessage && (
                        <p className="text-green-500 text-sm text-center mb-4">{successMessage}</p>
                    )}

                    <form onSubmit={handleLogin}>
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

                        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

                        <button
                            type="submit"
                            className="w-full py-2 rounded-lg bg-yellow-500 hover:bg-yellow-600 text-black font-semibold transition"
                        >
                            Se connecter
                        </button>
                    </form>

                    <p className="text-gray-300 text-center mt-4">
                        Vous n'avez pas de compte ? <a href="/register" className="text-yellow-500 hover:underline">Inscrivez-vous</a>
                    </p>
                </div>
            </div>
        </div>
    );
}
