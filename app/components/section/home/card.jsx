import { forwardRef, useState } from "react";
import { urlFor } from "@/app/lib/sanityImage";
import Scramble from "../../common/scramble";
import { AnimatePresence, motion, useTransform } from "framer-motion";
import Image from "next/image";
import { FaLink, FaFolder } from "react-icons/fa6";
import { FaStarOfLife } from "react-icons/fa6";

import { IoIosCalendar } from "react-icons/io";
import { RiStackFill } from "react-icons/ri";
import Link from "next/link";

const textSlideAnim = (hovered) => ({
  initial: { y: "100%" },
  animate: (i) => ({
    y: hovered ? "0%" : "100%",
    transition: {
      duration: 0.75,
      ease: [0.33, 1, 0.68, 1],
      delay: 0.075 * i,
    },
  }),
});

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

export const Card = forwardRef(function Card(
  {
    image,
    title,
    stack,
    year,
    slug,
    index,
    mouseX,
    mouseY,
    vw,
    vh,
    depth = 0.5,
  },
  ref
) {
  const [hovered, setHovered] = useState(false);

  const moveX = useTransform(mouseX, [0, vw], [-25, 25]);
  const moveY = useTransform(mouseY, [0, vh], [-25, 25]);
  const x = useTransform(moveX, (val) => val * depth);
  const y = useTransform(moveY, (val) => val * depth);

  return (
    <>
      <motion.div
        ref={ref}
        className="card relative w-[800px] h-[525px] flex flex-col max-ds:w-[700px] max-ds:h-[450px] max-lg:w-[450px] max-lg:h-[325px]"
        initial="initial"
        animate="animate"
        custom={index}
        variants={clipAnim}
        style={{ x, y }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        data-cursor="hover"
      >
        <figure className="relative size-full overflow-hidden  rounded-[1.5em] border border-p/10 bg-s -z-10 pointer-events-none">
          <Image
            src={urlFor(image).width(1920).height(1080).quality(80).url()}
            width={1920}
            height={1080}
            alt={title}
            className="size-full object-cover transition-all duration-500"
            style={{
              transform: hovered ? "scale(1.1)" : "scale(1)",
              filter: hovered
                ? "blur(14px) brightness(0.5)"
                : "blur(0px) brightness(1)",
            }}
          />
          <div className="absolute inset-0 p-5 flex items-center justify-center z-50">
            <AnimatePresence>
              {hovered && (
                <motion.p
                  style={{ x, y }}
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: 1,
                    rotate: 180,
                    transition: { duration: 0.75, ease: [0.76, 0, 0.24, 1] },
                  }}
                  exit={{
                    opacity: 0,
                    rotate: 0,
                    transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] },
                  }}
                  className="pointer-events-auto"
                >
                  <FaStarOfLife className="text-s text-[2em]" />
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          <div className="absolute inset-0 p-5 flex items-end justify-end z-50">
            <AnimatePresence>
              {hovered && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="pointer-events-auto group"
                >
                  <Link href={`/work/${slug}`}>
                    <Scramble
                      text="CLICK TO VISIT PROJECT"
                      icon={<FaLink className="text-[1em]" />}
                      className="text-s text-[.8em] max-lg:text-[.75em] max-md:text-[.7em] uppercase group-hover:underline"
                    />
                  </Link>
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          <motion.div className="absolute inset-0 p-5 flex flex-col items-start justify-between text-center z-30">
            <div className="overflow-hidden">
              <motion.p
                className="text-s text-[.8em] max-lg:text-[.75em] max-md:text-[.7em] uppercase flex items-center gap-2"
                {...textSlideAnim(hovered)}
                custom={2}
              >
                <RiStackFill /> {stack}
              </motion.p>
            </div>
          </motion.div>
        </figure>
        <div className="relative p-4 flex items-center justify-between">
          <div className="overflow-hidden">
            <motion.p className="text-p text-[.8em] max-lg:text-[.75em] max-md:text-[.7em] uppercase flex items-center gap-2">
              <FaFolder /> {title}
            </motion.p>
          </div>
          <div className="overflow-hidden">
            <motion.p className="text-p text-[.8em] max-lg:text-[.75em] max-md:text-[.7em] uppercase flex items-center gap-2">
              <IoIosCalendar /> {year}
            </motion.p>
          </div>
        </div>
      </motion.div>
    </>
  );
});
