"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export default function Search() {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const handleSearch = useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchParams);

    params.set("page", "1");

    if (term) {
      params.set("query", term);
    } else {
      
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <div className="flex items-center gap-4 w-full">
      <div>
        <svg
          width="25"
          height="25"
          viewBox="0 0 32 32"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M27.613 25.72 23.08 21.2a10.56 10.56 0 0 0 2.253-6.533C25.333 8.776 20.558 4 14.667 4S4 8.776 4 14.667c0 5.89 4.776 10.666 10.667 10.666A10.56 10.56 0 0 0 21.2 23.08l4.52 4.533a1.333 1.333 0 0 0 1.893 0 1.333 1.333 0 0 0 0-1.893ZM6.667 14.667a8 8 0 1 1 16 0 8 8 0 0 1-16 0Z"
            fill="#FFF"
          />
        </svg>
      </div>
      <input
        className="border-0 outline-0 text-2xl bg-transparent w-full"
        name="search"
        placeholder="Search for Movies or TV series"
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        onBlur={(e) => {e.target.value = ''; handleSearch('')}}
        defaultValue={searchParams.get('query')?.toString()}
      />
    </div>
  );
}
