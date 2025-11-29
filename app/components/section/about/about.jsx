"use client";
import { motion } from "framer-motion";
import { MdChildFriendly } from "react-icons/md";
import { FaLocationDot, FaFaceGrinWide } from "react-icons/fa6";
import Image from "next/image";
import NextLink from "../../common/next-link";
import ScrambleHover from "../../common/scramble-hover";
import { MdArrowBackIos } from "react-icons/md";

const textSlideAnim = {
  initial: { y: "100%" },
  animate: (i) => ({
    y: "0",
    transition: {
      duration: 0.75,
      ease: [0.33, 1, 0.68, 1],
      delay: 0.25 + 0.075 * i,
    },
  }),
};
const clipAnim = {
  initial: {
    clipPath: "inset(100% 0% 0% 0%)",
    transition: {
      duration: 1,
      ease: [0.76, 0, 0.24, 1],
      delay: 0.25,
    },
  },
  animate: (custom) => ({
    clipPath: "inset(0% 0% 0% 0%)",
    transition: {
      duration: 1,
      ease: [0.76, 0, 0.24, 1],
      delay: 0.1 + custom * 0.1,
    },
  }),
};

function chunkParagraph(text, size = 6) {
  const words = text.split(" ");
  const chunks = [];

  for (let i = 0; i < words.length; i += size) {
    chunks.push(words.slice(i, i + size).join(" "));
  }

  return chunks;
}

const About = () => {
  const paragraphs = [
    "Front-end developer & UX/UI design, specializing in creating immersive and intuitive user experiences, consistently pushing the boundaries of design innovation.",
    "As we talked about, I'm a front-end developer passionate about music and games. In addition to creating amazing interfaces for the web, I also dedicate my free time to producing music and exploring the world of games.",
    "I love working on challenging projects and diving into long, engaging texts. My creativity and technical skills allow me to create unique and engaging digital experiences for users.",
  ];

  return (
    <section className="fixed inset-0 w-screen h-screen bg-s overflow-y-scroll z-200">
      <motion.nav className="fixed top-0 left-0 p-5 w-full flex items-center justify-center backdrop-blur-md">
        <div className="h-fit overflow-hidden">
          <motion.p
            variants={textSlideAnim}
            initial="initial"
            animate="animate"
            custom={0}
          >
            <NextLink href={"/"}>
              <ScrambleHover
                text="BACK"
                icon={<MdArrowBackIos className="text-[1em]" />}
                className="text-p   text-[.8em] max-lg:text-[.7em] max-md:text-[.6em] font-medium cursor-pointer uppercase"
              />
            </NextLink>
          </motion.p>
        </div>
      </motion.nav>

      <div className="mt-40 p-5 flex items-center justify-center">
        <div className="max-w-[600px]">
          <div className="overflow-hidden mb-1">
            <motion.h2
              variants={textSlideAnim}
              initial="initial"
              animate="animate"
              custom={1}
              className="text-p   text-[.8em] max-lg:text-[.7em] max-md:text-[.6em]  font-medium uppercase flex items-center gap-2"
            >
              <FaFaceGrinWide /> Paulo Vitor Pimentel dos Santos
            </motion.h2>
          </div>

          <div className="overflow-hidden mb-1">
            <motion.p
              variants={textSlideAnim}
              initial="initial"
              animate="animate"
              custom={2}
              className="text-p   text-[.8em] max-lg:text-[.7em] max-md:text-[.6em]  font-medium uppercase flex items-center gap-2"
            >
              <MdChildFriendly /> Born in 2003
            </motion.p>
          </div>

          <div className="overflow-hidden mb-8">
            <motion.p
              variants={textSlideAnim}
              initial="initial"
              animate="animate"
              custom={3}
              className="text-p   text-[.8em] max-lg:text-[.7em] max-md:text-[.6em]  font-medium uppercase flex items-center gap-2"
            >
              <FaLocationDot /> Brazil - Rio de Janeiro
            </motion.p>
          </div>

          {paragraphs.map((p, pIndex) => {
            const lines = chunkParagraph(p, 10);
            const baseIndex = 4 + pIndex * 5;

            return (
              <div key={pIndex} className="mb-6">
                {lines.map((line, i) => (
                  <div className="overflow-hidden" key={i}>
                    <motion.p
                      variants={textSlideAnim}
                      initial="initial"
                      animate="animate"
                      custom={baseIndex + i}
                      className="text-p   text-[.8em] max-lg:text-[.7em] max-md:text-[.6em]  font-medium uppercase mb-1"
                    >
                      {line}
                    </motion.p>
                  </div>
                ))}
              </div>
            );
          })}

          <div className="grid grid-cols-2 gap-2 mt-6">
            {[
              "/works/work-4.webp",
              "/works/work-5.webp",
              "/works/work-6.webp",
              "/works/work-7.webp",
            ].map((src, i) => (
              <div className="overflow-hidden w-full h-[300px]" key={i}>
                <motion.figure
                  variants={textSlideAnim}
                  initial="initial"
                  animate="animate"
                  {...clipAnim}
                  custom={12 + i}
                  className="w-full h-full"
                >
                  <Image
                    src={src}
                    width={1000}
                    height={1000}
                    alt=""
                    className="object-cover size-full"
                  />
                </motion.figure>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
