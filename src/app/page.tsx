"use client";

import { NextUIProvider } from "@nextui-org/system";
import Header from "./components/header";
import Footer from "./components/footer";
import Suivi from "./components/suivi";
import { useState } from "react";
import CustomCard from "./components/customcard"

export default function Home() {
  const [order_status, setOrderStatus] = useState("Commande reçu");

  return (
    <NextUIProvider className="h-screen bg-beige">
      <Header
        title="Livreur"
        showMyAccount={true}
        showStats={false}
        showSponsor={true}
      />
      <div className="container mx-auto">
        <div className="flex flex-wrap place-content-center">
          <CustomCard title="Commande Disponible" description="Accéder à l'ensemble des commandes disponibles" href="commande_disponible" btnText="Accéder" />
          <CustomCard title="Votre Commande en Cours" description="Accéder à votre commande Actuelle" href="suivi_commande" btnText="Accéder" />
        </div>
      </div>
      <Footer />
    </NextUIProvider>
  );
}
