"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LogoutPage() {
    const router = useRouter();

    useEffect(() => {
        // Supprime le token JWT du cache (localStorage)
        localStorage.removeItem("jwt_token");

        // Redirige vers la page de connexion après la déconnexion
        router.push("/login");
    }, [router]);

    return (
        <div className="flex items-center justify-center min-h-screen bg-[#3a2414] p-6">
            <div className="text-white text-xl">Déconnexion en cours...</div>
        </div>
    );
}
