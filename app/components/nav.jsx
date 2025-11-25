"use client";

import { motion } from "framer-motion";
import NextLink from "./common/next-link";
import { IoMdContact } from "react-icons/io";
import ScrambleHover from "./common/scramble-hover";

const textSlideAnim = {
  initial: { y: "100%" },
  animate: (i) => ({
    y: "0",
    transition: {
      duration: 0.75,
      ease: [0.33, 1, 0.68, 1],
      delay: 0.5 + 0.075 * i,
    },
  }),
};

const Nav = () => {
  return (
    <nav className="fixed top-0 left-0 p-5 w-full flex items-center justify-between z-100  mix-blend-difference select-none">
      <div className="overflow-hidden">
        <ScrambleHover
          text="paulovdev"
          className="text-s text-[.8em] font-normal cursor-pointer uppercase"
        />
      </div>

      <div className="mr-4 overflow-hidden">
        <motion.div
          variants={textSlideAnim}
          initial="initial"
          animate="animate"
          custom={1}
        >
          <NextLink href={"/about"}>
            <ScrambleHover
              text="about me"
              icon={<IoMdContact className="text-[1em]" />}
              className="text-s text-[.8em] font-normal cursor-pointer uppercase"
            />
          </NextLink>
        </motion.div>
      </div>

      <div className="flex items-center gap-2">
        {["gram", "x", "fb", "yt"].map((s, i) => (
          <div className="overflow-hidden" key={i}>
            <motion.p
              variants={textSlideAnim}
              initial="initial"
              animate="animate"
              custom={2 + i}
            >
              <ScrambleHover
                text={s}
                className="text-s text-[.8em] font-normal cursor-pointer uppercase"
              />
            </motion.p>
          </div>
        ))}
      </div>
    </nav>
  );
};

export default Nav;
