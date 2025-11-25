"use client";

import { motion } from "framer-motion";
import { IoMdAlert } from "react-icons/io";

const textSlideAnim = {
  initial: { y: "100%" },
  animate: {
    y: "0",
    transition: {
      duration: 0.75,
      ease: [0.33, 1, 0.68, 1],
      delay: 0.5,
    },
  },
};

const Footer = () => {
  return (
    <footer className="fixed bottom-0 left-0 p-5 w-full flex items-center justify-center z-100 mix-blend-difference pointer-events-none">
      <div className="overflow-hidden">
        <motion.p
          variants={textSlideAnim}
          initial="initial"
          animate="animate"
          className="text-s text-[.8em] font-normal flex items-center gap-2 uppercase"
        >
          <IoMdAlert className="text-s text-[1em]" />
          drag your mouse to navigate
        </motion.p>
      </div>
    </footer>
  );
};

export default Footer;
