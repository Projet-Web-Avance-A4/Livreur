"use client";

import { NextUIProvider } from "@nextui-org/react";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import {
  FaReceipt,
  FaFireBurner,
  FaTruck,
  FaCircleCheck,
} from "react-icons/fa6";

interface Suivi {
  order_status?: string;
}

// Composant Card
export default function Suivi(props: Suivi) {
  return (
    <NextUIProvider>
      <div className="flex flex-row items-center">
        <div
          className={`m-1 bg-white size-24 rounded-full flex items-center justify-center`}
        >
          <FaReceipt className={`fill-green-500 size-12`} />
        </div>

        <div
          className={`m-0.5 ${
            props.order_status !== "Commande reçue" ? "bg-green-500" : "bg-red"
          } size-4 rounded-full`}
        ></div>
        <div
          className={`m-0.5 ${
            props.order_status !== "Commande reçue" ? "bg-green-500" : "bg-red"
          } size-4 rounded-full`}
        ></div>
        <div
          className={`m-0.5 ${
            props.order_status !== "Commande reçue" ? "bg-green-500" : "bg-red"
          } size-4 rounded-full`}
        ></div>

        <div
          className={`m-1 bg-white size-24 rounded-full flex items-center justify-center`}
        >
          <FaFireBurner
            className={`${
              props.order_status !== "Commande reçue" ? "fill-green-500" : "fill-red"
            } size-12`}
          />
        </div>

        <div
          className={`m-0.5 ${
            props.order_status === "En cours de livraison" ||
            props.order_status === "Livrée"
              ? "bg-green-500"
              : "bg-red"
          } size-4 rounded-full`}
        ></div>
        <div
          className={`m-0.5 ${
            props.order_status === "En cours de livraison" ||
            props.order_status === "Livrée"
              ? "bg-green-500"
              : "bg-red"
          } size-4 rounded-full`}
        ></div>
        <div
          className={`m-0.5 ${
            props.order_status === "En cours de livraison" ||
            props.order_status === "Livrée"
              ? "bg-green-500"
              : "bg-red"
          } size-4 rounded-full`}
        ></div>

        <div
          className={`m-1 bg-white size-24 rounded-full flex items-center justify-center`}
        >
          <FaTruck
            className={`${
              props.order_status === "En cours de livraison" ||
              props.order_status === "Livrée"
                ? "fill-green-500"
                : "fill-red"
            } size-12`}
          />
        </div>

        <div
          className={`m-0.5 ${
            props.order_status === "Livrée" ? "bg-green-500" : "bg-red"
          } size-4 rounded-full`}
        ></div>
        <div
          className={`m-0.5 ${
            props.order_status === "Livrée" ? "bg-green-500" : "bg-red"
          } size-4 rounded-full`}
        ></div>
        <div
          className={`m-0.5 ${
            props.order_status === "Livrée" ? "bg-green-500" : "bg-red"
          } size-4 rounded-full`}
        ></div>

        <div
          className={`m-1 bg-white size-24 rounded-full flex items-center justify-center`}
        >
          <FaCircleCheck
            className={`${
              props.order_status === "Livrée" ? "fill-green-500" : "fill-red"
            } size-12`}
          />
        </div>
      </div>
    </NextUIProvider>
  );
}
