"use client";

import { NextUIProvider } from "@nextui-org/system";
import Header from "../components/header";
import CommandeCard from "../components/commandecard";
import Footer from "../components/footer";
import CustomTable from "../components/table";

export default function Home() {
  return (
    <NextUIProvider className="h-screen bg-beige  flex flex-col">
       <Header
        title="Livreur"
        showMyAccount={true}
        showStats={false}
        showSponsor={true}
      />
      <main className="container mx-auto  flex-grow">
        <CustomTable/>
      </main>
      <Footer />
    </NextUIProvider>
  );
}
