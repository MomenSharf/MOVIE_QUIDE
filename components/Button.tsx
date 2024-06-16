import React, { ReactNode } from "react";
import { Button } from "@nextui-org/react";
import { twMerge } from "tailwind-merge";

export default function ButtonUi({ children, className }: { children: ReactNode, className?: string }) {
  return <Button className={twMerge('bg-primary text-white', className && className)} size="sm" type="submit">{children}</Button>;
}
