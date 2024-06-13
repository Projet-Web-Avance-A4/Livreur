import React from "react";
import {
  Button,
  NextUIProvider,
  Tooltip,
} from "@nextui-org/react";
import { FaCheck } from "react-icons/fa6";

function test() {
    console.log("test button")
}

export default function ActionButtonValidationOrder() {
  return (
    <NextUIProvider>
      <Tooltip className="text-black" content="Valider">
        <Button isIconOnly radius="full" size="sm" variant="light" onClick={test}>
          <FaCheck className="text-default-400 fill-green-500" />
        </Button>
      </Tooltip>
    </NextUIProvider>
  );
};
