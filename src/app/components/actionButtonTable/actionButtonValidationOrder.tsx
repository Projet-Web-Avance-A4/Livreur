import React, { useState } from "react";
import { Button, NextUIProvider, Tooltip } from "@nextui-org/react";
import { FaCheck } from "react-icons/fa6";
import updateDriver from "./utils"
import Link from "next/link";

export default function ActionButtonValidationOrder(item: any) {
  
  return (
    <NextUIProvider>
      <Tooltip className="text-black" content="Valider">
        <Button
          as={Link}
          isIconOnly
          radius="full"
          size="sm"
          variant="light"
          href="suivi_commande"
          onClick={() => updateDriver(item.id)}
        >
          <FaCheck className="text-default-400 fill-green-500" />
        </Button>
      </Tooltip>
    </NextUIProvider>
  );
}
