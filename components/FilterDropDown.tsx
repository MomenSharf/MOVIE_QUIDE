"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import { filtertagsMovie, filtertagsTv } from "@/constants/index";
import { toCapitalize } from "@/lib/utils";

export default function FilterDropDown({ type }: { type: "movie" | "tv" }) {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const tags = type == "movie" ? filtertagsMovie : filtertagsTv;

  const filter = searchParams.get("sort_by")?.toString();

  const handleFilterChange = (key: string) => {
    const params = new URLSearchParams(searchParams);

    if (key) {
      params.set("sort_by", `${key.toString()}.desc`);
    } else {
      params.delete("sort_by");
    }
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <Dropdown className="bg-dark-blue">
      <DropdownTrigger>
        <Button variant="bordered" className="text-white">
          {filter ? toCapitalize(filter).replace(/(\.desc)/g, '').replace("_", " ") : "Filter"}
          <svg
            width="1rem"
            height="1rem"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 7H20"
              stroke="#FFFFFF"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M7 12L17 12"
              stroke="#FFFFFF"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M11 17H13"
              stroke="#FFFFFF"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </Button>
      </DropdownTrigger>

      <DropdownMenu
        aria-label="Action event example"
        onAction={(key) => handleFilterChange(key.toString().toLowerCase())}
        className="bg-dark-blue"
      >
        {tags.map((tag) => {
          return (
            <DropdownItem
              key={tag}
              className={`${filter == "popularity" ? "text-primary" : ""}`}
              isDisabled={filter == tag}
            >
              {toCapitalize(tag).replace("_", " ")}
            </DropdownItem>
          );
        })}
      </DropdownMenu>
    </Dropdown>
  );
}
