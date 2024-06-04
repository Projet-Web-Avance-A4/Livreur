"use client";

import { NextUIProvider } from "@nextui-org/system";
import Header from "./components/header";
import Footer from "./components/footer";
import Suivi from "./components/suivi";
import { useState } from "react";
import CustomTable from "./components/table";

export default function Home() {
  const [order_status, setOrderStatus] = useState("Commande reçu");

  return (
    <NextUIProvider className="h-screen bg-beige">
      <Header
        title="Livreur"
        showMyAccount={true}
        showStats={false}
        showSponsor={true}
      />
      <div className="container mx-auto">
        <div className="flex flex-wrap place-content-center">
          <CustomTable />
        </div>
      </div>
      <Footer />
    </NextUIProvider>
  );
}
