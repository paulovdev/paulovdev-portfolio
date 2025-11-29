"use client";

import ScrambleHover from "./common/scramble-hover";
import { motion } from "framer-motion";

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

const opacityAnim = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.5 } },
  exit: { opacity: 0 },
};

export function Filter({
  sort,
  setSort,
  year,
  setYear,
  stack,
  setStack,
  years,
  stacks,
  grid,
  setGrid,
  setFilterModal,
}) {
  return (
    <motion.div
      className="fixed p-5 inset-0 bg-p/50 backdrop-blur-3xl flex items-center justify-center gap-4 z-200 pointer-events-auto"
      {...opacityAnim}
    >
      <div className="w-fit h-[400px] flex flex-col items-start gap-4">
        <div className="mb-8 w-full flex items-center justify-between">
          <div className="overflow-hidden">
            <motion.p
              variants={textSlideAnim}
              initial="initial"
              animate="animate"
              className="text-s text-[.8em] max-lg:text-[.7em] max-md:text-[.6em] font-normal uppercase"
            >
              FILTERS
            </motion.p>
          </div>
          <div
            className="overflow-hidden"
            onClick={() => setFilterModal(false)}
          >
            <motion.button
              variants={textSlideAnim}
              initial="initial"
              animate="animate"
            >
              <ScrambleHover
                text="close"
                className="text-s text-[.8em] max-lg:text-[.7em] max-md:text-[.6em] font-normal cursor-pointer uppercase"
              />
            </motion.button>
          </div>
        </div>

        <div className="w-full overflow-hidden">
          <motion.div
            variants={textSlideAnim}
            initial="initial"
            animate="animate"
          >
            <label className="text-s text-[.7em] opacity-60 uppercase mb-1 block">
              Sort
            </label>

            <select
              value={sort}
              onChange={(e) => {
                setSort(e.target.value);
                setFilterModal(false);
              }}
              className="w-full bg-transparent border border-white/20 px-3 py-1 outline-none
                        accent-s text-s text-[.8em] max-lg:text-[.7em] max-md:text-[.6em] uppercase"
            >
              <option value="az" className="text-p">
                A → Z
              </option>
              <option value="za" className="text-p">
                Z → A
              </option>
            </select>
          </motion.div>
        </div>

        <div className="w-full overflow-hidden">
          <motion.div
            variants={textSlideAnim}
            initial="initial"
            animate="animate"
            custom={1}
          >
            <label className="text-s text-[.7em] opacity-60 uppercase mb-1 block">
              Year
            </label>

            <select
              value={year}
              onChange={(e) => {
                setYear(e.target.value);
                setFilterModal(false);
              }}
              className="w-full bg-transparent border border-white/20 px-3 py-1 outline-none
                        accent-s text-s text-[.8em] max-lg:text-[.7em] max-md:text-[.6em] uppercase "
            >
              <option value="all" className="text-p">
                All Years
              </option>
              {years.map((y) => (
                <option key={y} value={y} className="text-p">
                  {y}
                </option>
              ))}
            </select>
          </motion.div>
        </div>

        <div className="w-full overflow-hidden">
          <motion.div
            variants={textSlideAnim}
            initial="initial"
            animate="animate"
            custom={2}
          >
            <label className="text-s text-[.7em] opacity-60 uppercase mb-1 block">
              Stack
            </label>

            <select
              value={stack}
              onChange={(e) => {
                setStack(e.target.value);
                setFilterModal(false); // FECHA O MODAL
              }}
              className="w-full bg-transparent border border-white/20 px-3 py-1 outline-none
                        accent-s text-s text-[.8em] max-lg:text-[.7em] max-md:text-[.6em] uppercase"
            >
              <option value="all" className="text-p">
                All Stacks
              </option>
              {stacks.map((s) => (
                <option key={s} value={s} className="text-p">
                  {s}
                </option>
              ))}
            </select>
          </motion.div>
        </div>

        <div className="w-full overflow-hidden">
          <motion.div
            variants={textSlideAnim}
            initial="initial"
            animate="animate"
            custom={2}
          >
            <label className="text-s text-[.7em] opacity-60 uppercase mb-1 block">
              GRID
            </label>

            <select
              value={grid}
              onChange={(e) => {
                setGrid(e.target.value);
                setFilterModal(false);
              }}
              className="w-full bg-transparent border border-white/20 px-3 py-1 outline-none 
  accent-s text-s text-[.8em] max-lg:text-[.7em] max-md:text-[.6em] uppercase"
            >
              <option value="4x4" className="text-p">
                4X4
              </option>
              <option value="3x3" className="text-p">
                3X3
              </option>
              <option value="2x2" className="text-p">
                2X2
              </option>
            </select>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
