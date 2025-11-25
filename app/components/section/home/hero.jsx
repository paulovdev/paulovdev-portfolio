"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import { FaLink, FaFolder } from "react-icons/fa6";
import { IoIosCalendar } from "react-icons/io";
import { RiStackFill } from "react-icons/ri";
import { useMousePosition } from "@/app/hooks/useMousePosition";
import { urlFor } from "@/app/lib/sanityImage";
import ScrambleHover from "../../common/scramble-hover";

const clipAnim = {
  initial: { clipPath: "inset(100% 0% 0% 0%)" },
  animate: (custom) => ({
    clipPath: "inset(0% 0% 0% 0%)",
    transition: {
      duration: 1,
      delay: 0.1 + custom * 0.1,
      ease: [0.76, 0, 0.24, 1],
    },
  }),
};

export default function Hero({ data }) {
  const items = data;

  const { x: mouseX, y: mouseY } = useMousePosition();

  const x = useMotionValue(-window.innerWidth * 0.5);
  const y = useMotionValue(-window.innerHeight * 0.5);

  const springX = useSpring(x, { stiffness: 600, damping: 175 });
  const springY = useSpring(y, { stiffness: 600, damping: 175 });

  const containerRef = useRef(null);
  const isDragging = useRef(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const scrollStart = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseDown = (e) => {
      isDragging.current = true;
      dragStart.current = { x: e.clientX, y: e.clientY };
      scrollStart.current = { x: x.get(), y: y.get() };
      document.body.style.cursor = "grabbing";
    };
    const handleMouseUp = () => {
      isDragging.current = false;
      document.body.style.cursor = "default";
    };
    const handleMouseMove = (e) => {
      if (isDragging.current) {
        const dx = e.clientX - dragStart.current.x;
        const dy = e.clientY - dragStart.current.y;
        x.set(scrollStart.current.x + dx);
        y.set(scrollStart.current.y + dy);
      }
    };
    const handleWheel = (e) => {
      e.preventDefault();
      const factor = 0.8;
      x.set(x.get() - e.deltaX * factor);
      y.set(y.get() - e.deltaY * factor);
    };

    const container = containerRef.current;
    container.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      container.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("wheel", handleWheel);
    };
  }, [x, y]);

  const randomPositions = useRef(
    items.map((_, i) => ({
      x: (i % 3) * 150 + Math.random() * 200,
      y: Math.floor(i / 3) * 50 + Math.random() * 100,
      depth: Math.random() * 0.6 + 0.4,
    }))
  );

  return (
    <section
      ref={containerRef}
      className="relative w-[175vw] h-[225vh] flex items-center justify-center overflow-hidden bg-s"
    >
      <motion.div
        className="relative grid grid-cols-3 grid-rows-3 gap-[250px] select-none max-lg:gap-[100px]"
        style={{ x: springX, y: springY }}
      >
        {items.map((item, i) => (
          <Card
            key={item._id}
            {...item}
            index={i}
            mouseX={mouseX}
            mouseY={mouseY}
            initialPos={randomPositions.current[i]}
          />
        ))}
      </motion.div>
    </section>
  );
}
function Card({
  image,
  title,
  stack,
  year,
  site,
  index,
  mouseX,
  mouseY,
  initialPos,
}) {
  const [hovered, setHovered] = useState(false);

  const moveX = useTransform(mouseX, [0, window.innerWidth], [-25, 25]);
  const moveY = useTransform(mouseY, [0, window.innerHeight], [-25, 25]);

  const x = useTransform(moveX, (val) => val * initialPos.depth + initialPos.x);
  const y = useTransform(moveY, (val) => val * initialPos.depth + initialPos.y);

  return (
    <motion.div
      className="relative w-[800px] h-[450px] border border-p/10 overflow-hidden max-lg:w-[400px] max-lg:h-[250px] will-change-transform"
      initial="initial"
      animate="animate"
      custom={index}
      variants={clipAnim}
      style={{ x, y }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <figure className="absolute inset-0 w-full h-full overflow-hidden bg-s -z-10 pointer-events-none">
        <Image
          src={urlFor(image)
            .width(1920)
            .height(1080)
            .quality(80)
            .format()
            .url()}
          width={2000}
          height={2000}
          alt={title}
          className="size-full object-cover transition-all duration-500"
          style={{
            filter: hovered
              ? "blur(14px) brightness(0.5)"
              : "blur(0px) brightness(1)",
            transform: hovered ? "scale(1.05)" : "scale(1)",
          }}
        />
      </figure>

      <div className="absolute inset-0 flex items-center justify-center z-100">
        <a className="h-fit overflow-hidden group" href={site} target="_blank">
          <motion.p
            initial={{ y: "100%" }}
            animate={{ y: hovered ? "0%" : "100%" }}
            transition={{ duration: 0.75, ease: [0.33, 1, 0.68, 1] }}
          >
            <ScrambleHover
              text="VISIT WEBSITE"
              icon={<FaLink className="text-[1em]" />}
              className="text-s  text-[.8em] max-lg:text-[.7em]  font-normal uppercase"
            />
          </motion.p>
        </a>
      </div>

      <motion.div
        className="absolute inset-0 h-full w-full p-5 flex flex-col items-center justify-between text-center z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.25 }}
      >
        <div className="flex flex-col items-center gap-2">
          <div className="h-fit overflow-hidden">
            <motion.p
              className="text-s  text-[.8em] max-lg:text-[.7em]  uppercase flex items-center gap-2"
              initial={{ y: "100%" }}
              animate={{ y: hovered ? "0%" : "100%" }}
              transition={{ duration: 0.75, ease: [0.33, 1, 0.68, 1] }}
            >
              <IoIosCalendar className="text-s text-[1em]" /> {year}
            </motion.p>
          </div>

          <div className="h-fit overflow-hidden">
            <motion.p
              className="text-s  text-[.8em] max-lg:text-[.7em]  uppercase flex items-center gap-2"
              initial={{ y: "100%" }}
              animate={{ y: hovered ? "0%" : "100%" }}
              transition={{
                duration: 0.75,
                ease: [0.33, 1, 0.68, 1],
                delay: 0.1,
              }}
            >
              <FaFolder className="text-s  text-[.8em] max-lg:text-[.7em] " /> {title}
            </motion.p>
          </div>
        </div>

        <div className="h-fit overflow-hidden">
          <motion.p
            className="text-s  text-[.8em] max-lg:text-[.7em]  uppercase flex items-center gap-2"
            initial={{ y: "100%" }}
            animate={{ y: hovered ? "0%" : "100%" }}
            transition={{
              duration: 0.75,
              ease: [0.33, 1, 0.68, 1],
              delay: 0.2,
            }}
          >
            <RiStackFill className="text-s text-[1em]" /> {stack}
          </motion.p>
        </div>
      </motion.div>
    </motion.div>
  );
}
