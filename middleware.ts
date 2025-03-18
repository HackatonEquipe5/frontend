import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
    console.log("Middleware exécuté pour :", req.nextUrl.pathname);

    const res = NextResponse.next();

    // Autoriser toutes les requêtes venant de localhost:3000
    res.headers.set("Access-Control-Allow-Origin", "http://localhost:3000");
    res.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.headers.set("Access-Control-Allow-Headers", "Authorization, Content-Type");

    // Répondre aux requêtes OPTIONS immédiatement (CORS preflight)
    if (req.method === "OPTIONS") {
        return new Response(null, { status: 200, headers: res.headers });
    }

    return res;
}

// Appliquer uniquement aux routes API
export const config = {
    matcher: "/api/:path*",
};
