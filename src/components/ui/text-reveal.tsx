"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { cn } from "../../lib/utils";

export const TextReveal = ({
  text,
  className,
}: {
  text: string;
  className?: string;
}) => {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end center"],
  });

  const words = text.split(" ");

  if (shouldReduceMotion) {
    return (
      <div className={cn("relative z-0 py-20 md:py-40", className)}>
        <div className="max-w-4xl mx-auto px-4 md:px-8">
          <p className="flex flex-wrap p-5 md:p-8 lg:p-10 text-2xl md:text-3xl lg:text-5xl font-bold text-action-gold">
            {words.map((word, i) => (
              <span key={i} className="mx-1 lg:mx-2.5">{word}</span>
            ))}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div ref={targetRef} className={cn("relative z-0 h-[60vh] md:h-[100vh]", className)}>
      <div className="sticky top-0 mx-auto flex h-[50%] max-w-4xl items-center bg-transparent px-[1rem] py-[5rem]">
        <p className="flex flex-wrap p-5 text-2xl font-bold text-white/30 md:p-8 md:text-3xl lg:p-10 lg:text-5xl">
          {words.map((word, i) => {
            const start = i / words.length;
            const end = start + 1 / words.length;
            return (
              <Word key={i} progress={scrollYProgress} range={[start, end]}>
                {word}
              </Word>
            );
          })}
        </p>
      </div>
    </div>
  );
};

const Word = ({
  children,
  progress,
  range,
}: {
  children: React.ReactNode;
  progress: any;
  range: [number, number];
}) => {
  const opacity = useTransform(progress, range, [0.2, 1]);
  return (
    <span className="relative mx-1 lg:mx-2.5">
      <span className="absolute opacity-0">{children}</span>
      <motion.span style={{ opacity: opacity }} className="text-action-gold">
        {children}
      </motion.span>
    </span>
  );
};