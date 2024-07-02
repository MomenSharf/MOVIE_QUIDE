import Link from "next/link";
import React, { ReactNode } from "react";
import ButtonUi from "./Button";

export default function Scroll({
  children,
  title,
  link,
}: {
  children: ReactNode;
  title: string;
  link: string;
}) {
  return (
    <div className="">
      <h2 className="text-2xl mb-5">{title}</h2>
      <div className="flex"></div>
      <div className="overflow-y-scroll flex *:min-w-[167px] scrollbar-hide gap-3">
        {children}

        <Link href={link} className="flex justify-center items-center">
          <ButtonUi className=" bg-opacity-80 animate-bounceX">
            <span>See more</span>
            <svg
              className="animate-bounceX-item"
              width="1rem"
              height="1rem"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="m13 16 4-4-4-4M7 16l4-4-4-4"
                stroke="#FFFFFF"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </ButtonUi>
        </Link>
      </div>
    </div>
  );
}
