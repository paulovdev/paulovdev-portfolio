"use client";
import { useRef } from "react";

const CHARS = "!<>-_\\/[]{}—=+*^?#________";

export default function ScrambleHover({ text, icon = null, className = "" }) {
  const spanRef = useRef(null);

  function scrambleText(element, text) {
    let frame = 0;

    const totalFrames = text.length * 15;
    const resolved = Array(text.length).fill(false);

    function update() {
      let out = "";

      for (let i = 0; i < text.length; i++) {
        if (resolved[i]) {
          out += text[i];
          continue;
        }

        const randomChar = CHARS[Math.floor(Math.random() * CHARS.length)];
        out += randomChar;

        if (frame > i * 15 + 25) {
          resolved[i] = true;
        }
      }

      element.textContent = out;
      frame++;

      if (frame <= totalFrames) {
        requestAnimationFrame(update);
      } else {
        element.textContent = text;
      }
    }

    update();
  }

  function handleEnter() {
    if (!spanRef.current) return;
    scrambleText(spanRef.current, text);
  }

  function handleLeave() {
    if (!spanRef.current) return;
    spanRef.current.textContent = text;
  }

  return (
    <span
      className={`flex items-center gap-2 cursor-pointer ${className}`}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      {icon && <span>{icon}</span>}
      <span ref={spanRef}>{text}</span>
    </span>
  );
}
