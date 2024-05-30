"use client";

import { NextUIProvider } from "@nextui-org/system";
import Header from "../components/header";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Button } from "@nextui-org/button";

export default function Home() {
  return (
    <NextUIProvider className="h-screen bg-beige">
      <Header />
      <div className="container mx-auto">
        <Card className="m-4">
          <CardBody>
            <p>SUIVI PAR POINTS A FAIRE</p>
          </CardBody>
        </Card>
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
          <CardBody className="flex flex-row justify-between">
            <Button className="w-5/12">
              <p>Commande en Livraison</p>
              {/* Bouton désactivé si état est 'en livraison' */}
            </Button>
            <Button className="w-5/12">
              <p>Commande livrée</p>
              {/* Bouton désactivé si état est 'en préparation' */}
            </Button>
          </CardBody>
        </Card>
      </div>
    </NextUIProvider>
  );
}
