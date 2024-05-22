import Link from "next/link";

// Composant Header (entête)
export default function Header() {
    return (
        <header className="bg-red p-4 text-white">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-2xl font-bold">CES'Eat - Restaurateur</h1>
                <nav>
                    <button className="bg-lightGreen hover:bg-beige text-black font-bold py-2 px-4 rounded mx-5">
                        <Link href="/">Menus</Link>
                    </button>
                    <button className="bg-lightGreen hover:bg-beige text-black font-bold py-2 px-4 rounded mr-5">
                        <Link href="/">Articles</Link>
                    </button>
                    <button className="bg-lightGreen hover:bg-beige text-black font-bold py-2 px-4 rounded mr-5">
                        <Link href="/">Livraisons</Link>
                    </button>
                    <button className="bg-lightGreen hover:bg-beige text-black font-bold py-2 px-4 rounded mr-5">
                        <Link href="/">Commandes</Link>
                    </button>
                    <button className="bg-lightGreen hover:bg-beige text-black font-bold py-2 px-4 rounded mr-5">
                        <Link href="/">Statistiques</Link>
                    </button>
                    <button className="bg-lightGreen hover:bg-beige text-black font-bold py-2 px-4 rounded mr-5">
                        <Link href="/">Mon compte</Link>
                    </button>
                </nav>
            </div>
        </header>
    );
}