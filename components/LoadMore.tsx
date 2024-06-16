"use client";
import { discover } from "@/lib/api";
import { Spinner } from "@nextui-org/spinner";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

let page = 2;

type AnimeCardProps = JSX.Element;
export default function LoadMore2({
  params,
  type,
  user,
}: {
  params?: {
    sort_by?: string;
    page?: number;
    with_genres?: number | string;
    query?: string;
  };
  type: "movie" | "tv";
  user: User | null;
}) {
  const { ref, inView } = useInView();
  const [data, setData] = useState<AnimeCardProps[]>([]);

  useEffect(() => {
    if (inView) {
      console.log(page);

      discover(
        type,
        {
          ...params,
          page: page,
        },
        user
      ).then((res) => {
        setData((prev) => [...prev, ...res]);
        page++;
      });
    }
  }, [inView]);

  return (
    <>
      <section className="wrapper mt-5">{data}</section>
      <section
        className="flex justify-center items-center w-full mt-5"
        ref={ref}
      >
        <Spinner color="primary" size="md" />
      </section>
    </>
  );
}
