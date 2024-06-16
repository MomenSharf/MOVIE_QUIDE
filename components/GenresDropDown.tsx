"use client";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import { TVGenres, moviesGenres } from "@/constants";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function GenresDropDown({type}:{type: 'movie' | 'tv'}) {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const genres = type === 'movie' ? moviesGenres : TVGenres

  const genre = genres.find(
    (e) => e.id == Number(searchParams.get("with_genres"))
  )?.name;

  const handleFilterChange = (key: string) => {
    const params = new URLSearchParams(searchParams);

    if (key && !(key == "none")) {
      params.set("with_genres", `${key.toString()}`);
    } else {
      params.delete("with_genres");
    }
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <Dropdown className="bg-dark-blue">
      <DropdownTrigger>
        <Button variant="bordered" className="text-white">
          {genre ? genre : "Genres"}
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
        onAction={(key) => handleFilterChange(key.toString())}
        className="bg-dark-blue max-h-44 overflow-y-scroll"
      >
        {genres.map((e) => {
          return (
            <DropdownItem
              key={e.id}
              className={`${genre == e.name ? "text-primary" : ""}`}
              isDisabled={genre == e.name}
            >
              {e.name}
            </DropdownItem>
          );
        })}
      </DropdownMenu>
    </Dropdown> 
  );
}
