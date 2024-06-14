"use client";

import { NextUIProvider } from "@nextui-org/system";
import Header from "../components/header/header";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Button } from "@nextui-org/button";
import Suivi from "../components/suivi/suivi";
import Footer from "../components/footer/footer";
import { useEffect, useState } from "react";
import { Order } from "../types/order";
import jwt, { JwtPayload } from "jsonwebtoken";
import MoonLoader from "react-spinners/MoonLoader";

export default function Home() {
  const [driverOrder, setDriverdOrder] = useState<Order>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const accessToken = localStorage.getItem("accessToken");
  const decoded: JwtPayload = jwt.verify(accessToken!, 'access_secret_jwt') as JwtPayload;

  useEffect(() => {
    fetchOrders();
    console.log("useEffect")
  }, []);

  async function fetchOrders() {
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
      const driverOrder = data.filter((order: Order) =>
          order.order_status !== "Livrée" &&
          order.driver.driver_id === decoded.userId
      );
      setDriverdOrder(driverOrder[0]);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch orders.");
    } finally {
      setLoading(false)
      console.log("fetchOrdres finished");
    }
  }

  function updateOrderStatus(newStatus: string) {
    const updateOrderStatus = () => {
      try {
        const response = fetch(
          "http://localhost:3001/api/order/updateOrderStatus",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              idOrder: driverOrder?.order_id,
              newStatus: newStatus,
            }),
          }
        );
      window.location.reload()
      } catch (err) {
        console.error(err);
        setError("Failed to update order.");
      } finally {
      }
    };
    updateOrderStatus();
  }

  return (
    <NextUIProvider className="h-screen bg-beige flex flex-col">
      <Header title="Livreur" showMyAccount={true} showStats={false} />

      <main className="container mx-auto flex-grow">

      {loading && 
      <div className="flex justify-center m-14">
        <MoonLoader
        // color={blue}
        loading={loading}
        // cssOverride={override}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
      </div>
      }

      {driverOrder === undefined && !loading && (

          <Card className="m-8">
            <CardBody className="text-black flex items-center">
              <p>Vous n'avez aucune commande en cours.</p>
            </CardBody>
          </Card>
      )}

      {driverOrder !== undefined && !loading && (
        <div>
          <div className="flex justify-center">
            <Suivi order_status={driverOrder?.order_status}></Suivi>
          </div>
          <Card className="m-4">
            <CardBody>
              <p>
                Destination actuelle :{" "}
                {driverOrder?.order_status == "En cours de livraison"
                  ? driverOrder.customer.address.street +
                    ", " +
                    driverOrder.customer.address.city
                  : driverOrder?.restaurant.address.street +
                    ", " +
                    driverOrder?.restaurant.address.city}
              </p>
            </CardBody>
          </Card>
          <Card className="m-4">
            <CardBody className="flex flex-row justify-evenly">
              <p>Code : {driverOrder?.verification_code}</p>
              <p>Montant à payer : {driverOrder?.price} €</p>
              <p>Méthode de paiement : {driverOrder?.payment.method}</p>
            </CardBody>
          </Card>
          <Card className="m-4">
            <CardBody className="flex flex-col justify-between items-center">
              <Button
                isDisabled={
                  driverOrder?.order_status !== "En cours de préparation"
                }
                className="w-1/2 m-4"
                onClick={() => updateOrderStatus("En cours de livraison")}
              >
                <p>Commande en Livraison</p>
                {/* Bouton désactivé si état est 'en livraison' */}
              </Button>
              <Button
                isDisabled={
                  driverOrder?.order_status !== "En cours de livraison"
                }
                className="w-1/2 m-4"
                onClick={() => updateOrderStatus("Livrée")}
              >
                <p>Commande livrée</p>
                {/* Bouton désactivé si état est 'en préparation' */}
              </Button>
            </CardBody>
          </Card>
        </div>
      )}
     </main> 
      <Footer />
    </NextUIProvider>
  );
}
