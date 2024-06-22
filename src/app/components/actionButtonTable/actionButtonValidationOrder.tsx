import React from "react";
import { Button, Tooltip } from "@nextui-org/react";
import { FaCheck } from "react-icons/fa6";
import updateDriver from "./utils"
import { useRouter } from "next/navigation";

export default function ActionButtonValidationOrder(item: any) {

  const router = useRouter()

  function handleClick(){
    updateDriver(item.id)
    router.push("/suivi_commande")
  }
  
  return (
      <Tooltip className="text-black" content="Valider">
        <Button
          isIconOnly
          radius="full"
          size="sm"
          variant="light"
          onClick={() => handleClick()}
        >
          <FaCheck className="text-default-400 fill-green-500" />
        </Button>
      </Tooltip>
  );
}
