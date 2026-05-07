"use client";
import React from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import Image from "next/image";

export const HeroParallax = ({
  products,
}: {
  products: {
    title: string;
    thumbnail: string;
  }[];
}) => {
  const firstRow = products.slice(0, 5);
  const secondRow = products.slice(5, 10);
  const ref = React.useRef(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const springConfig = { stiffness: 300, damping: 30, bounce: 100 };
  const translateX = useSpring(useTransform(scrollYProgress, [0, 1], [0, 1000]), springConfig);
  const translateXReverse = useSpring(useTransform(scrollYProgress, [0, 1], [0, -1000]), springConfig);

  return (
    <div
      ref={ref}
      className="h-[80vh] md:h-[140vh] pt-32 md:pt-60 overflow-hidden antialiased relative flex flex-col self-auto [perspective:1000px] [transform-style:preserve-3d] bg-black"
    >
      <Header />
      {shouldReduceMotion ? (
        /* Static layout for reduced-motion preference */
        <div className="flex flex-wrap justify-center gap-4 px-4 mt-10">
          {products.map((product) => (
            <ProductCard key={product.title} product={product} />
          ))}
        </div>
      ) : (
        <motion.div>
          <motion.div className="flex flex-row-reverse space-x-reverse space-x-4 md:space-x-10 mb-10 w-max" style={{ translateX }}>
            {firstRow.map((product) => (
               <ProductCard product={product} key={product.title} />
            ))}
          </motion.div>
          <motion.div className="flex flex-row mb-10 space-x-4 md:space-x-10 w-max" style={{ x: translateXReverse }}>
            {secondRow.map((product) => (
              <ProductCard product={product} key={product.title} />
            ))}
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export const Header = () => {
  return (
    <div className="max-w-7xl relative mx-auto py-10 md:py-20 px-4 w-full left-0 top-0 z-20">
      <h1 className="text-4xl md:text-7xl font-bold text-white pb-4 tracking-tighter">
        CineSage <br /> The Private Screening
      </h1>
      <p className="max-w-2xl text-base md:text-xl mt-4 text-neutral-300">
        Cinematic Excellence. Hand-Curated Storytelling. The Future of Home Cinema.
      </p>
    </div>
  );
};

export const ProductCard = ({ product }: { product: { title: string; thumbnail: string; } }) => {
  return (
    <motion.div className="group/product h-auto w-[200px] md:w-[320px] lg:w-[500px] aspect-video relative flex-shrink-0">
      <div className="block group-hover/product:shadow-2xl relative h-full w-full">
        <Image
          src={product.thumbnail}
          fill
          sizes="(max-width: 768px) 200px, (max-width: 1024px) 320px, 500px"
          className="object-cover object-center absolute h-full w-full inset-0 rounded-lg"
          alt={product.title}
        />
      </div>
      {/* Overlay: visible on hover (desktop) and always partially visible (mobile) */}
      <div className="absolute inset-0 h-full w-full opacity-100 md:opacity-0 md:group-hover/product:opacity-100 bg-black/70 pointer-events-none md:pointer-events-auto transition-opacity duration-300 rounded-lg flex items-end p-3 md:p-6">
          <h2 className="text-white text-sm md:text-xl lg:text-3xl font-bold break-words">{product.title}</h2>
      </div>
    </motion.div>
  );
};