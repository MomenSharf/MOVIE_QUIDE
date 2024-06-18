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

export default function FilterDropDown({
  type,
}: {
  type: "movie" | "tv" | undefined;
}) {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const tags = type == "tv" ? filtertagsTv : filtertagsMovie;

  const filter = searchParams.get("sort_by")?.toString();

  const handleFilterChange = (key: string) => {
    const params = new URLSearchParams(searchParams);

    if (key && key != "none") {
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
          {filter 
            ? toCapitalize(filter)
                .replace(/(\.desc)/g, "")
                .replace("_", " ")
            : "Filter"}
          {filter ? (
            <svg
              width="1.2rem"
              height="1.2rem"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              onClick={() => handleFilterChange("none")}
            >
              <path
              className="hover:fill-primary transition"
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM8.96963 8.96965C9.26252 8.67676 9.73739 8.67676 10.0303 8.96965L12 10.9393L13.9696 8.96967C14.2625 8.67678 14.7374 8.67678 15.0303 8.96967C15.3232 9.26256 15.3232 9.73744 15.0303 10.0303L13.0606 12L15.0303 13.9696C15.3232 14.2625 15.3232 14.7374 15.0303 15.0303C14.7374 15.3232 14.2625 15.3232 13.9696 15.0303L12 13.0607L10.0303 15.0303C9.73742 15.3232 9.26254 15.3232 8.96965 15.0303C8.67676 14.7374 8.67676 14.2625 8.96965 13.9697L10.9393 12L8.96963 10.0303C8.67673 9.73742 8.67673 9.26254 8.96963 8.96965Z"
                fill="#FFFFFF"
              />
            </svg>
          ) : (
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
          )}
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
