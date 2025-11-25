"use client";
import { motion, useAnimate } from "framer-motion";
import { useEffect, useRef } from "react";

export default function Loader() {
  const [scope, animate] = useAnimate();
  const pRef = useRef(null);

  const CHARS = "!<>-_\\/[]{}—=+*^?#________";

  function scrambleIn(element, text) {
    let frame = 0;
    const totalFrames = text.length * 8;
    const resolved = Array(text.length).fill(false);

    function update() {
      let out = "";

      for (let i = 0; i < text.length; i++) {
        if (resolved[i]) out += text[i];
        else out += CHARS[Math.floor(Math.random() * CHARS.length)];

        if (frame > i * 8 + 8) resolved[i] = true;
      }

      element.textContent = out;
      frame++;

      if (frame <= totalFrames) requestAnimationFrame(update);
      else element.textContent = text;
    }

    update();
  }

  function scrambleOut(element, removeCount) {
    let frame = 0;

    const text = element.textContent;
    const keep = text.slice(0, text.length - removeCount);
    let fading = text.slice(text.length - removeCount).split("");

    function update() {
      let out = keep;

      fading = fading.map((ch) =>
        Math.random() > 0.8
          ? CHARS[Math.floor(Math.random() * CHARS.length)]
          : ch
      );

      const prog = frame / 30;
      const deleteIndex = Math.floor(prog * removeCount);

      const final = fading.map((ch, i) => (i < deleteIndex ? "" : ch)).join("");

      out += final;
      element.textContent = out;

      if (deleteIndex < removeCount) {
        frame++;
        requestAnimationFrame(update);
      } else {
        element.textContent = keep;
      }
    }

    update();
  }

  useEffect(() => {
    async function runAnim() {
      const p = pRef.current;
      const clip = scope.current.querySelector(".clip-reveal");

      const fullText = "paulovdev - portfolio 2026";

      scrambleIn(p, fullText);

      await new Promise((r) => setTimeout(r, 2000));

      const removePart = " - portfolio 2026";
      scrambleOut(p, removePart.length);

      await new Promise((r) => setTimeout(r, 800));

      const rect = p.getBoundingClientRect();
      const targetX = -rect.left + 20;
      const targetY = -rect.top + 20;

      await animate(
        p,
        { x: targetX, y: targetY },
        { duration: 1.1, ease: [0.76, 0, 0.24, 1] }
      );

      await animate(
        clip,
        { clipPath: "inset(0% 0% 0% 0%)" },
        { duration: 1.1, ease: [0.76, 0, 0.24, 1] }
      );
    }

    runAnim();
  }, []);

  return (
    <div
      ref={scope}
      className="fixed inset-0 w-screen h-screen z-300 overflow-hidden"
    >
      <motion.div className="loader-bg absolute inset-0 bg-p flex items-center justify-center">
        <motion.div
          className="clip-reveal absolute inset-0 bg-s"
          initial={{ clipPath: "inset(100% 0% 100% 0%)" }}
        />

        <motion.p
          ref={pRef}
          className="fixed z-100 text-s text-[.8em] font-normal uppercase mix-blend-difference"
        />
      </motion.div>
    </div>
  );
}
