import { forwardRef, useEffect, useState } from "react";
import { urlFor } from "@/app/lib/sanityImage";
import Scramble from "../../common/scramble";
import { AnimatePresence, motion, useTransform } from "framer-motion";
import Image from "next/image";
import { FaLink, FaFolder } from "react-icons/fa6";
import { IoIosCalendar } from "react-icons/io";
import { RiStackFill } from "react-icons/ri";
import NextLink from "../../common/next-link";

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
    <motion.div
      ref={ref}
      className="relative w-[800px] h-[500px] border border-p/10 overflow-hidden max-ds:w-[700px] max-ds:h-[450px] max-lg:w-[450px] max-lg:h-[250px]"
      initial="initial"
      animate="animate"
      custom={index}
      variants={clipAnim}
      style={{ x, y }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <figure className="relative size-full overflow-hidden bg-s -z-10 pointer-events-none">
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
      </figure>

      <div className="absolute inset-0 flex items-center justify-center z-50">
        <AnimatePresence>
          {hovered && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="pointer-events-auto  "
            >
              <NextLink href={`/work/${slug}`}>
                <Scramble
                  text="VISIT PROJECT"
                  icon={<FaLink className="text-[1em]" />}
                  className="text-s text-[.8em] max-lg:text-[.7em] max-md:text-[.6em] uppercase group-hover:underline "
                />
              </NextLink>
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      <motion.div className="absolute inset-0 p-5 flex flex-col items-center justify-between text-center z-30">
        <div className="flex flex-col items-center gap-2">
          <div className="overflow-hidden">
            <motion.p
              className="text-s text-[.8em] max-lg:text-[.7em] max-md:text-[.6em] uppercase flex items-center gap-2"
              {...textSlideAnim(hovered)}
            >
              <IoIosCalendar /> {year}
            </motion.p>
          </div>

          <div className="overflow-hidden">
            <motion.p
              className="text-s text-[.8em] max-lg:text-[.7em] max-md:text-[.6em] uppercase flex items-center gap-2"
              {...textSlideAnim(hovered)}
              custom={1}
            >
              <FaFolder /> {title}
            </motion.p>
          </div>
        </div>

        <div className="overflow-hidden">
          <motion.p
            className="text-s text-[.8em] max-lg:text-[.7em] max-md:text-[.6em] uppercase flex items-center gap-2"
            {...textSlideAnim(hovered)}
            custom={2}
          >
            <RiStackFill /> {stack}
          </motion.p>
        </div>
      </motion.div>
    </motion.div>
  );
});
