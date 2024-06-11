"use client";

import { NextUIProvider } from "@nextui-org/system";
import Header from "../components/header/header";
import Footer from "../components/footer/footer";
import Table from "../components/table/table";
import { data } from "../api/temp.data";
import { Card, CardBody, CardHeader, SelectionMode } from "@nextui-org/react";
import { FaBoxesStacked } from "react-icons/fa6";
import { Options } from "../interfaces/table";

const INITIAL_VISIBLE_COLUMNS = [
  "adresse_resto",
  "adresse_client",
  "payment_method",
  "actions",
];

const items = data.map((item) => (
  {
    id: item.order_id,
    adresse_resto: item.restaurant.address.street + ', ' + item.restaurant.address.city,
    ville_resto: item.restaurant.address.city,
    adresse_client: item.customer.address.street + ', ' + item.customer.address.city,
    ville_client: item.customer.address.city,
    payment_method: item.payment.method=='credit_card'?'Carte de crédit':'Liquide',
  }
));

const columns = [
  { name: "Adresse du restaurateur", uid: "adresse_resto" },
  { name: "Ville du restaurateur", uid: "ville_resto" },
  { name: "Adresse du client", uid: "adresse_client" },
  { name: "Ville du client", uid: "ville_client" },
  { name: "Moyen de paiement", uid: "payment_method" },
  { name: "Actions", uid: "actions" },
];

const options: Options = {
  content: "commande(s) trouvée(s)", //Affiche pour le nombre d'items et s'il n'y pas d'items trouvé
  search_name: "Chercher par ville", //Titre de la barre de recherche
  search_uid: ["ville_resto", "ville_client"], //uid des colonnes à filtrer
  selection_mode: "none", //"none", "single" ou "multiple"
  option_name: "Moyen de paiement",
  option_uid: "payment_method",
  value_option: [
    { name: "Carte de crédit", uid: "Carte de crédit" }, // uid need to be exactly the same as item's value. Name is the string to be printed
    { name: "Liquide", uid: "Liquide" },
  ],
};

export default function Home() {
  return (
    <NextUIProvider className="h-screen bg-beige flex flex-col">
      <Header
        title="Livreur"
        showMyAccount={true}
        showStats={false}
      />
      <main className="container mx-auto flex-grow">
        <Card className="m-8">
          <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
            <h4 className="flex items-center font-bold text-large gap-2"><FaBoxesStacked />Commandes disponibles</h4>
          </CardHeader>
          <CardBody>
            <Table
              columns={columns}
              options={options}
              items={items}
              INITIAL_VISIBLE_COLUMNS={INITIAL_VISIBLE_COLUMNS}
            />
          </CardBody>
        </Card>
      </main>
      <Footer />
    </NextUIProvider>
  );
}