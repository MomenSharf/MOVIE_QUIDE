"use client";
import React, { ReactNode, useEffect, useRef, useState } from "react";
import MovieCard from "./MovieCard";
import ButtonUi from "./Button";
import Link from "next/link";

const TRANSLATE_AMOUNT = 300;

export default function MoviesListSlider({
  children,
  title,
  link,
}: {
  children: ReactNode;
  title: string;
  link: string;
}) {
  const [translate, setTranslate] = useState(0);
  const [isLeftVisible, setIsLeftVisible] = useState(false);
  const [isRightVisible, setIsRightVisible] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (sliderRef.current == null) return;

    const observer = new ResizeObserver((entries) => {
      const container = entries[0]?.target;
      if (container == null) return;

      setIsLeftVisible(translate > 0);
      setIsRightVisible(
        translate + container.clientWidth < container.scrollWidth
      );
    });

    observer.observe(sliderRef.current);

    return () => {
      observer.disconnect();
    };
  }, [sliderRef, translate]);

  return (
    <div className="w-full relative">
      <h2 className="text-2xl mb-5">{title}</h2>
      {children ? (
        <div className="relative">
          {isLeftVisible && (
            <div
              className="cursor-pointer group absolute z-10 top-1/2 left-2 -translate-y-1/2 p-1  bg-black bg-opacity-50 rounded-full"
              onClick={() => {
                setTranslate((translate) => {
                  const newTranslate = translate - TRANSLATE_AMOUNT;
                  if (newTranslate <= 0) return 0;
                  return newTranslate;
                });
              }}
            >
              <svg
                width="2rem"
                height="2rem"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  className="group-hover:fill-primary transition-all"
                  d="M14.2893 5.70708C13.8988 5.31655 13.2657 5.31655 12.8751 5.70708L7.98768 10.5993C7.20729 11.3805 7.2076 12.6463 7.98837 13.427L12.8787 18.3174C13.2693 18.7079 13.9024 18.7079 14.293 18.3174C14.6835 17.9269 14.6835 17.2937 14.293 16.9032L10.1073 12.7175C9.71678 12.327 9.71678 11.6939 10.1073 11.3033L14.2893 7.12129C14.6799 6.73077 14.6799 6.0976 14.2893 5.70708Z"
                  fill="#FFFFFF"
                />
              </svg>
            </div>
          )}
          <div
            ref={sliderRef}
            className={` ${"flex whitespace-nowrap gap-3 transition-transform *:min-w-[167px] "}`}
            style={{ transform: `translateX(-${translate}px)` }}
          >
            {children}
          </div>
          {isRightVisible ? (
            <div
              className="cursor-pointer group absolute z-10 top-1/2 right-2 -translate-y-1/2 p-1  bg-black bg-opacity-50 rounded-full"
              onClick={() => {
                setTranslate((translate) => {
                  if (sliderRef.current == null) {
                    return translate;
                  }
                  const newTranslate = translate + TRANSLATE_AMOUNT;
                  const edge = sliderRef.current.scrollWidth;
                  const width = sliderRef.current.clientWidth;
                  if (newTranslate + width >= edge) {
                    return edge - width;
                  }
                  return newTranslate;
                });
              }}
            >
              <svg
                width="2rem"
                height="2rem"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  className="group-hover:fill-primary transition-all"
                  d="M9.71069 18.2929C10.1012 18.6834 10.7344 18.6834 11.1249 18.2929L16.0123 13.4006C16.7927 12.6195 16.7924 11.3537 16.0117 10.5729L11.1213 5.68254C10.7308 5.29202 10.0976 5.29202 9.70708 5.68254C9.31655 6.07307 9.31655 6.70623 9.70708 7.09676L13.8927 11.2824C14.2833 11.6729 14.2833 12.3061 13.8927 12.6966L9.71069 16.8787C9.32016 17.2692 9.32016 17.9023 9.71069 18.2929Z"
                  fill="#FFFFFf"
                />
              </svg>
            </div>
          ) : (
            <Link href={link}>
              <ButtonUi className="absolute z-10 top-1/2 right-2 -translate-y-1/2 bg-opacity-80 animate-bounceX">
                <span>See more</span>
                <svg
                  className="animate-bounceX-item"
                  width="1rem"
                  height="1ren"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="m13 16 4-4-4-4M7 16l4-4-4-4"
                    stroke="#FFFFFF"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </ButtonUi>
            </Link>
          )}
        </div>
      ) : null}
    </div>
  );
}
