import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as solidIcons from "@fortawesome/free-solid-svg-icons";

export default function Header() {
    return (
        <header className="bg-[radial-gradient(circle_at_top_left,#2e1b0c,#1c0f05)] text-white p-6 shadow-lg">
            <nav className="container mx-auto flex justify-between items-center">
                <div className="flex items-center space-x-4">
                    <Link href="/" className="text-2xl font-extrabold flex items-center space-x-2">
                        <FontAwesomeIcon icon={solidIcons.faCoffee} className="text-[#c0a080]"/>
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#f5e0c3] to-[#c49a6c]">
                            VirtuCafé
                        </span>
                    </Link>
                    <p className="text-gray-300 font-medium italic"><FontAwesomeIcon icon={solidIcons.faFireFlameCurved} className="mr-1"/>
                        Et le café coule de source !</p>
                </div>
                <ul className="flex space-x-6 text-gray-300">
                    <li>
                        <Link href="/" className="hover:text-white transition duration-300">Mon tableau de bord</Link>
                    </li>
                    <li>
                        <Link href="/device/create" className="hover:text-white transition duration-300">Ajouter un appareil</Link>
                    </li>
                    <li>
                        <Link href="/account" className="hover:text-white transition duration-300">Mon Compte</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}