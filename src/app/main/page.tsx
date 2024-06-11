"use client";

import { NextUIProvider } from "@nextui-org/system";
import Header from "../components/header/header";
import Footer from "../components/footer/footer";
import CustomCard from "../components/customcard/customcard";
import Notification from "../components/notification/notification";
import { useState, useEffect } from 'react';
import { FaUserLarge, FaChartColumn } from 'react-icons/fa6';

const notificationsConfig = [
  {
    id: 'notification1',
    title: 'Nouvelle notification',
    description: 'Une nouvelle mise à jour est disponible !',
    interval: 10000,
  },
  {
    id: 'notification2',
    title: 'Nouvelle commande en cours',
    description: 'Une nouvelle livraison est en cours !',
    interval: 15000,
  }
];

export default function Home() {
  const [modals, setModals] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    const intervals = notificationsConfig.map(notification => {
      const interval = setInterval(() => {
        setModals(prevModals => ({ ...prevModals, [notification.id]: true }));
        setTimeout(() => {
          setModals(prevModals => ({ ...prevModals, [notification.id]: false }));
        }, 3000); // Ferme la modal après 3 secondes
      }, notification.interval);
      return interval;
    });

    return () => {
      intervals.forEach(clearInterval);
    };
  }, []);

  const openModal = (id: any) => {
    setModals(prevModals => ({ ...prevModals, [id]: true }));
  };

  const closeModal = (id: any) => {
    setModals(prevModals => ({ ...prevModals, [id]: false }));
  };

  return (
    <NextUIProvider className="h-screen bg-beige">
      <Header
        title="Livreur"
        showMyAccount={true}
        showStats={false}
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