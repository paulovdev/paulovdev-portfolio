"use client";
import { useEffect, useRef } from "react";

const CHARS = "!<>-_\\/[]{}—=+*^?#__";

export default function Scramble({ text, icon = null, className = "" }) {
  const spanRef = useRef(null);

  useEffect(() => {
    if (spanRef.current) {
      const rect = spanRef.current.getBoundingClientRect();
      spanRef.current.style.display = "inline-block";
      spanRef.current.style.width = rect.width + "px";
      spanRef.current.style.height = rect.height + "px";
      spanRef.current.style.lineHeight = rect.height + "px";
    }
    const el = spanRef.current;
    let frame = 0;

    const speed = text.length <= 8 ? 20 : 10;
    const totalFrames = text.length * speed;

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

        if (frame > i * speed + speed) {
          resolved[i] = true;
        }
      }

      el.textContent = out;
      frame++;

      if (frame <= totalFrames) requestAnimationFrame(update);
      else el.textContent = text;
    }

    update();
  }, [text]);

  return (
    <span className={`flex items-center gap-2 cursor-pointer ${className}`}>
      {icon && <span>{icon}</span>}
      <span ref={spanRef} className="overflow-hidden">
        {text}
      </span>
    </span>
  );
}
