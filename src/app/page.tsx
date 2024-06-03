"use client";

import { NextUIProvider } from "@nextui-org/system";
import Header from "./components/header";
import Footer from "./components/footer";
import CustomCard from "./components/customcard"

export default function Home() {

  return (
    <NextUIProvider className=" min-h-screen bg-beige flex flex-col">
      <Header
        title="Livreur"
        showMyAccount={true}
        showStats={false}
        showSponsor={true}
      />
      <main className="container mx-auto flex-grow">
        <div className="flex flex-wrap place-content-center">
          <CustomCard title="Commande Disponible" description="Accéder à l'ensemble des commandes disponibles" href="commande_disponible" btnText="Accéder" />
          <CustomCard title="Votre Commande en Cours" description="Accéder à votre commande Actuelle" href="suivi_commande" btnText="Accéder" />
        </div>
      </main>
      <Footer />
    </NextUIProvider>
  );
}
