import React, { useState } from "react";
import { Button, NextUIProvider, Tooltip } from "@nextui-org/react";
import { FaCheck } from "react-icons/fa6";

export default function ActionButtonValidationOrder(item: any) {

  return (
    <NextUIProvider>
      <Tooltip className="text-black" content="Valider">
        <Button
          isIconOnly
          radius="full"
          size="sm"
          variant="light"
          onClick={() => console.log('test')}
        >
          <FaCheck className="text-default-400 fill-green-500" />
        </Button>
      </Tooltip>
    </NextUIProvider>
  );
};