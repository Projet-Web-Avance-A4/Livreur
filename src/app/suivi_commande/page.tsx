"use client";

import { NextUIProvider } from "@nextui-org/system";
import Header from "../components/header/header";
import { Card, CardBody } from "@nextui-org/card";
import { Button } from "@nextui-org/button";
import Suivi from "../components/suivi/suivi";
import Footer from "../components/footer/footer";
import { useEffect, useState } from "react";
import { Order } from "../types/order";
import MoonLoader from "react-spinners/MoonLoader";
import { decodeAccessToken } from "../utils/utils";
import NotificationSponsorPoints from "../components/sponsorPoints/sponsorPoints";

export default function Home() {
  const [driverOrder, setDriverdOrder] = useState<Order>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const decoded = decodeAccessToken(accessToken);
    const fetchOrders = async () => {
      try {
        const response = await fetch("http://localhost:4000/order/getOrders", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        const driverOrder = data.filter(
          (order: Order) =>
            order.order_status !== "done" &&
            order.driver.driver_id === decoded?.id_user
        );
        setDriverdOrder(driverOrder[0]);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch orders.");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  function updateOrderStatus(newStatus: string) {
    const updateOrderStatus = () => {
      try {
        const response = fetch(
          "http://localhost:4000/order/updateOrderStatus",
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
        window.location.reload();
      } catch (err) {
        console.error(err);
        setError("Failed to update order.");
      }
    };
    updateOrderStatus();
  }

  return (
    <>
    <main className="container mx-auto flex-grow">
      {loading && (
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
      )}

      {driverOrder === undefined && !loading && (
        <Card className="m-8">
          <CardBody className="text-black flex items-center">
            <p>Vous n&apos;avez aucune commande en cours.</p>
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
                {driverOrder?.order_status == "in_delivery"
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
              <p>Montant à payer : {driverOrder?.total_price} €</p>
              <p>Méthode de paiement : {driverOrder?.payment.method}</p>
            </CardBody>
          </Card>
          <Card className="m-4">
            <CardBody className="flex flex-col justify-between items-center">
              <Button
                isDisabled={driverOrder?.order_status !== "in_progress"}
                className="w-1/2 m-4"
                onClick={() => updateOrderStatus("in_delivery")}
              >
                <p>Commande en Livraison</p>
                {/* Bouton désactivé si état est 'en livraison' */}
              </Button>
              <Button
                isDisabled={driverOrder?.order_status !== "in_delivery"}
                className="w-1/2 m-4"
                onClick={() => updateOrderStatus("done")}
              >
                <p>Commande Livrée</p>
                {/* Bouton désactivé si état est 'en préparation' */}
              </Button>
            </CardBody>
          </Card>
        </div>
      )}
    </main>
     <NotificationSponsorPoints />
     </>
  );
}
