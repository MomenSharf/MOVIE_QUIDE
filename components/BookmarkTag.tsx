"use client";
import { toggleTobookmarked } from "@/lib/api";
import { MovieDetails } from "@/lib/types/movie";
import { TVShowDetails } from "@/lib/types/tv";
import { usePathname } from "next/navigation";
import { useFormState } from "react-dom";

export default function BookmarkTag({
  userId,
  movie,
  bookmarked,
}: {
  userId: string;
  movie: MovieDetails | TVShowDetails;
  bookmarked: boolean;
}) {

  const pathname = usePathname()

  async function toggle(prev: boolean, formData: FormData) {
    await toggleTobookmarked(userId, movie, !prev);
    return !prev;
    
  }
  // TODO :  FASFA
  // * FDA
  // ? MY

  // ! FDAS

  const [state, formAction] = useFormState(toggle, bookmarked);

  return (
    <form>
      <button
        className="absolute top-2 right-2 cursor-pointer p-3 bg-black bg-opacity-20 rounded-full group/bookmark"
        formAction={formAction}
      >
        <svg width="12" height="14" xmlns="http://www.w3.org/2000/svg">
          <path
            className={`"group-hover/bookmark:stroke-primary transition-all duration-300 group-hover/bookmark:stroke-primary ${
              state ? "fill-primary stroke-primary" : "fill-none"
            } `}
            d="m10.518.75.399 12.214-5.084-4.24-4.535 4.426L.75 1.036l9.768-.285Z"
            stroke="#FFF"
            strokeWidth="1.5"
            fill="none"
          />
        </svg>
      </button>
    </form>
  );
}
