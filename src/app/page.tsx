"use client";

import { NextUIProvider } from "@nextui-org/system";
import Header from "./components/header";
import CustomCard from "./components/customcard";

export default function Home() {
  return (
    <NextUIProvider className="h-screen bg-beige">
      <Header />
      <div className="container mx-auto">
        <div className="flex flex-wrap place-content-center">
          <CustomCard title="Commandes" description="Suivre et valider des commandes" href="#" btnText="Accéder" />
          <CustomCard title="Articles" description="Créer, modifier, supprimer et consulter un article" href="#" btnText="Accéder" />
          <CustomCard title="Menus" description="Créer, modifier, supprimer et consulter un menu" href="#" btnText="Accéder" />
          <CustomCard title="Livraisons" description="Suivre des livraisons" href="#" btnText="Accéder" />
        </div>
      </div>
    </NextUIProvider>
  );
}
