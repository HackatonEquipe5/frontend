"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
    const router = useRouter();

    useEffect(() => {
        // Vérifie si un token JWT est présent dans le cache
        const token = localStorage.getItem("jwt_token");

        if (token) {
            // Si un token est trouvé, redirige vers le dashboard
            router.push("/dashboard");
        } else {
            // Sinon, redirige vers la page de déconnexion
            router.push("/logout");
        }
    }, [router]);

    return (
        <div className="flex items-center justify-center min-h-screen bg-[#3a2414] p-6">
            <div className="text-white text-xl">Vérification en cours...</div>
        </div>
    );
}
