"use client";

import { NextUIProvider } from "@nextui-org/system";
import Header from "../components/header/header";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Button } from "@nextui-org/button";
import Suivi from "../components/suivi";
import Footer from "../components/footer/footer";

export default function Home() {
  const order_status = "Commande reçu";

  return (
    <NextUIProvider className="h-screen bg-beige flex flex-col">
      <Header
        title="Livreur"
        showMyAccount={true}
        showStats={false}
      />
      <main className="container mx-auto flex-grow">
        <div className="flex justify-center">
          <Suivi order_status={order_status}></Suivi>
        </div>
        <Card className="m-4">
          <CardBody>
            <p>Destination actuelle : </p>
            {/* si commande_state = en préparation => adresse_resto sinon adresse_client */}
          </CardBody>
        </Card>
        <Card className="m-4">
          <CardBody className="flex flex-row justify-evenly">
            <p>Code : 123456</p>
            {/* code de la commande pour s'assurer qu'on passe la commande au bon client */}
            <p>Montant à payer : 0,00€</p>
            {/* div optionnel, présent uniquement si paiement en liquide */}
          </CardBody>
        </Card>
        <Card className="m-4">
          <CardBody className="flex flex-col justify-between items-center">
            <Button className="w-1/2 m-4">
              <p>Commande en Livraison</p>
              {/* Bouton désactivé si état est 'en livraison' */}
            </Button>
            <Button className="w-1/2 m-4">
              <p>Commande livrée</p>
              {/* Bouton désactivé si état est 'en préparation' */}
            </Button>
          </CardBody>
        </Card>
      </main>
      <Footer/>
    </NextUIProvider>
  );
}
