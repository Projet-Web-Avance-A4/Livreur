"use client";

import { Button } from "@nextui-org/button";
import { NextUIProvider } from "@nextui-org/react";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import Link from "next/link";

interface iCustomCard {
  title: string
  description?: string
  href: string
  btnText: string
}

// Composant Card
export default function CustomCard(props: iCustomCard) {
    return (
        <NextUIProvider>
            <Card className="m-8">
              <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                <h4 className="font-bold text-large">{props.title}</h4>
                <p className="text-default-500">{props.description}</p>
              </CardHeader>
              <CardBody>
                <Button as={Link} href={props.href}>
                  <p>{props.btnText}</p>
                </Button>
              </CardBody>
            </Card>
        </NextUIProvider>
    );
}