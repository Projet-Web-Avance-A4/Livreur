"use client";

import { Button } from "@nextui-org/button";
import { NextUIProvider } from "@nextui-org/react";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import Link from "next/link";

interface iCommandeCard {
  nom_resto: string;
  adresse_resto: string;
  adresse_client: string;
  mode_paiement: string;
}

// Composant Card
export default function CommandeCard(props: iCommandeCard) {
  return (
      <Card className="m-4">
        <CardBody className="flex flex-row text-center items-center">
          <div className="m-4 flex flex-col">
            <div>{props.nom_resto}</div>
            <div>{props.adresse_resto}</div>
          </div>
          <div className="bg-red w-1 rounded h-20"></div>
          <div className="m-4">
            <div>Adresse du Client</div>
            <div>{props.adresse_client}</div>
          </div>
          <div className="bg-red w-1 rounded h-20"></div>
          <div className="m-4">
            <div>Moyen de Paiement</div>
            <div>{props.mode_paiement}</div>
          </div>
          <button className="m-4 p-2 bg-red text-white rounded">
            Accepter
          </button>
        </CardBody>
      </Card>
  );
}
