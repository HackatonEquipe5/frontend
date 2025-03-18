"use client";  // Cette directive assure que ce fichier est traité comme un Client Component

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";  // Importation de useParams
import { fetchUserById, deleteUser, fetchCurrentUser } from "@/api/userApi";  // Assure-toi que ces fonctions existent
import { toast } from "react-toastify";
import Link from "next/link";

export default function UserProfilePage() {
    const router = useRouter();
    const { id } = useParams();
    const [user, setUser] = useState<any | null>(null);
    const [error, setError] = useState<string>("");

    useEffect(() => {
        if (id) {
            const fetchProfile = async () => {
                try {
                    const userProfile = await fetchUserById(id as string);
                    setUser(userProfile);
                } catch (err: any) {
                    setError("Impossible de charger les informations de cet utilisateur.");
                }
            };

            fetchProfile();
        }
    }, [id]);

    const handleDeleteUser = async () => {
        if (confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ? Cette action est irréversible.")) {
            try {
                await deleteUser(id as string);
                toast.success("Utilisateur supprimé avec succès.");
                router.push("/dashboard");
            } catch (err: any) {
                toast.error("Échec de la suppression de l'utilisateur.");
            }
        }
    };

    return (
        <div>
            {user ? (
                <>
            <div className="mb-4">
                <Link href="/">
                    <span className="text-yellow-500">Accueil</span>
                </Link>
                <span className="mx-2">/</span>
                <span>{user.firstName} {user.lastName}</span>
            </div>
                </>
            ) : (
                <p className="text-white text-lg">Chargement du profil...</p>
            )}

            <h1 className="text-3xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-[#f5e0c3] to-[#c49a6c]">
                Profil de l'utilisateur
            </h1>

            <div className="flex items-center justify-center">

                <div className="max-w-lg mx-auto bg-[#3a2414] min-w-3/5 p-6 rounded-2xl shadow-lg">
                    {error && <p className="text-red-500 mb-4">{error}</p>}

                    {user ? (
                        <>
                            <div className="mb-4">
                                <p className="text-white text-lg">Nom : {user.firstName} {user.lastName}</p>
                                <p className="text-white text-lg">Email : {user.email}</p>
                            </div>

                            <button
                                onClick={handleDeleteUser}
                                className="w-full py-2 mt-4 rounded-lg bg-red-600 hover:bg-red-700 text-white font-semibold transition"
                            >
                                Supprimer cet utilisateur
                            </button>
                        </>
                    ) : (
                        <p className="text-white text-lg">Chargement du profil...</p>
                    )}
                </div>
            </div>
        </div>
    );
}
