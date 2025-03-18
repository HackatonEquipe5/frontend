"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("jwt_token");

        if (token) {
            router.push("/dashboard");
        } else {
            router.push("/logout");
        }
    }, [router]);

    return (
        <div className="flex items-center justify-center min-h-screen bg-[#3a2414] p-6">
            <div className="text-white text-xl">Vérification en cours...</div>
        </div>
    );
}
