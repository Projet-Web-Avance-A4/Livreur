"use client";

import { NextUIProvider } from "@nextui-org/system";
import Header from "../components/header/header";
import Footer from "../components/footer/footer";
import CustomTable from "../components/table/table";
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import { FaBoxesStacked } from "react-icons/fa6";
import { Options } from "../interfaces/table";
import { propsTable } from "@/app/interfaces/table";
import ActionButtonValidationOrder from "../components/actionButtonTable/actionButtonValidationOrder";
import { useEffect, useState } from "react";
import { Order } from "../types/order";
import jwt, { JwtPayload } from "jsonwebtoken";
import MoonLoader from "react-spinners/MoonLoader";

export default function Home() {
  const [ordersList, setOrdersList] = useState<Order[]>([]);
  const [assignedOrder, setAssignedOrder] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const accessToken = localStorage.getItem('accessToken')
  const decoded: JwtPayload = jwt.verify(accessToken!, 'access_secret_jwt') as JwtPayload;

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(
          "http://localhost:3001/api/order/getOrders",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        const filteredOrders = data.filter(
          (order: Order) =>
            (order.order_status === "En cours de préparation" || order.order_status === "Commande reçue") &&
            order.driver.driver_id === null
        );
        setOrdersList(filteredOrders);
        const assignedOrder = data.filter(
          (order: Order) =>
            (order.order_status === "En cours de préparation" || order.order_status === "Commande reçue") &&
            order.driver.driver_id === decoded.userId
        );
        setAssignedOrder(assignedOrder)
      } catch (err) {
        console.error(err);
        setError("Failed to fetch orders.");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const INITIAL_VISIBLE_COLUMNS = [
    "adresse_resto",
    "adresse_client",
    "payment_method",
    "actions", //Always here
  ];

  const items = ordersList.map((item) => ({
    id: item.order_id, //We always need an unique id, but it is never shown. Make sure to used an unique key as value.
    adresse_resto:
      item.restaurant.address.street + ", " + item.restaurant.address.city,
    adresse_client:
      item.customer.address.street + ", " + item.customer.address.city,
    payment_method: item.payment.method,
  }));

  const columns = [
    { name: "Adresse du restaurateur", uid: "adresse_resto" },
    { name: "Adresse du client", uid: "adresse_client" },
    { name: "Moyen de paiement", uid: "payment_method" },
    { name: "Actions", uid: "actions" }, //Always here
  ];

  const options: Options = {
    content: "commande(s) trouvée(s)", //Used for the number of items and when no items was found
    search_name: "Chercher par adresse", //Title of the search bar
    search_uid: ["adresse_resto", "adresse_client"], //ALWAYS AN ARRAY, uid of the column to filter
    selection_mode: "none", //"none", "single" or "multiple"
    option_name: "Moyen de paiement", //Name of the option filter
    option_uid: "payment_method", //ALWAYS A SINGLE STRING, uid of the column filtered with the option
    value_option: [
      { name: "Carte de crédit", uid: "Carte de crédit" }, // uid need to be exactly the same as item's value. Name is the string to be printed
      { name: "Liquide", uid: "Liquide" },
    ],
  };

  const props: propsTable = {
    columns: columns,
    options: options,
    items: items,
    INITIAL_VISIBLE_COLUMNS: INITIAL_VISIBLE_COLUMNS,
  };

  return (
    <NextUIProvider className="h-screen bg-beige flex flex-col">
      <Header title="Livreur" showMyAccount={true} showStats={false} />
      <main className="container mx-auto flex-grow">

      {loading && 
      <div className="flex justify-center m-14">
        <MoonLoader
        // color={blue}
        loading={true}
        // cssOverride={override}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
      </div>
      }

    {assignedOrder.length && !loading &&
        <Card className="m-8">
          <CardBody className="text-black flex items-center">
            <p>Vous avez déjà une commande à réaliser</p> 
          </CardBody>
        </Card>}


    {!assignedOrder.length && !loading &&
        <Card className="m-8">
          <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
            <h4 className="flex items-center font-bold text-large gap-2">
              <FaBoxesStacked />
              Commandes disponibles
            </h4>
          </CardHeader>
          <CardBody>
            <CustomTable
              props={props}
              actionButtons={[ActionButtonValidationOrder]}
            />
          </CardBody>
        </Card>
    }
      </main>
      <Footer />
    </NextUIProvider>
  );
}
