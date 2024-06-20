"use client";

import { NextUIProvider } from "@nextui-org/system";
import Header from "../components/header/header";
import Footer from "../components/footer/footer";
import CustomCard from "../components/customcard/customcard";
import NotificationSponsorPoints from "../components/sponsorPoints/sponsorPoints";
import { useState, useEffect } from 'react';


export default function Home() {

  return (
    <>
      <div className="container mx-auto">
        <div className="flex flex-wrap place-content-center">
          <CustomCard title="Commande Disponible" description="Accéder à l'ensemble des commandes disponibles" href="/commande_disponible" btnText="Accéder" />
          <CustomCard title="Votre Commande en Cours" description="Accéder à votre commande Actuelle" href="/suivi_commande" btnText="Accéder" />
        </div>
      </div>
      <NotificationSponsorPoints />
    </>

  );
}