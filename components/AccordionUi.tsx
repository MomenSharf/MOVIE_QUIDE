"use client";

import { Season } from "@/lib/types/tv";
import { Accordion, AccordionItem } from "@nextui-org/accordion";

export default function AccordionUi({ data }: { data: Season[] }) {
  console.log(data);
  
  return (
    <Accordion>
      {data.map((season: Season, i: number) => {
        return (
          <AccordionItem
            key={i}
            aria-label={` ${i}`}
            title={`Season ${i}`}
            className="text-lg text-white"
            subtitle= {
              <span>{season.name}</span>
            }
          >
            {season.overview}
          </AccordionItem>
        );
      })}
    </Accordion>
  );
}
