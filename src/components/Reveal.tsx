"use client";

import { useEffect, useRef, type ElementType, type ComponentPropsWithoutRef } from "react";

type RevealProps<T extends ElementType> = {
  as?: T;
  delay?: number;
} & ComponentPropsWithoutRef<T>;

/** Fades + lifts its content in the first time it scrolls into view. */
export function Reveal<T extends ElementType = "div">({
  as,
  delay = 0,
  style,
  ...rest
}: RevealProps<T>) {
  const Tag = (as ?? "div") as ElementType;
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-in");
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.05 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      data-reveal=""
      style={{ ...style, ["--reveal-delay" as string]: `${delay}ms` }}
      {...rest}
    />
  );
}
