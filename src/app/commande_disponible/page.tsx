"use client";

import { NextUIProvider } from "@nextui-org/system";
import Header from "../components/header";
import CommandeCard from "../components/commandecard";
import Footer from "../components/footer";

export default function Home() {
  return (
    <NextUIProvider className="h-screen bg-beige  flex flex-col">
       <Header
        title="Livreur"
        showMyAccount={true}
        showStats={false}
        showSponsor={true}
      />
      <main className="container mx-auto  flex-grow">
        <div className="flex flex-wrap place-content-center">
          <CommandeCard
            nom_resto="Au Ces'Eat"
            adresse_resto="8 Boulevard Louis XIV"
            adresse_client="9 Boulevard Louis XVI"
            mode_paiement="carte"
          />
          <CommandeCard
            nom_resto="Au Ces'Eat"
            adresse_resto="8 Boulevard Louis XIV"
            adresse_client="9 Boulevard Louis XVI"
            mode_paiement="carte"
          />
          <CommandeCard
            nom_resto="Au Ces'Eat"
            adresse_resto="8 Boulevard Louis XIV"
            adresse_client="9 Boulevard Louis XVI"
            mode_paiement="carte"
          />
          <CommandeCard
            nom_resto="Au Ces'Eat"
            adresse_resto="8 Boulevard Louis XIV"
            adresse_client="9 Boulevard Louis XVI"
            mode_paiement="carte"
          />
        </div>
      </main>
      <Footer />
    </NextUIProvider>
  );
}
