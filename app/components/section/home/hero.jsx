"use client";

import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  animate,
} from "framer-motion";
import { useMousePosition } from "@/app/hooks/useMousePosition";
import { Card } from "./card";

export default function Hero({ filteredData, grid }) {
  const { x: mouseX, y: mouseY } = useMousePosition();
  const cardRef = useRef(null);
  const [cardSize, setCardSize] = useState({ width: 0, height: 0 });

  const [vw, setVw] = useState(1920);
  const [vh, setVh] = useState(1080);
  function getCardSizeForViewport(vw) {
    if (vw <= 768) return { w: 450, h: 250 };
    if (vw <= 992) return { w: 600, h: 350 };
    if (vw <= 1262) return { w: 700, h: 450 };
    return { w: 800, h: 500 };
  }

  function getLayoutValuesForViewport(vw) {
    if (vw <= 768) {
      return {
        gap: 50,
        padding: 150,
      };
    }
    if (vw <= 992) {
      return {
        gap: 75,
        padding: 100,
      };
    }
    if (vw <= 1262) {
      return {
        gap: 125,
        padding: 150,
      };
    }
    return {
      gap: 250,
      padding: 250,
    };
  }

  useEffect(() => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      setCardSize({ width: rect.width, height: rect.height });
    }
  }, [filteredData.length]);

  useEffect(() => {
    const update = () => {
      setVw(window.innerWidth);
      setVh(window.innerHeight);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const { w: CARD_W, h: CARD_H } = getCardSizeForViewport(vw);
  const { gap: GAP, padding: PADDING } = getLayoutValuesForViewport(vw);

  const total = filteredData.length;
  const COLS = grid === "4x4" ? 4 : grid === "3x3" ? 3 : 2;

  const ROWS = Math.ceil(total / COLS);

  const WORLD_WIDTH = CARD_W * COLS + GAP * (COLS - 1) + PADDING * 2;
  const WORLD_HEIGHT = CARD_H * ROWS + GAP * (ROWS - 1) + PADDING * 2;

  const maxX = 0;
  const minX = -(WORLD_WIDTH - vw);
  const maxY = 0;
  const minY = -(WORLD_HEIGHT - vh);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 600, damping: 175 });
  const springY = useSpring(y, { stiffness: 600, damping: 175 });

  useEffect(() => {
    requestAnimationFrame(() => {
      animate(x, 0, { duration: 0.5, ease: "easeOut" });
      animate(y, 0, { duration: 0.5, ease: "easeOut" });
    });
  }, [grid, filteredData.length, WORLD_WIDTH, WORLD_HEIGHT]);

  const isDragging = useRef(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const scrollStart = useRef({ x: 0, y: 0 });

  useEffect(() => {
    let lastPos = { x: 0, y: 0 };
    let lastTime = 0;
    let velocity = { x: 0, y: 0 };

    const handleMouseDown = (e) => {
      isDragging.current = true;
      dragStart.current = { x: e.clientX, y: e.clientY };
      scrollStart.current = { x: x.get(), y: y.get() };
      lastPos = { x: e.clientX, y: e.clientY };
      lastTime = performance.now();
    };

    const handleMouseUp = () => {
      isDragging.current = false;

      animate(x, Math.min(maxX, Math.max(minX, x.get() + velocity.x * 300)), {
        type: "inertia",
        velocity: velocity.x,
        power: 0.5,
        timeConstant: 400,
      });
      animate(y, Math.min(maxY, Math.max(minY, y.get() + velocity.y * 300)), {
        type: "inertia",
        velocity: velocity.y,
        power: 0.5,
        timeConstant: 400,
      });
    };

    const handleMouseMove = (e) => {
      if (!isDragging.current) return;

      const now = performance.now();
      const dt = now - lastTime;

      velocity = {
        x: (e.clientX - lastPos.x) / dt,
        y: (e.clientY - lastPos.y) / dt,
      };

      lastPos = { x: e.clientX, y: e.clientY };
      lastTime = now;

      const dx = e.clientX - dragStart.current.x;
      const dy = e.clientY - dragStart.current.y;

      x.set(Math.min(maxX, Math.max(minX, scrollStart.current.x + dx)));
      y.set(Math.min(maxY, Math.max(minY, scrollStart.current.y + dy)));
    };

    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [vw, vh, WORLD_WIDTH, WORLD_HEIGHT]);

  return (
    <>
      <section className="absolute w-full h-screen overflow-hidden bg-s ">
        <motion.div
          style={{
            x: springX,
            y: springY,
            width: WORLD_WIDTH,
            height: WORLD_HEIGHT,
            padding: PADDING,
            gridTemplateColumns: `repeat(${COLS}, 1fr)`,
            gridTemplateRows: `repeat(${ROWS}, 1fr)`,
          }}
          className="absolute grid gap-50 p select-none active:cursor-move"
        >
          <AnimatePresence>
            {filteredData.map((item, i) => (
              <Card
                key={`${item._id}-${grid}-${filteredData}`}
                {...item}
                index={i}
                depth={Math.random() * 0.6 + 0.4}
                ref={i === 0 ? cardRef : null}
                mouseX={mouseX}
                mouseY={mouseY}
                vw={vw}
                vh={vh}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </section>
    </>
  );
}
